import { Session } from "@supabase/supabase-js";
import { atom } from "jotai";

/** 사용자 세션 */
export const userAtom = atom<Session | null>(null);