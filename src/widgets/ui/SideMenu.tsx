import { FolderAtom, fetchFolder } from "@/features/profile/upload";
import { FilledButton, SearchInput } from "@/shared/ui";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import { HiHome } from "react-icons/hi";
import { MdOutlineArrowBack } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";

export const DashboardSideMenu = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useSearchParams();
  const SEARCH_KEY = "name";
  const TARGET_KEY = "target";
  const {folder, more} = useAtomValue(FolderAtom);
  const fetcher = useSetAtom(fetchFolder);
  const targetName = search.get(TARGET_KEY);

  useEffect(() => {
    fetcher()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  } , []);

  return (
    <aside className="w-full overflow-auto border border-solid border-neutral-200 dark:border-neutral-500 sm:w-[320px] p-6 bg-neutral-50 dark:bg-neutral-700">
      <FilledButton
        title={targetName ? "back" : "home"}
        className="px-0"
        onClick={() => targetName ? setSearch({...Object.fromEntries(search), [TARGET_KEY]: ""}) : navigate("/room/list")}
      >
        {targetName ? <MdOutlineArrowBack /> : <HiHome />}
      </FilledButton>
      <SearchInput queryKey={SEARCH_KEY} realTime />
      {
        folder.filter((title) =>
          !search.get(SEARCH_KEY) || title.includes(search.get(SEARCH_KEY) as string)
        ).map((title) =>
          <p key={title} onClick={() => setSearch({...Object.fromEntries(search), [TARGET_KEY]: title, [SEARCH_KEY]: title})}>{title}</p>
        )
      }
      <button type="button" onClick={fetcher} disabled={!more}>
        클릭 테스트!
      </button>
  </aside>
  )
}