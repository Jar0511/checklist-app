import { supabase } from "@/shared/api";

/** 방 정보 조회 쿼리 */
export const getRoomInfo = async (_id: number) => {
	const { data, error } = await supabase
		.from("room")
		.select(
			`
      _id,
      room_nm,
      room_desc,
      room_owner_id,
      banner:profile_banner(
        _id,
        banner_nm,
        rank_5,
        rank_4_1,
        rank_4_2,
        rank_4_3,
        dir_nm
      )
    `
		)
		.eq("_id", _id);

	if (error) {
		throw new Error(`방 정보 조회 중 에러: ${error}`);
	}

	return data[0];
};
