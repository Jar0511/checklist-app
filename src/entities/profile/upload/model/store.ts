import { atom } from "jotai";
import { FolderType } from "./models";

/** 폴더 목록 */
export const FolderAtom = atom<FolderType>({folder: [], page: 0, more: true});