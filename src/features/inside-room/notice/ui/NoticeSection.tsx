import { useFetch } from "@/shared/lib"
import { AiFillNotification } from "react-icons/ai"
import { getNoticeList, postNewNotice } from "../api"
import { Suspense, useState } from "react"
import { CustomButton, Modal, SkeletonWrapper } from "@/shared/ui"
import { useAtomValue, useSetAtom } from "jotai"
import { roomInfoAtom } from "@/entities/room"
import { Tables } from "@/shared/model/supabase"
import { MdAdd } from "react-icons/md"
import { modalShowAtom, required, trimmed } from "@/shared/model"
import { useForm } from "react-hook-form"
import { CustomTextarea } from "@/shared/ui/Inputs"
import { userAtom } from "@/entities/auth"

const AddNewNoticeButton = ({onSuccess}: {onSuccess: () => void}) => {
  const {
    register,
    handleSubmit,
    formState: {isValid}
  } = useForm<Tables<"notice">>();
  const contentRegister = register("content", {required, setValueAs: trimmed});
  const setShow = useSetAtom(modalShowAtom);
  const userInfo = useAtomValue(userAtom);
  const roomInfo = useAtomValue(roomInfoAtom);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Modal
        modal_id="add_new_notice"
        outsideClose
        actionButtons={
          <CustomButton
            type="submit"
            form="newNoticeForm"
            disabled={!isValid}
          >
            확인
          </CustomButton>
        }
        loading={loading}
      >
        <h3>신규 공지 등록</h3>
        <form
          id="newNoticeForm"
          className="w-full"
          onSubmit={handleSubmit(async (v) => {
            if(!userInfo || !roomInfo) return;
            setLoading(true)
            await postNewNotice({
              ...v,
              creator: userInfo.user.id,
              room_id: roomInfo._id
            });
            setLoading(false);
            onSuccess();
            setShow(null);
          })}
        >
          <CustomTextarea {...contentRegister} />
        </form>
      </Modal>
      <div className="flex flex-wrap justify-center">
        <CustomButton
          btnstyle="inline"
          modal
          onClick={() => setShow("add_new_notice")}
        >
          <MdAdd />
          신규 공지 작성하기
        </CustomButton>
      </div>
    </>
  )
}

const NoticeCard = ({
  content
} : Tables<"notice">) => {
  return (
    <div className="flex items-start gap-3 p-3 text-[0.875rem] font-medium rounded-md bg-grapefruit-50">
      <div className="text-white rounded-full bg-grapefruit-400 w-[28px] h-[28px] flex items-center justify-center">
        <AiFillNotification className="size-[16px]" />
      </div>
      <p className={`pt-1 flex-1`}>
        {content}
      </p>
    </div>
  )
}

const NoticeCardList = ({room_id}: {room_id: number}) => {
  const [refresh, setRefresh] = useState(0);
  const _notices = useFetch(getNoticeList, room_id, refresh);
  return (
    <section>
      {_notices?.length ?
        _notices.map((notice) =>
          <NoticeCard
            key={notice.id}
            {...notice}
          />
        )
        :
        <AddNewNoticeButton onSuccess={() => setRefresh(num => num + 1)} />
      }
    </section>
  )
}

export const NoticeSection = () => {
  const roomInfo = useAtomValue(roomInfoAtom);
  if(!roomInfo) {
    return (<></>)
  }

  return (
    <Suspense
      fallback={
        <SkeletonWrapper>
          <div className="w-full h-12 rounded-md" />
        </SkeletonWrapper>
      }
    >
      <NoticeCardList room_id={roomInfo?._id} />
    </Suspense>
  )
}