import { supabase } from "@/shared/api"

/** 활성화된 체크리스트 조회 */
export const getChecklist = async (room_id: number) => {
  const { data, error } = await supabase
    .from('checklist')
    .select('*')
    .eq('room_id', room_id)
    .eq('checked', false)

    if(error) {
      throw new Error(`체크리스트 조회 중 오류: ${error}`)
    }

    return data;
}

/** 비활성화된 체크리스트 조회 */
export const getCheckWaitlist = async (room_id: number) => {
  const { data, error } = await supabase
    .from('checklist')
    .select('*')
    .eq('room_id', room_id)
    .eq('checked', true)

    if(error) {
      throw new Error(`체크리스트 조회 중 오류: ${error}`)
    }

    return data;
}