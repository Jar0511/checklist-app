import type { Session } from "@supabase/supabase-js";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const SESSION_KEY = "storedSession";
/** 사용자 세션 */
export const userAtom = atomWithStorage<Session | null>(
	SESSION_KEY,
	null
);
/** 사용자 세션 감지해야하는지 여부 */
export const detectSessionAtom = atom(false);
