import { SESSION_KEY } from "@/entities/auth";
import { supabase } from "@/shared/api";
import type { Session } from "@supabase/supabase-js";

/** 방 목록 조회 쿼리 */
export const loadRoomList = async () => {
	const session = JSON.parse(
		localStorage.getItem(SESSION_KEY) ?? "null"
	) as Session | null;
	if (!session) {
		throw new Error(`세션 유실, 다시 로그인해주세요.`);
	}
	const { data, error } = await supabase
		.from("room_user")
		.select(
			`
      room(
        _id,
        room_nm,
        room_desc,
        current_banner_id,
        owner:user(
          user_nm,
          _id
        )
      )
    `
		)
		.eq("user_id", session.user.id);

	if (error) {
		throw new Error(`방 조회 중 에러: ${error}`);
	}

	return data
		.filter((d) => !!d && !!d.room)
		.map(({ room }) => ({ ...room }));
};

/** 특정 방의 전체 체크리스트 조회 */
export const getAllChecklist = async (room_id: number) => {
	const { data, error } = await supabase
		.from("checklist")
		.select("*")
		.eq("room_id", room_id)
		// 많이 체크된 것 우선(드롭다운 목록 규칙)
		.order("count", { ascending: false });

	if (error) {
		throw new Error(`체크리스트 조회 중 오류: ${error}`);
	}

	return data;
};
