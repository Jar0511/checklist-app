import type { Session } from "@supabase/supabase-js";
import { atomWithStorage } from "jotai/utils";

export const SESSION_KEY = "storedSession"
/** 사용자 세션 */
export const userAtom = atomWithStorage<Session | null>(SESSION_KEY, null);