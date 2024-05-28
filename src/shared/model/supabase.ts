export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      checklist: {
        Row: {
          checked: boolean
          count: number
          created_at: string
          id: number
          room_id: number | null
          title: string | null
        }
        Insert: {
          checked?: boolean
          count?: number
          created_at?: string
          id?: number
          room_id?: number | null
          title?: string | null
        }
        Update: {
          checked?: boolean
          count?: number
          created_at?: string
          id?: number
          room_id?: number | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "checklist_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "room"
            referencedColumns: ["_id"]
          },
        ]
      }
      notice: {
        Row: {
          content: string | null
          created_at: string | null
          creator: string | null
          id: number
          room_id: number | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          creator?: string | null
          id?: number
          room_id?: number | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          creator?: string | null
          id?: number
          room_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "notice_creator_fkey"
            columns: ["creator"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "notice_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "room"
            referencedColumns: ["_id"]
          },
        ]
      }
      profile: {
        Row: {
          _id: string
          desc: string | null
          fool_id: string | null
          img_nm: string | null
          path: string | null
          rank: number
          thumb_id: string | null
          url: string | null
        }
        Insert: {
          _id?: string
          desc?: string | null
          fool_id?: string | null
          img_nm?: string | null
          path?: string | null
          rank?: number
          thumb_id?: string | null
          url?: string | null
        }
        Update: {
          _id?: string
          desc?: string | null
          fool_id?: string | null
          img_nm?: string | null
          path?: string | null
          rank?: number
          thumb_id?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_fool_id_fkey"
            columns: ["fool_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "profile_thumb_id_fkey"
            columns: ["thumb_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["_id"]
          },
        ]
      }
      profile_banner: {
        Row: {
          _id: string
          banner_nm: string | null
          created_at: string
          creator_id: string
          dir_nm: string | null
          is_public: boolean
          rank_4_1: string | null
          rank_4_2: string | null
          rank_4_3: string | null
          rank_5: string | null
        }
        Insert: {
          _id?: string
          banner_nm?: string | null
          created_at?: string
          creator_id: string
          dir_nm?: string | null
          is_public?: boolean
          rank_4_1?: string | null
          rank_4_2?: string | null
          rank_4_3?: string | null
          rank_5?: string | null
        }
        Update: {
          _id?: string
          banner_nm?: string | null
          created_at?: string
          creator_id?: string
          dir_nm?: string | null
          is_public?: boolean
          rank_4_1?: string | null
          rank_4_2?: string | null
          rank_4_3?: string | null
          rank_5?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_room_banner_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "public_room_banner_rank_4_1_fkey"
            columns: ["rank_4_1"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "public_room_banner_rank_4_2_fkey"
            columns: ["rank_4_2"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "public_room_banner_rank_4_3_fkey"
            columns: ["rank_4_3"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "public_room_banner_rank_5_fkey"
            columns: ["rank_5"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["_id"]
          },
        ]
      }
      room: {
        Row: {
          _id: number
          current_banner_id: string | null
          room_desc: string | null
          room_nm: string | null
          room_owner_id: string | null
        }
        Insert: {
          _id?: number
          current_banner_id?: string | null
          room_desc?: string | null
          room_nm?: string | null
          room_owner_id?: string | null
        }
        Update: {
          _id?: number
          current_banner_id?: string | null
          room_desc?: string | null
          room_nm?: string | null
          room_owner_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_room_current_banner_id_fkey"
            columns: ["current_banner_id"]
            isOneToOne: false
            referencedRelation: "profile_banner"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "public_room_room_owner_id_fkey"
            columns: ["room_owner_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["_id"]
          },
        ]
      }
      room_user: {
        Row: {
          _id: number
          room_id: number | null
          user_id: string | null
        }
        Insert: {
          _id?: number
          room_id?: number | null
          user_id?: string | null
        }
        Update: {
          _id?: number
          room_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_room_participants_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "room"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "public_room_participants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["_id"]
          },
        ]
      }
      user: {
        Row: {
          _id: string
          last_4_stacked: number
          last_5_stacked: number
          picked_4: boolean
          picked_5: boolean
          profile_bg: string | null
          user_nm: string
          user_profile: string | null
          user_role: boolean
        }
        Insert: {
          _id?: string
          last_4_stacked?: number
          last_5_stacked?: number
          picked_4?: boolean
          picked_5?: boolean
          profile_bg?: string | null
          user_nm?: string
          user_profile?: string | null
          user_role?: boolean
        }
        Update: {
          _id?: string
          last_4_stacked?: number
          last_5_stacked?: number
          picked_4?: boolean
          picked_5?: boolean
          profile_bg?: string | null
          user_nm?: string
          user_profile?: string | null
          user_role?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "public_user_user_profile_fkey"
            columns: ["user_profile"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["_id"]
          },
        ]
      }
      user_profile: {
        Row: {
          _id: number
          profile_id: string | null
          user_id: string | null
        }
        Insert: {
          _id: number
          profile_id?: string | null
          user_id?: string | null
        }
        Update: {
          _id?: number
          profile_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_user_profile_list_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "public_user_profile_list_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_count: {
        Args: {
          room_id: number
          x: number
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
