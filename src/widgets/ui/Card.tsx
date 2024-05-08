import { Tables } from "@/shared/model/supabase";
import { FaHouseUser, FaUserGroup } from "react-icons/fa6";
import { MdOutlineSmartToy } from "react-icons/md";

export const RoomCard = ({
  _id,
  room_nm,
  room_desc,
  room_owner_id,
  current_banner_id
}: Partial<Tables<"room">>) => {
  return (
    <div className="border border-solid rounded shadow-sm border-neutral-200 px-[20px] py-[16px] leading-tight flex items-start gap-x-[16px]">
      {!!current_banner_id && <MdOutlineSmartToy title="이벤트 진행 중"/>}
      <h2 className="font-bold max-w-[40%]">{room_nm}</h2>
      <p className="flex-1 text-[0.9375rem]">{room_desc}</p>
      <span title="방장" className="cursor-default flex items-center gap-x-[6px] text-neutral-500 text-[0.875rem]">
        <FaHouseUser />
        볼드모트
      </span>
      <span title="참여자 수" className="cursor-default flex items-center gap-x-[6px] text-neutral-500 text-[0.875rem]">
        <FaUserGroup />
        12
      </span>
    </div>
  )
}