import { SESSION_KEY } from "@/entities/auth"
import { supabase } from "@/shared/api";
import { Session } from "@supabase/supabase-js";

/** 방 목록 조회 쿼리 */
export const loadRoomList = async () => {
  const session = JSON.parse(localStorage.getItem(SESSION_KEY) ?? 'null') as Session | null;
  if(!session) {
    throw new Error(`세션 유실, 다시 로그인해주세요.`);
  }
  const { data, error } = await supabase
    .from('room_user')
    .select(`
      room(
        room_nm,
        room_desc,
        current_banner_id,
        owner:user(
          user_profile,
          user_nm,
          _id
        )
      )
    `)
    .eq('user_id', session.user.id)

  if(error) {
    throw new Error(`방 조회 중 에러: ${error}`)
  }

  return data.filter((d) => (!!d && !!d.room)).map(({room}) => ({...room}));
}