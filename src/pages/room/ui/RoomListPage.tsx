import { Header, RoomCard } from "@/widgets/ui";

export const RoomListPage = () => {
  return (
    <div className="relative flex flex-col w-full h-full overflow-auto">
      <Header>
        <h1>logo</h1>
      </Header>
      <main className="container mx-auto">
        <RoomCard />
      </main>
    </div>
  )
}