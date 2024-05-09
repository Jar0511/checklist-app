import { Tables } from "@/shared/model/supabase";
import { HTMLAttributes } from "react";
import { FaHouseUser, FaUserGroup } from "react-icons/fa6";
import { PiCalendarStarFill } from "react-icons/pi";

const AdditionalInfo = ({children, ...rest}: HTMLAttributes<HTMLSpanElement>) => (
  <span {...rest} className="cursor-default flex items-center gap-x-[6px] text-neutral-500 dark:text-neutral-300 text-[0.875rem]">
    {children}
  </span>
)

export const RoomCard = ({
  _id,
  room_nm,
  room_desc,
  room_owner_id,
  current_banner_id
}: Partial<Tables<"room">>) => {
  return (
    <div className="border border-solid rounded shadow-sm border-neutral-200 dark:border-neutral-400 px-[20px] py-[16px] leading-tight flex sm:flex-row flex-col sm:items-start gap-[16px] dark:bg-stone-800">
      <div className="flex items-start sm:gap-[16px] gap-[8px] max-w-[40%]">
        <span title={current_banner_id ? "프로필 뽑기 진행 중" : ""} className="w-[1.25rem] h-[1.25rem] inline-flex items-center justify-center">
          {!!current_banner_id && <PiCalendarStarFill className="size-[1.25rem] fill-grapefruit-500 dark:fill-grapefruit-700" />}
        </span>
        <h2 className="font-bold dark:text-white">{room_nm}</h2>
      </div>
      <p className="flex-1 text-[0.9375rem]">{room_desc}</p>
      <div className="flex sm:gap-[16px] gap-[10px] items-cetner">
        <AdditionalInfo title="방장">
          <FaHouseUser />
          볼드모트
        </AdditionalInfo>
        <AdditionalInfo title="참여자 수">
          <FaUserGroup />
          12
        </AdditionalInfo>
      </div>
    </div>
  )
}