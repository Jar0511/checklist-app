import type { Tables } from "@/shared/model/supabase";

export type Room = Partial<
  Omit<Tables<"room">, "room_owner_id"> & {
    owner?: Pick<Tables<"user">, "user_nm" | "_id">;
  }
>;
