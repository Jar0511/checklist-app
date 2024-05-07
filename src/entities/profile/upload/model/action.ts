import { atom } from "jotai";
import { FolderAtom } from "./store";
import { getFolderList } from "../api";

export const fetchFolder = atom(null, async (get, set) => {
  const {page, folder, more} = get(FolderAtom);
  if(!more) return;

  const list = await getFolderList(page + 1, 50);
  console.log(list);

  set(FolderAtom, {
    folder: [...folder, ...list.map(() => "4")],
    page: page + 1,
    more: list.length >= 50
  });
})