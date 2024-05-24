import { supabase } from "@/shared/api"
import { Tables } from "@/shared/model/supabase";

/** 공지 조회 쿼리 */
export const getNoticeList = async (room_id: number) => {
  const { data, error } = await supabase
    .from('notice')
    .select('*')
    .eq('room_id', room_id)
    .order('created_at', { ascending: false });

    if(error) {
      throw new Error(`공지 조회 중 오류: ${error}`)
    }

    return data;
}

/** 새로운 공지 등록 쿼리 */
export const postNewNotice = async (body: Pick<Tables<"notice">, "content"|"room_id"|"creator">) => {
  const { error } = await supabase
    .from('notice')
    .insert([
      body
    ])

    if(error) {
      throw new Error(`공지 등록 중 오류: ${error}`)
    }
}