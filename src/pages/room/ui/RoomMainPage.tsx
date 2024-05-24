import { getRoomInfo, roomInfoAtom } from "@/entities/room";
import { useDebounce } from "@/shared/lib";
import { CustomInput } from "@/shared/ui";
import { Header } from "@/widgets/ui"
import { useAtom } from "jotai";
import { ChangeEvent, useEffect } from "react";
import { AiFillNotification } from "react-icons/ai";
import { Outlet, useParams } from "react-router-dom"

const NoticeCard = () => {
  return (
    <div id="test_alert" className="flex items-start gap-3 p-3 text-[0.875rem] font-medium rounded-md bg-grapefruit-50">
      <div className="text-white rounded-full bg-grapefruit-400 w-[28px] h-[28px] flex items-center justify-center">
        <AiFillNotification className="size-[16px]" />
      </div>
      <p className={`pt-1 flex-1`}>
        사랑하는사랑하는 우리우리 멤버멤버들 안녕안녕하십니까하십니까
      </p>
    </div>
  )
}

const CheckItem = () => {
  return (
    <div className="p-[4px] rounded bg-white font-semibold">메론즙</div>
  )
}

const CheckList = () => {
  const debounde = useDebounce((e: ChangeEvent<HTMLInputElement>) => console.log(e.target.value), 1000)
  return (
    <div className="flex flex-col gap-4 p-4 rounded bg-neutral-100">
      <div className="relative group">
        <CustomInput placeholder="지금 우리에게 필요한 건.." onChange={(e) => debounde(e)} />
        <div className="absolute hidden">
          입력을 계속해서 체크리스트를 추가해보세요..
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 text-lg ">
        <CheckItem />
      </div>
    </div>
  )
}

export const RoomWrapper = () => {
  const { room_id } = useParams();
  const [roomInfo, setRoomInfo] = useAtom(roomInfoAtom);

  useEffect(() => {
    if(room_id) {
      (async () => {
        const info = await getRoomInfo(Number(room_id))
        setRoomInfo(info);
      })();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room_id]);

  return (
    <div className="w-full h-full overflow-auto">
      <Header logo className="">
        <p>{roomInfo?.room_nm}</p>
      </Header>
      <main className="container mx-auto">
        <NoticeCard />
        <CheckList/>
        <Outlet />
      </main>
    </div>
  )
}