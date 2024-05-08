import { FaHouseUser, FaUserGroup } from "react-icons/fa6";

export const RoomCard = () => {
  return (
    <div className="border border-solid rounded shadow-sm border-neutral-200 px-[20px] py-[16px] leading-tight flex items-start gap-x-[16px]">
      <h2 className="font-bold max-w-[40%]">죽을 먹는 자들</h2>
      <p className="flex-1 text-[0.9375rem]">{Array(50).fill("채팅방 설명").join("")}</p>
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