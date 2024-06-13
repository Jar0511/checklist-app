import { supabase } from "@/shared/api"

/** 폴더 목록 조회 */
export const getFolderList = async (
  /** 현재 페이지(자연수) */
  page?: number,
  /** 조회시 가져올 데이터 길이(기본값: 100) */
  length?: number,
  /** 탐색 경로 */
  path?: string,
) => {
  const { data, error } = await supabase
    .storage
    .from(import.meta.env.VITE_SUPABASE_BUCKET)
    .list(
      path ?? '',
      {
        limit: length ?? 100,
        offset: page ? ((page - 1) * (length ?? 100)) + (page > 1 ? 1 : 0) : 0,
        sortBy: {column: 'name', order: 'asc'}
      }
    )

  if(error) {
    throw new Error(`폴더 조회 중 오류: ${error}`)
  }

  return data;
}

/** 파일 목록 조회 */
export const getFileList = async (
  /** 부모 폴더 이름 */
  folder: string
) => {
  const { data, error } = await supabase
    .from('profile')
    .select()
    .ilike('path', `${folder}/%`);

  if(error) {
    throw new Error(`파일 조회 중 오류: ${error}`)
  }

  return data
}