import { FolderAtom, fetchFolder } from "@/features/profile/upload"
import { useAtomValue, useSetAtom } from "jotai"

/** 임시 테스트 페이지 */
export const TempPage = () => {
  const {folder, more} = useAtomValue(FolderAtom);
  const fetcher = useSetAtom(fetchFolder);
  return (
    <div className="relative">
      <button type="button" onClick={fetcher} disabled={!more}>
        클릭 테스트!
      </button>
      {folder.map((title) => <p key={title}>{title}</p>)}
    </div>
  )
}