import { Header, RoomCard } from "@/widgets/ui";
import { useLoaderData } from "react-router-dom";
import { Room } from "../model";
import { CreateRoomButton } from "@/features/room/create";

export const RoomListPage = () => {
  const loadData = useLoaderData() as Room[];
  console.log(loadData);
  return (
    <div className="relative flex flex-col w-full h-full overflow-auto">
      <Header>
        <h1>logo</h1>
      </Header>
      <main className="container mx-auto">
        {loadData.map((room) =>
          <RoomCard
            key={room._id}
            _id={room._id}
            room_nm={room.room_nm}
            room_owner_id={room.owner?._id}
            room_desc={room.room_desc}
            current_banner_id={room.current_banner_id}
            room_owner_nm={room.owner?.user_nm}
          />
        )}

        <CreateRoomButton />
      </main>
    </div>
  )
}