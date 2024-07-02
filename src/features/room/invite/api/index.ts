import { supabase } from "@/shared/api";
import type { Tables } from "@/shared/model/supabase";

export const postNewMember = async (
	user_id: Tables<"user">["_id"],
	room_id: Tables<"room">["_id"]
) => {
	const { error } = await supabase
		.from("room_user")
		.insert([
			{user_id, room_id}
		]);

		if(error){
			throw new Error(`신규 멤버 추가 중 에러: ${error}`);
		}
};
