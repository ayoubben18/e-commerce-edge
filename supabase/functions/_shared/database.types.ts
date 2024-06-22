export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      cart: {
        Row: {
          added_at: string | null;
          expiration_date: boolean | null;
          id: string;
          number: string | null;
          user_id: string | null;
        };
        Insert: {
          added_at?: string | null;
          expiration_date?: boolean | null;
          id?: string;
          number?: string | null;
          user_id?: string | null;
        };
        Update: {
          added_at?: string | null;
          expiration_date?: boolean | null;
          id?: string;
          number?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "cart_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      comments: {
        Row: {
          created_at: string;
          description: string;
          id: string;
          product_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          description: string;
          id?: string;
          product_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          description?: string;
          id?: string;
          product_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "comments_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "comments_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      orders: {
        Row: {
          color: string | null;
          id: string;
          order_date: string;
          product_id: string;
          quantity: number;
          size: string | null;
          status: string;
          user_id: string;
        };
        Insert: {
          color?: string | null;
          id?: string;
          order_date?: string;
          product_id: string;
          quantity: number;
          size?: string | null;
          status?: string;
          user_id: string;
        };
        Update: {
          color?: string | null;
          id?: string;
          order_date?: string;
          product_id?: string;
          quantity?: number;
          size?: string | null;
          status?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "orders_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "orders_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      products: {
        Row: {
          colors: string[] | null;
          description: string;
          embeddings: string | null;
          general_rating: number;
          id: string;
          name: string;
          number_of_images: number | null;
          price: number;
          sizes: string[] | null;
          stock: number;
          rating_count: number;
        };
        Insert: {
          colors?: string[] | null;
          description?: string;
          embeddings?: string | null;
          general_rating?: number;
          id?: string;
          name: string;
          number_of_images?: number | null;
          price?: number;
          sizes?: string[] | null;
          stock?: number;
          rating_count?: number;
        };
        Update: {
          colors?: string[] | null;
          description?: string;
          embeddings?: string | null;
          general_rating?: number;
          id?: string;
          name?: string;
          number_of_images?: number | null;
          price?: number;
          sizes?: string[] | null;
          stock?: number;
          rating_count?: number;
        };
        Relationships: [];
      };
      products_images: {
        Row: {
          created_at: string;
          id: string;
          object_id: string;
          product_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          object_id: string;
          product_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          object_id?: string;
          product_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "products_images_object_id_fkey";
            columns: ["object_id"];
            isOneToOne: false;
            referencedRelation: "buckets";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "products_images_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      ratings: {
        Row: {
          created_at: string;
          description: string;
          id: string;
          product_id: string;
          rate: number;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          description: string;
          id?: string;
          product_id: string;
          rate: number;
          user_id: string;
        };
        Update: {
          created_at?: string;
          description?: string;
          id?: string;
          product_id?: string;
          rate?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ratings_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ratings_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      users_images: {
        Row: {
          created_at: string;
          id: string;
          object_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          object_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          object_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "users_images_object_id_fkey";
            columns: ["object_id"];
            isOneToOne: false;
            referencedRelation: "buckets";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "users_images_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      Delivery: "notplaced" | "placed" | "shipping" | "received";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (
      & Database[PublicTableNameOrOptions["schema"]]["Tables"]
      & Database[PublicTableNameOrOptions["schema"]]["Views"]
    )
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database } ? (
    & Database[PublicTableNameOrOptions["schema"]]["Tables"]
    & Database[PublicTableNameOrOptions["schema"]]["Views"]
  )[TableName] extends {
    Row: infer R;
  } ? R
  : never
  : PublicTableNameOrOptions extends keyof (
    & PublicSchema["Tables"]
    & PublicSchema["Views"]
  ) ? (
      & PublicSchema["Tables"]
      & PublicSchema["Views"]
    )[PublicTableNameOrOptions] extends {
      Row: infer R;
    } ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Insert: infer I;
  } ? I
  : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    } ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Update: infer U;
  } ? U
  : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    } ? U
    : never
  : never;

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
  : never;
