import { supabase } from "@/shared/api"

export const getFolderList = async (
  page?: number,
  length?: number
) => {
  const { data, error } = await supabase
    .storage
    .from(import.meta.env.VITE_SUPABASE_BUCKET)
    .list('', {
      limit: length ?? 100,
      offset: page ? ((page - 1) * (length ?? 100)) + (page > 1 ? 1 : 0) : 0,
      sortBy: {column: 'name', order: 'asc'}
    })

    if(error) {
      console.error("폴더 조회 중 오류", error);
      return [];
    }

    return data ?? [];
}