import { roomInfoAtom } from "@/entities/room";
import { useDebounce, useDismissClick } from "@/shared/lib";
import { BasicButton, CustomInput, DropDownWrapper, SkeletonWrapper } from "@/shared/ui"
import { useAtomValue } from "jotai";
import { Suspense, type KeyboardEvent, useState, useEffect, type ReactNode, type ChangeEvent, useRef, useMemo } from "react"
import { postNewChecklist, postToggleChecklist } from "../api";
import { MdAdd, MdCheck } from "react-icons/md";
import type { Tables } from "@/shared/model/supabase";
import { Await, useLoaderData, useRevalidator } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

const SelectItem = ({
  children,
  focus,
  setFocus,
  onClick,
  disabled,
}: {
  children?: string | ReactNode,
  focus: boolean,
  setFocus: () => void,
  onClick: () => void,
  disabled?: boolean,
}) => {
  if(children !== "") {
    return (
      <li
        onMouseEnter={setFocus}
        className={`p-1 ${disabled ? "cursor-not-allowed opacity-30" : `${focus ? "bg-neutral-400/25" : ""} cursor-pointer`}`}
        role="button"
        title={typeof children == "string" ? children : "추가하기"}
        onClick={() => {disabled ? null : onClick()}}
        aria-disabled={disabled ? "true" : "false"}
      >
        {children}
      </li>
    )
  }
}

const AddCheckListForm = ({room_id, checklist}: {room_id: number, checklist: Tables<'checklist'>[]}) => {
  const [focus, setFocus] = useState(false);
  const [selectIndex, setSelectIndex] = useState<number | undefined>(undefined);
  const [inputText, setInputText] = useState("");
  const filteredChecklist = useMemo(() => {
    /** 중복되는 항목을 입력했는지 여부 */
    const IsDuplicateName = checklist.some(({ title, checked }) => title == inputText.trim() && !checked);
    /** 존재하는 항목을 입력했는지 여부 */
    const IsExistName = checklist.some(({ title, checked }) => title == inputText.trim() && checked);
    return [
      // 중복
      "duplicate",
      // 신규
      "new",
      ...checklist,
    ].filter((item) =>
      // 중복 경고
      (IsDuplicateName && item === "duplicate") ||
      // 신규 추가
      (!IsDuplicateName && !IsExistName && item === "new" && !!inputText.trim()) ||
      (typeof item !== "string" && item.checked && (inputText ? item?.title?.includes(inputText) : true))
    ).slice(0,11);
  },
  [checklist, inputText]);
  const inputRef = useRef<HTMLInputElement>(null);
  const revalidator = useRevalidator();

  /** 입력 값 받는 핸들러 */
  const handleChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setInputText(target.value.trim());
    if(target.value.trim()) {
      setSelectIndex(0);
    }
  }
  const deboundedOnChange = useDebounce(handleChangeEvent, 500);

  /** 특정 키 입력 감지하는 핸들러 */
  const handleKeyEvent = async (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.key == "ArrowUp") { // 🔼
      e.preventDefault();
      return setSelectIndex(prev =>
        prev == undefined ?
          ((filteredChecklist.length > 0) ? filteredChecklist.length - 1 : 0)
          :
          (
            prev == 0 ?
              (filteredChecklist.length > 0) ? filteredChecklist.length - 1 : undefined
              : prev - 1
          )
      );
    } else if(e.key == "ArrowDown") { // 🔽
      e.preventDefault();
      return setSelectIndex(prev =>
        prev == undefined ?
          0
          :
          (
            (filteredChecklist.length > 0) ?
            (prev + 1 >= filteredChecklist.length) ? 0 : prev + 1
            : undefined
          )
      );
    } else if(e.key == "Enter") { // ↩️
      e.preventDefault();
      if(
        // 항목 선택하지 않았다면
        (selectIndex == undefined) ||
        // 내용 입력이 완료되지 않았다면
        (inputRef.current?.value.trim() !== inputText)
      ) {
        return;
      } else {
        const item = filteredChecklist[selectIndex];
        if(item === "duplicate") return;

        return submit(
          typeof item == "string" ? { title: inputText, room_id }: item ,
          typeof item == "string" ? "new": "select"
        );
      }
    } else if(e.key == "Escape") {
      e.preventDefault()
      setSelectIndex(undefined);
      if(inputRef.current) {
        inputRef.current.value = '';
        inputRef.current.blur();
      }
      setInputText('');
      setFocus(false);
      return;
    }
  }

  /** 제출 */
  const submit = async (body: Partial<Tables<'checklist'>>, type: "new" | "select") => {
    try {
      if(type == "new") {
        await postNewChecklist({
          ...body,
          room_id,
        });
      } else {
        await postToggleChecklist({
          checked: false,
          id: body.id!
        });
      }

      setInputText('');
      if(inputRef.current) {
        inputRef.current.value = '';
        if(type == "new") inputRef.current.blur();
      }
      if(type == "new") setFocus(false);

      revalidator.revalidate();
    } catch (e) {
      throw new Error(`에러: ${e}`)
    }
  }

  useEffect(() => {
    if(!focus) setSelectIndex(undefined);
  }, [focus]);

  useDismissClick('.new_check_container', () => setFocus(false));

  return (
    <div className="relative new_check_container">
      <CustomInput
        placeholder="지금 필요한 건.."
        onFocus={() => setFocus(true)}
        onKeyDown={handleKeyEvent}
        onChange={(e) => deboundedOnChange(e)}
        ref={inputRef}
      />
      <AnimatePresence>
        {focus &&
          <DropDownWrapper width={"100%"} top={"100%"} left={0} fade className="text-[0.9375rem]">
            <ul className="flex flex-col">
              {filteredChecklist.map((item, idx) =>
                <SelectItem
                  key={typeof item == "string" ? item : item.id}
                  focus={selectIndex == idx}
                  setFocus={() => setSelectIndex(idx)}
                  onClick={() =>
                    typeof item == "string" ?
                    (
                      item == "duplicate" ?
                      null : submit({ title: inputText, room_id }, "new")
                    )
                    :
                    submit(item, "select")
                  }
                  disabled={item === "duplicate"}
                >
                  {
                    typeof item == "string" ?
                    (item == "new" ?
                      <p className="flex items-center gap-2">
                        <MdAdd /><code>{inputText}</code> 추가하기
                      </p>
                      :
                      "이미 존재하는 항목입니다"
                    ) :
                    (item.title ?? "")
                  }
                </SelectItem>
              )}
              {(filteredChecklist.length == 1 && !filteredChecklist[0] && !inputText) &&
                <li><div className="typing-loader" /></li>
              }
            </ul>
          </DropDownWrapper>
        }
      </AnimatePresence>
    </div>
  )
}

