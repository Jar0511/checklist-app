import { Tables } from "@/shared/model/supabase"
import { MdAdd } from "react-icons/md"
import { modalShowAtom, required, trimmed } from "@/shared/model"
import { useForm } from "react-hook-form"
import { CustomTextarea } from "@/shared/ui/Inputs"
import { userAtom } from "@/entities/auth"
import { postNewNotice } from "../api"
import { useState } from "react"
import { FilledButton, Modal, OutlinedButton } from "@/shared/ui"
import { useAtomValue, useSetAtom } from "jotai"
import { roomInfoAtom } from "@/entities/room"

export const AddNewNoticeButton = ({onSuccess}: {onSuccess: () => void}) => {
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
          <FilledButton
            btncolor="primary"
            type="submit"
            form="newNoticeForm"
            disabled={!isValid}
          >
            확인
          </FilledButton>
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
          <CustomTextarea {...contentRegister} className="border-neutral-500" />
        </form>
      </Modal>
      <div className="flex justify-end">
        <OutlinedButton
          modal
          onClick={() => setShow("add_new_notice")}
          size="sm"
        >
          <MdAdd />
          공지 등록
        </OutlinedButton>
      </div>
    </>
  )
}