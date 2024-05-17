import { modalShowAtom } from "@/shared/model";
import { CustomButton, Modal } from "@/shared/ui";
import { useSetAtom } from "jotai";
import { MdGroups } from "react-icons/md";

export const CreateRoomButton = () => {
  const setShow = useSetAtom(modalShowAtom);
  return (
    <>
      <Modal outsideClose />
      <CustomButton
        modal
        btnstyle="inline"
        className="hover:bg-stone-500/15 dark:hover:bg-stone-300/25"
        onClick={() => setShow(true)}
      >
        <MdGroups />
        신규 방 생성
      </CustomButton>
    </>
  )
}