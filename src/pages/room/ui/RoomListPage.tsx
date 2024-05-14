import { Header, RoomCard } from "@/widgets/ui";
import { useLoaderData } from "react-router-dom";
import { Room } from "../model";
import { CreateRoomButton } from "@/features/room/create";
import { Modal } from "@/shared/ui";

export const RoomListPage = () => {
  const loadData = useLoaderData() as Room[];
  console.log(loadData);
  return (
    <div className="relative flex flex-col w-full h-full overflow-auto">

      <Modal />

      <Header>
        <h1>logo</h1>
      </Header>
      <main className="container mx-auto">
        <RoomCard room_nm={`죽을 먹는 사람들`} room_desc={'죽 먹기를 좋아하는 모임'} current_banner_id={'q'} />
        <CreateRoomButton />
      </main>
    </div>
  )
}