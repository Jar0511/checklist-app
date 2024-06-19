import { supabase } from "@/shared/api";
import type { Tables } from "@/shared/model/supabase";

export const postNewMember = async (
	id: Tables<"user">["_id"]
) => {
	const { data, error } = await supabase
		.from("room_user")
		.insert([]);
};
