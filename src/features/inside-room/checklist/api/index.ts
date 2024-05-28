import { supabase } from "@/shared/api"
import { Tables } from "@/shared/model/supabase";

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

/** 신규 체크리스트 추가 */
export const postNewChecklist = async (body: Partial<Tables<'checklist'>>) => {
  const { error } = await supabase
    .from('checklist')
    .insert([
      {...body, checked: false}
    ])

    if(error) {
      throw new Error(`체크리스트 추가 중 오류: ${error}`)
    }
}

/** 체크리스트 토글 */
export const postToggleChecklist = async (body: Pick<Tables<'checklist'>, "checked"|"id">) => {
  const { error } = await supabase
    .from('checklist')
    .update(body)
    .eq('id', body.id)

    if(error) {
      throw new Error(`체크리스트 상태 변경 중 오류: ${error}`)
    }

    if(body.checked) {
      const { error } = await supabase
        .rpc('increment_count', {
          _id: body.id,
          x: 1
        })

        if(error) {
          throw new Error(`체크리스트 사용 횟수 변경 중 오류: ${error}`)
        }
    }
}