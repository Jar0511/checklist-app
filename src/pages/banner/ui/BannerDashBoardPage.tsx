import { DashboardSideMenu, Header } from "@/widgets/ui"

export const BannerDashBoardPage = () => {
  return (
    <div className="relative flex flex-col w-full h-full overflow-auto">
      <Header logo />
      <section className="container flex items-stretch flex-1 mx-auto">
        <DashboardSideMenu />
        <main className="flex-1 h-full overflow-auto bg-pink-50"></main>
      </section>
    <footer className="text-center">bottom text</footer>
    </div>
  )
}