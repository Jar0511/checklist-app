import { FolderAtom, fetchFolder } from "@/features/profile/upload";
import { CustomButton, SearchInput } from "@/shared/ui";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import { HiHome } from "react-icons/hi";
import { MdOutlineArrowBack } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";

export const DashboardSideMenu = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useSearchParams();
  const SEARCH_KEY = "name";
  const {folder, more} = useAtomValue(FolderAtom);
  const fetcher = useSetAtom(fetchFolder);

  useEffect(() => {
    fetcher()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  } , []);

  return (
    <aside className="w-full overflow-auto border border-solid border-neutral-200 dark:border-neutral-500 sm:w-[320px] p-6 bg-neutral-50 dark:bg-neutral-700">
      <CustomButton aria-label="back" btnstyle="inline" className="px-0" onClick={() => navigate("/room/list")}>
        <HiHome />
        <MdOutlineArrowBack />
      </CustomButton>
      <SearchInput queryKey={SEARCH_KEY} realTime />
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
  )
}