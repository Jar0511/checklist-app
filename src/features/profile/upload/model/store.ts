import { atom } from "jotai";
import type { FolderType } from "./models";
import type { ErrorResponse } from "react-router-dom";

/** 폴더 목록 */
export const FolderAtom = atom<FolderType>({
  folder: [],
  page: 0,
  more: true,
});
/** 폴더 조회 로딩 */
export const FolderLoading = atom(false);
/** 폴더 조회 실패 여부 */
export const FolderErrAtom = atom<
  undefined | ErrorResponse
>(undefined);
