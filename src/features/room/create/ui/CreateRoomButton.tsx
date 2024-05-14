import { CustomButton } from "@/shared/ui";
import { MdGroups } from "react-icons/md";

export const CreateRoomButton = () => {

  return (
    <CustomButton
      btnstyle="inline"
      className="hover:bg-stone-500/15 dark:hover:bg-stone-300/25"
    >
      <MdGroups />
      신규 방 생성
    </CustomButton>
  )
}