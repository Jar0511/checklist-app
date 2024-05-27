import { supabase } from "@/shared/api"
import { Tables } from "@/shared/model/supabase";

/** 최근 공지 조회 쿼리 */
export const getLatestNotice = async (room_id: number) => {
  const { data, error } = await supabase
    .from('notice')
    .select('*')
    .eq('room_id', room_id)
    .range(0, 0)
    .order('created_at', { ascending: false });

    if(error) {
      throw new Error(`공지 조회 중 오류: ${error}`)
    }

    return data[0];
}

/** 공지 리스트 조회 쿼리 */
export const getNoticeList = async (room_id: number, page: number) => {
  const from = (page - 1) * 10;
  const to = from + 10 - 1;

  const { data, error, count } = await supabase
    .from('notice')
    .select('*', { count: 'exact' })
    .eq('room_id', room_id)
    .range(from, to)
    .order('created_at', { ascending: false });

    if(error) {
      throw new Error(`공지 조회 중 오류: ${error}`)
    }

    return {data, count};
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