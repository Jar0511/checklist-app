import { Header, RoomCard } from "@/widgets/ui";
import { useLoaderData } from "react-router-dom";
import { Room } from "../model";

export const RoomListPage = () => {
  const loadData = useLoaderData() as Room[];
  console.log(loadData);
  return (
    <div className="relative flex flex-col w-full h-full overflow-auto">
      <Header>
        <h1>logo</h1>
      </Header>
      <main className="container mx-auto">
        <RoomCard room_nm={`죽을 먹는 사람들`} room_desc={'죽 먹기를 좋아하는 모임'} current_banner_id={'q'} />
      </main>
    </div>
  )
}