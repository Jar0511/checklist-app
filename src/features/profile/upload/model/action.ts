import { atom } from "jotai";
import {
  FolderAtom,
  FolderErrAtom,
  FolderLoading,
} from "./store";
import { getFolderList } from "../api";
import type { ErrorResponse } from "react-router-dom";

export const fetchFolder = atom(
  null,
  async (get, set, path?: string, firstFetch?: boolean) => {
    const { page, folder, more } = get(FolderAtom);
    if (!more) return;
    set(FolderLoading, true);
    try {
      const list = await getFolderList(page + 1, 50, path);

      set(FolderAtom, {
        folder: [
          ...(firstFetch ? [] : folder),
          ...list.map((folder) => folder.name),
        ],
        page: page + 1,
        more: list.length >= 50,
      });
      set(FolderLoading, false);
      set(FolderErrAtom, undefined);
    } catch (e) {
      set(FolderErrAtom, e as ErrorResponse);
      set(FolderLoading, false);
    }
  }
);