const CheckItem = ({ title, id, reload }: Tables<'checklist'> & { reload: () => void }) => {
  return (
    <li
      className="flex items-stretch gap-[4px] p-[12px] bg-white rounded-sm dark:bg-stone-700 dark:border dark:border-stone-500 font-medium text-[1.125rem]"
      onClick={() => console.log('click the item')}
      onMouseDown={() => console.log('hold the item')}
    >
      <p className="flex-1 cursor-default">
        {title}
      </p>
      <BasicButton
        onClick={async () => {
          await postToggleChecklist({checked: true, id});
          return reload();
        }}
      >
        <MdCheck />
      </BasicButton>
    </li>
  )
}

export const ChecklistSection = () => {
  const { checklist } = useLoaderData() as { checklist: Promise<Tables<'checklist'>[]>}
  const roomInfo = useAtomValue(roomInfoAtom);
  const revalidator = useRevalidator();
  if(!roomInfo) {
    return (<></>)
  }

  return (
    <section>
      <Suspense
        fallback={
          <SkeletonWrapper>
            <div className="w-full h-60" />
          </SkeletonWrapper>
        }
      >
        <Await resolve={checklist}>
          {(data: Tables<'checklist'>[]) =>
            <div className="flex flex-col w-full gap-4 p-4 rounded-lg min-h-60 bg-neutral-100 dark:bg-neutral-700/50">
              <AddCheckListForm room_id={roomInfo._id} checklist={data} />
              {
                data.length ?
                <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 items-stretch gap-[8px]">
                  {data.filter((check) => !check.checked).map((ck) =>
                    <CheckItem
                      key={ck.id}
                      {...ck}
                      reload={() => revalidator.revalidate()}
                    />
                  )}
                </ul>
                :
                <div className="flex-1 flex items-center justify-center w-full h-full text-[0.9375rem] text-neutral-400">
                  체크리스트를 추가해보세요
                </div>
              }
            </div>
          }
        </Await>
      </Suspense>
    </section>
  )
}