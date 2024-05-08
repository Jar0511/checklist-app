import { Tables } from "@/shared/model/supabase";
import { atomWithStorage } from "jotai/utils";

export const USER_KEY = "storedUser";
export const userInfoAtom = atomWithStorage<Omit<Tables<'user'>, '_id' | 'user_role'> | null>(USER_KEY, null);