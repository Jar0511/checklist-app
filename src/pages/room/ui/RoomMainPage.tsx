import { getRoomInfo, roomInfoAtom } from "@/entities/room";
import { ChecklistSection } from "@/features/checklist";
import { NoticeSection } from "@/features/notice";
import { WishBanner } from "@/features/profile/wish";
import { Header } from "@/widgets/ui";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";

const RoomMainPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <NoticeSection />
      <WishBanner />
      <ChecklistSection />
    </div>
  );
};

export const RoomWrapper = () => {
  const { room_id } = useParams();
  const [roomInfo, setRoomInfo] = useAtom(roomInfoAtom);

  useEffect(() => {
    if (room_id) {
      (async () => {
        const info = await getRoomInfo(Number(room_id));
        setRoomInfo(info);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room_id]);

  useEffect(() => {
    return () => setRoomInfo(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-full overflow-auto">
      <Header logo className="">
        <h2 className="font-bold text-[1.25rem]">
          {roomInfo?.room_nm}
        </h2>
      </Header>
      <main className="container mx-auto">
        <RoomMainPage />
        <Outlet />
      </main>
    </div>
  );
};
