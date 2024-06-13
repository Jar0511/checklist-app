import { DashboardSideMenu, Header } from "@/widgets/ui"

export const BannerDashBoardPage = () => {
  return (
    <div className="relative flex flex-col w-full h-full overflow-auto bg-neutral-100 dark:bg-stone-800">
      <Header logo />
      <section className="container flex items-stretch flex-1 gap-6 py-3 mx-auto">
        <DashboardSideMenu />
        <main className="flex-1 h-full overflow-auto bg-white rounded-lg dark:bg-stone-700"></main>
      </section>
    <footer className="text-center">bottom text</footer>
    </div>
  )
}