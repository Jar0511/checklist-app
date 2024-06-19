import { supabase } from "@/shared/api";
import type { Tables } from "@/shared/model/supabase";

export const postNewRoom = async (
	req: Partial<Tables<"room">>
) => {
	const { data, error } = await supabase
		.from("room")
		.insert([req])
		.select("_id, room_owner_id");

	if (error) {
		throw new Error(`방 생성 중 오류: ${error}`);
	}

	const { _id, room_owner_id } = data[0];
	const { error: error2 } = await supabase
		.from("room_user")
		.insert([{ room_id: _id, user_id: room_owner_id }]);

	if (error2) {
		throw new Error(`방장 등록 중 오류: ${error2}`);
	}
};
