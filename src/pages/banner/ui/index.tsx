import { FolderAtom, fetchFolder } from "@/features/profile/upload";
import { SearchInput } from "@/shared/ui";
import { Header } from "@/widgets/ui"
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const BannerDashBoardPage = () => {
  const [search, setSearch] = useSearchParams();
  const SEARCH_KEY = "name";
  const {folder, more} = useAtomValue(FolderAtom);
  const fetcher = useSetAtom(fetchFolder);

  useEffect(() => {
    fetcher()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  } , []);

  return (
    <div className="relative flex flex-col w-full h-full overflow-auto">
      <Header logo />
      <section className="container flex items-stretch flex-1 mx-auto">
        <aside className="w-full overflow-auto border border-solid border-neutral-200 dark:border-neutral-500 sm:w-[320px] p-6 bg-neutral-50 dark:bg-neutral-700">
          <div><SearchInput queryKey={SEARCH_KEY} realTime /></div>
          <div className="bg-blue-300">박스</div>
          <div className="bg-blue-300">박스</div>
          <div className="bg-blue-300">박스</div>
          <div className="bg-blue-300">박스</div>
          <div className="bg-blue-300">박스</div>
          <div className="bg-blue-300">박스</div>
          <div className="bg-blue-300">박스</div>
          <div className="bg-blue-300">박스</div>
          <div className="bg-blue-300">박스</div>
          <div className="bg-blue-300">박스</div>
          <div className="bg-blue-300">박스</div>
          {
            folder.filter((title) =>
              !search.get(SEARCH_KEY) || title.includes(search.get(SEARCH_KEY) as string)
            ).map((title) =>
              <p key={title} onClick={() => setSearch({...Object.fromEntries(search), target: title})}>{title}</p>
            )
          }
          <button type="button" onClick={fetcher} disabled={!more}>
            클릭 테스트!
          </button>
        </aside>
        <main className="flex-1 h-full overflow-auto bg-pink-50"></main>
      </section>
    <footer className="text-center">bottom text</footer>
    </div>
  )
}