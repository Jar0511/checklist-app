import type { Tables } from "@/shared/model/supabase";
import { atomWithStorage } from "jotai/utils";

export const USER_KEY = "storedUser";
export const userInfoAtom = atomWithStorage<
  | (Partial<Omit<Tables<"user">, "_id" | "user_role">> & {
      owner?: boolean;
    })
  | null
>(USER_KEY, null);
