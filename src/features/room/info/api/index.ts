import { supabase } from "@/shared/api"

/** 방 참여자 조회 쿼리 */
export const getRoomMembers = async (_id: number) => {
  const { data, error } = await supabase
    .from('room')
    .select(`
      _id,
      room_owner_id,
      members:room_user(
        info:user(
          _id,
          user_nm,
          user_profile
        )
      )
    `)
    .eq('_id', _id)

    if(error) {
      throw new Error(`참여자 조회 중 에러: ${error}`)
    }

    return {
      ...data[0],
      members: data[0].members.filter(m => !!m).map(({ info }) => info)
    }
}