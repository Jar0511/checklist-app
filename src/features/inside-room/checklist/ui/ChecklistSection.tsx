import { roomInfoAtom } from "@/entities/room";
import { useDebounce, useFetch } from "@/shared/lib";
import { CustomInput, DropDownWrapper, SkeletonWrapper } from "@/shared/ui"
import { useAtomValue } from "jotai";
import { Suspense, KeyboardEvent, useState, useEffect } from "react"
import { getCheckWaitlist, getChecklist } from "../api";

const AddCheckListForm = ({room_id}: {room_id: number}) => {
  const [refresh, setRefresh] = useState(0);
  const [focus, setFocus] = useState(false);
  const [selectIndex, setSelectIndex] = useState<number | undefined>(undefined);
  const _checklist = useFetch(getCheckWaitlist, room_id, refresh);

  const handleKeyEvent = (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.key == "ArrowUp") {
      return setSelectIndex(prev =>
        !prev ?
          (_checklist ? _checklist.length - 1 : undefined)
          :
          (prev + 1 < _checklist!.length ? prev + 1 : 0)
      );
    }
    const target = (e.target as HTMLInputElement);
    console.log(target.value);
    console.log(e.key)
  }
  const debounde = useDebounce(handleKeyEvent, 1000);

  useEffect(() => {
    if(!focus) setSelectIndex(undefined);
  }, [focus]);

  return (
    <div className="relative">
      <CustomInput
        placeholder="지금 필요한 건.."
        // onChange={(e) => debounde(e)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onKeyDown={(e) => debounde(e)}
      />
      {focus &&
        <DropDownWrapper width={"100%"} top={"100%"} left={0}>
          text
        </DropDownWrapper>
      }
    </div>
  )
}

const CheckList = ({room_id, refresh}: {room_id: number, refresh: number}) => {
  const _checklist = useFetch(getChecklist, room_id, refresh);

  if((!_checklist || !_checklist.length)) {
    return (
      <div className="flex-1 flex items-center justify-center w-full h-full text-[0.9375rem] text-neutral-400">
        체크리스트를 추가해보세요
      </div>
    )
  } else {
    return (
      <ul className="">
        {(!_checklist || !_checklist.length) &&
          <p className="text-center">

          </p>
        }
        {_checklist?.map((check) =>
          <li key={check.id}></li>
        )}
      </ul>
    )
  }

}

export const ChecklistSection = () => {
  const [refresh, setRefresh] = useState(0);
  const roomInfo = useAtomValue(roomInfoAtom);
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
        <div className="flex flex-col w-full gap-2 p-4 rounded-lg min-h-60 bg-neutral-100 dark:bg-neutral-800">
          <AddCheckListForm room_id={roomInfo._id} />
          <CheckList room_id={roomInfo._id} refresh={refresh} />
        </div>
      </Suspense>
    </section>
  )
}