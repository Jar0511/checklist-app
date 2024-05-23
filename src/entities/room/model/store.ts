import { Tables } from "@/shared/model/supabase";
import { atomWithStorage } from "jotai/utils";

export const ROOM_KEY = "storedRoom";
export const roomInfoAtom = atomWithStorage<Pick<Tables<'room'>, "_id"|"room_nm"|"room_desc"> & {banner: null | Omit<Tables<'profile_banner'>, "created_at" | "creator_id" | "is_public">}| null>(ROOM_KEY, null);