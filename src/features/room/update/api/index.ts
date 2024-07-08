import { supabase } from "@/shared/api";
import type { Tables } from "@/shared/model/supabase";

/** 방의 설명 및 이름을 업데이트하는 쿼리. 업데이트하는 항목이 null일 경우 해당 항목을 제외합니다. */
export const postUpdateRoomName = async ({
  _id,
  room_nm,
  room_desc,
}: Pick<
  Tables<"room">,
  "_id" | "room_nm" | "room_desc"
>) => {
  const { error } = await supabase
    .from("room")
    .update(
      room_nm == null
        ? { room_desc }
        : room_desc == null
          ? { room_nm }
          : { room_nm, room_desc }
    )
    .eq("_id", _id);

  if (error) {
    throw new Error(`방 수정 중 오류: ${error}`);
  }
};
