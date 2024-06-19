import { supabase } from "@/shared/api";

export const getMyInfo = async (_id: string) => {
	const { data, error } = await supabase
		.from("user")
		.select()
		.eq("_id", _id);

	if (error) {
		throw new Error(`사용자 정보 조회 중 오류: ${error}`);
	}

	return data[0];
};
