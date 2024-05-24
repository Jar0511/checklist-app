import { getRoomInfo, roomInfoAtom } from "@/entities/room";
import { NoticeSection } from "@/features/inside-room/notice";
import { useDebounce } from "@/shared/lib";
import { CustomInput } from "@/shared/ui";
import { Header } from "@/widgets/ui"
import { useAtom } from "jotai";
import { ChangeEvent, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom"

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

const RoomMainPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <NoticeSection />
      <CheckList/>
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
        <RoomMainPage />
        <Outlet />
      </main>
    </div>
  )
}