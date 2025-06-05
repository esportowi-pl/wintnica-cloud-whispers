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
      admin_activity_logs: {
        Row: {
          action: string
          created_at: string | null
          details: Json | null
          id: string
          ip_address: unknown | null
          target_id: string | null
          target_type: string | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          target_id?: string | null
          target_type?: string | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          target_id?: string | null
          target_type?: string | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      advertisements: {
        Row: {
          active: boolean | null
          clicks: number | null
          content: string | null
          created_at: string | null
          created_by: string | null
          end_date: string | null
          id: string
          image_url: string | null
          impressions: number | null
          link_url: string | null
          placement: string
          start_date: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          clicks?: number | null
          content?: string | null
          created_at?: string | null
          created_by?: string | null
          end_date?: string | null
          id?: string
          image_url?: string | null
          impressions?: number | null
          link_url?: string | null
          placement: string
          start_date?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          clicks?: number | null
          content?: string | null
          created_at?: string | null
          created_by?: string | null
          end_date?: string | null
          id?: string
          image_url?: string | null
          impressions?: number | null
          link_url?: string | null
          placement?: string
          start_date?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          created_at: string
          id: string
          message: string
          message_type: string
          room_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          message_type?: string
          room_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          message_type?: string
          room_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "chat_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_rooms: {
        Row: {
          active: boolean
          created_at: string
          created_by: string
          description: string | null
          id: string
          name: string
          type: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          name: string
          type?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          name?: string
          type?: string
        }
        Relationships: []
      }
      comments: {
        Row: {
          content: string
          created_at: string | null
          id: string
          user_id: string
          video_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          user_id: string
          video_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          user_id?: string
          video_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "videos"
            referencedColumns: ["id"]
          },
        ]
      }
      content_moderation: {
        Row: {
          content_id: string
          content_type: string
          created_at: string | null
          id: string
          moderator_id: string | null
          reason: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          content_id: string
          content_type: string
          created_at?: string | null
          id?: string
          moderator_id?: string | null
          reason?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          content_id?: string
          content_type?: string
          created_at?: string | null
          id?: string
          moderator_id?: string | null
          reason?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      creator_earnings: {
        Row: {
          amount: number
          created_at: string | null
          creator_id: string
          currency: Database["public"]["Enums"]["crypto_currency"]
          earning_type: string
          id: string
          transaction_id: string | null
          video_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          creator_id: string
          currency: Database["public"]["Enums"]["crypto_currency"]
          earning_type: string
          id?: string
          transaction_id?: string | null
          video_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          creator_id?: string
          currency?: Database["public"]["Enums"]["crypto_currency"]
          earning_type?: string
          id?: string
          transaction_id?: string | null
          video_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "creator_earnings_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "creator_earnings_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "videos"
            referencedColumns: ["id"]
          },
        ]
      }
      dating_matches: {
        Row: {
          id: string
          is_active: boolean | null
          matched_at: string | null
          user1_id: string | null
          user2_id: string | null
        }
        Insert: {
          id?: string
          is_active?: boolean | null
          matched_at?: string | null
          user1_id?: string | null
          user2_id?: string | null
        }
        Update: {
          id?: string
          is_active?: boolean | null
          matched_at?: string | null
          user1_id?: string | null
          user2_id?: string | null
        }
        Relationships: []
      }
      dating_messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          match_id: string | null
          read_at: string | null
          sender_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          match_id?: string | null
          read_at?: string | null
          sender_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          match_id?: string | null
          read_at?: string | null
          sender_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dating_messages_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "dating_matches"
            referencedColumns: ["id"]
          },
        ]
      }
      dating_profiles: {
        Row: {
          active: boolean | null
          age: number
          bio: string | null
          created_at: string | null
          display_name: string
          id: string
          interests: string[] | null
          last_active: string | null
          location: string | null
          photos: string[] | null
          updated_at: string | null
          user_id: string | null
          verified: boolean | null
        }
        Insert: {
          active?: boolean | null
          age: number
          bio?: string | null
          created_at?: string | null
          display_name: string
          id?: string
          interests?: string[] | null
          last_active?: string | null
          location?: string | null
          photos?: string[] | null
          updated_at?: string | null
          user_id?: string | null
          verified?: boolean | null
        }
        Update: {
          active?: boolean | null
          age?: number
          bio?: string | null
          created_at?: string | null
          display_name?: string
          id?: string
          interests?: string[] | null
          last_active?: string | null
          location?: string | null
          photos?: string[] | null
          updated_at?: string | null
          user_id?: string | null
          verified?: boolean | null
        }
        Relationships: []
      }
      dating_swipes: {
        Row: {
          created_at: string | null
          id: string
          is_like: boolean
          swiped_id: string | null
          swiper_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_like: boolean
          swiped_id?: string | null
          swiper_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_like?: boolean
          swiped_id?: string | null
          swiper_id?: string | null
        }
        Relationships: []
      }
      game_servers: {
        Row: {
          created_at: string
          current_players: number
          game_mode: string
          id: string
          map: string
          max_players: number
          name: string
          region: string
          status: string
        }
        Insert: {
          created_at?: string
          current_players?: number
          game_mode: string
          id?: string
          map: string
          max_players?: number
          name: string
          region?: string
          status?: string
        }
        Update: {
          created_at?: string
          current_players?: number
          game_mode?: string
          id?: string
          map?: string
          max_players?: number
          name?: string
          region?: string
          status?: string
        }
        Relationships: []
      }
      marketplace_categories: {
        Row: {
          active: boolean | null
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          name: string
          order_index: number | null
          parent_id: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          order_index?: number | null
          parent_id?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          order_index?: number | null
          parent_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "marketplace_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "marketplace_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      marketplace_favorites: {
        Row: {
          created_at: string | null
          id: string
          product_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          product_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          product_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "marketplace_favorites_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "marketplace_products"
            referencedColumns: ["id"]
          },
        ]
      }
      marketplace_messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          product_id: string | null
          read_at: string | null
          receiver_id: string | null
          sender_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          product_id?: string | null
          read_at?: string | null
          receiver_id?: string | null
          sender_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          product_id?: string | null
          read_at?: string | null
          receiver_id?: string | null
          sender_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "marketplace_messages_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "marketplace_products"
            referencedColumns: ["id"]
          },
        ]
      }
      marketplace_products: {
        Row: {
          category: string
          condition: string | null
          created_at: string | null
          description: string | null
          favorites_count: number | null
          id: string
          images: string[] | null
          location: string | null
          price: number | null
          seller_id: string | null
          status: string | null
          subcategory: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
          views_count: number | null
        }
        Insert: {
          category: string
          condition?: string | null
          created_at?: string | null
          description?: string | null
          favorites_count?: number | null
          id?: string
          images?: string[] | null
          location?: string | null
          price?: number | null
          seller_id?: string | null
          status?: string | null
          subcategory?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          views_count?: number | null
        }
        Update: {
          category?: string
          condition?: string | null
          created_at?: string | null
          description?: string | null
          favorites_count?: number | null
          id?: string
          images?: string[] | null
          location?: string | null
          price?: number | null
          seller_id?: string | null
          status?: string | null
          subcategory?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          views_count?: number | null
        }
        Relationships: []
      }
      missions: {
        Row: {
          active: boolean
          created_at: string
          created_by: string
          description: string
          end_date: string | null
          id: string
          mission_type: string
          requirements: Json
          rewards: Json
          start_date: string | null
          title: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          created_by: string
          description: string
          end_date?: string | null
          id?: string
          mission_type: string
          requirements: Json
          rewards: Json
          start_date?: string | null
          title: string
        }
        Update: {
          active?: boolean
          created_at?: string
          created_by?: string
          description?: string
          end_date?: string | null
          id?: string
          mission_type?: string
          requirements?: Json
          rewards?: Json
          start_date?: string | null
          title?: string
        }
        Relationships: []
      }
      paid_comments: {
        Row: {
          amount: number
          content: string
          created_at: string | null
          currency: Database["public"]["Enums"]["crypto_currency"]
          highlighted: boolean | null
          id: string
          payment_status: Database["public"]["Enums"]["payment_status"] | null
          transaction_hash: string | null
          user_id: string
          video_id: string
        }
        Insert: {
          amount: number
          content: string
          created_at?: string | null
          currency: Database["public"]["Enums"]["crypto_currency"]
          highlighted?: boolean | null
          id?: string
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          transaction_hash?: string | null
          user_id: string
          video_id: string
        }
        Update: {
          amount?: number
          content?: string
          created_at?: string | null
          currency?: Database["public"]["Enums"]["crypto_currency"]
          highlighted?: boolean | null
          id?: string
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          transaction_hash?: string | null
          user_id?: string
          video_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "paid_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "paid_comments_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "videos"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          display_name: string | null
          id: string
          total_earnings: number | null
          updated_at: string | null
          username: string
          wallet_address: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          id: string
          total_earnings?: number | null
          updated_at?: string | null
          username: string
          wallet_address?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          id?: string
          total_earnings?: number | null
          updated_at?: string | null
          username?: string
          wallet_address?: string | null
        }
        Relationships: []
      }
      shard_transactions: {
        Row: {
          amount: number
          created_at: string | null
          description: string | null
          id: string
          transaction_type: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          description?: string | null
          id?: string
          transaction_type: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          description?: string | null
          id?: string
          transaction_type?: string
          user_id?: string
        }
        Relationships: []
      }
      shop_transactions: {
        Row: {
          created_at: string
          id: string
          item_id: string | null
          item_type: string
          payment_method: string | null
          price_real: number | null
          price_shards: number | null
          quantity: number
          skin_id: string | null
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          item_id?: string | null
          item_type: string
          payment_method?: string | null
          price_real?: number | null
          price_shards?: number | null
          quantity?: number
          skin_id?: string | null
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          item_id?: string | null
          item_type?: string
          payment_method?: string | null
          price_real?: number | null
          price_shards?: number | null
          quantity?: number
          skin_id?: string | null
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "shop_transactions_skin_id_fkey"
            columns: ["skin_id"]
            isOneToOne: false
            referencedRelation: "skins"
            referencedColumns: ["id"]
          },
        ]
      }
      site_settings: {
        Row: {
          id: string
          key: string
          updated_at: string | null
          updated_by: string | null
          value: Json
        }
        Insert: {
          id?: string
          key: string
          updated_at?: string | null
          updated_by?: string | null
          value: Json
        }
        Update: {
          id?: string
          key?: string
          updated_at?: string | null
          updated_by?: string | null
          value?: Json
        }
        Relationships: []
      }
      skins: {
        Row: {
          active: boolean
          collection: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          name: string
          price_real: number | null
          price_shards: number
          rarity: string
          weapon_type: string
        }
        Insert: {
          active?: boolean
          collection?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          price_real?: number | null
          price_shards?: number
          rarity: string
          weapon_type: string
        }
        Update: {
          active?: boolean
          collection?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          price_real?: number | null
          price_shards?: number
          rarity?: string
          weapon_type?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          auto_renew: boolean | null
          created_at: string | null
          creator_id: string
          currency: Database["public"]["Enums"]["crypto_currency"]
          expires_at: string
          id: string
          monthly_amount: number
          payment_status: Database["public"]["Enums"]["payment_status"] | null
          subscriber_id: string
          tier: Database["public"]["Enums"]["subscription_tier"]
        }
        Insert: {
          auto_renew?: boolean | null
          created_at?: string | null
          creator_id: string
          currency: Database["public"]["Enums"]["crypto_currency"]
          expires_at: string
          id?: string
          monthly_amount: number
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          subscriber_id: string
          tier: Database["public"]["Enums"]["subscription_tier"]
        }
        Update: {
          auto_renew?: boolean | null
          created_at?: string | null
          creator_id?: string
          currency?: Database["public"]["Enums"]["crypto_currency"]
          expires_at?: string
          id?: string
          monthly_amount?: number
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          subscriber_id?: string
          tier?: Database["public"]["Enums"]["subscription_tier"]
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_subscriber_id_fkey"
            columns: ["subscriber_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number
          created_at: string | null
          currency: Database["public"]["Enums"]["crypto_currency"]
          id: string
          status: string | null
          transaction_hash: string | null
          transaction_type: Database["public"]["Enums"]["transaction_type"]
          user_id: string
          video_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency: Database["public"]["Enums"]["crypto_currency"]
          id?: string
          status?: string | null
          transaction_hash?: string | null
          transaction_type: Database["public"]["Enums"]["transaction_type"]
          user_id: string
          video_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: Database["public"]["Enums"]["crypto_currency"]
          id?: string
          status?: string | null
          transaction_hash?: string | null
          transaction_type?: Database["public"]["Enums"]["transaction_type"]
          user_id?: string
          video_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "videos"
            referencedColumns: ["id"]
          },
        ]
      }
      user_missions: {
        Row: {
          completed: boolean
          completed_at: string | null
          created_at: string
          id: string
          mission_id: string
          progress: number
          user_id: string
        }
        Insert: {
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          id?: string
          mission_id: string
          progress?: number
          user_id: string
        }
        Update: {
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          id?: string
          mission_id?: string
          progress?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_missions_mission_id_fkey"
            columns: ["mission_id"]
            isOneToOne: false
            referencedRelation: "missions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_shards: {
        Row: {
          created_at: string | null
          current_shards: number
          daily_streak: number
          id: string
          last_daily_claim: string | null
          total_earned: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_shards?: number
          daily_streak?: number
          id?: string
          last_daily_claim?: string | null
          total_earned?: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_shards?: number
          daily_streak?: number
          id?: string
          last_daily_claim?: string | null
          total_earned?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_skins: {
        Row: {
          acquired_at: string
          id: string
          skin_id: string
          user_id: string
        }
        Insert: {
          acquired_at?: string
          id?: string
          skin_id: string
          user_id: string
        }
        Update: {
          acquired_at?: string
          id?: string
          skin_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_skins_skin_id_fkey"
            columns: ["skin_id"]
            isOneToOne: false
            referencedRelation: "skins"
            referencedColumns: ["id"]
          },
        ]
      }
      user_stats: {
        Row: {
          created_at: string
          daily_streak: number
          experience: number
          id: string
          last_login: string | null
          level: number
          matches_played: number
          matches_won: number
          shards: number
          total_deaths: number
          total_kills: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          daily_streak?: number
          experience?: number
          id?: string
          last_login?: string | null
          level?: number
          matches_played?: number
          matches_won?: number
          shards?: number
          total_deaths?: number
          total_kills?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          daily_streak?: number
          experience?: number
          id?: string
          last_login?: string | null
          level?: number
          matches_played?: number
          matches_won?: number
          shards?: number
          total_deaths?: number
          total_kills?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      video_likes: {
        Row: {
          amount: number | null
          created_at: string | null
          currency: Database["public"]["Enums"]["crypto_currency"] | null
          id: string
          payment_status: Database["public"]["Enums"]["payment_status"] | null
          transaction_hash: string | null
          user_id: string
          video_id: string
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          currency?: Database["public"]["Enums"]["crypto_currency"] | null
          id?: string
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          transaction_hash?: string | null
          user_id: string
          video_id: string
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          currency?: Database["public"]["Enums"]["crypto_currency"] | null
          id?: string
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          transaction_hash?: string | null
          user_id?: string
          video_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "video_likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "video_likes_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "videos"
            referencedColumns: ["id"]
          },
        ]
      }
      video_views: {
        Row: {
          id: string
          user_id: string | null
          video_id: string
          viewed_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          video_id: string
          viewed_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          video_id?: string
          viewed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "video_views_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "video_views_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "videos"
            referencedColumns: ["id"]
          },
        ]
      }
      videos: {
        Row: {
          created_at: string | null
          description: string | null
          duration: number | null
          id: string
          status: Database["public"]["Enums"]["video_status"] | null
          thumbnail_url: string | null
          title: string
          updated_at: string | null
          upload_fee: number | null
          user_id: string
          video_url: string | null
          view_count: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          duration?: number | null
          id?: string
          status?: Database["public"]["Enums"]["video_status"] | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
          upload_fee?: number | null
          user_id: string
          video_url?: string | null
          view_count?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          duration?: number | null
          id?: string
          status?: Database["public"]["Enums"]["video_status"] | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
          upload_fee?: number | null
          user_id?: string
          video_url?: string | null
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "videos_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      weekly_skin_schedule: {
        Row: {
          active: boolean
          created_at: string
          created_by: string
          id: string
          max_winners: number
          shards_required: number
          skin_id: string
          week_end_date: string
          week_start_date: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          created_by: string
          id?: string
          max_winners?: number
          shards_required?: number
          skin_id: string
          week_end_date: string
          week_start_date: string
        }
        Update: {
          active?: boolean
          created_at?: string
          created_by?: string
          id?: string
          max_winners?: number
          shards_required?: number
          skin_id?: string
          week_end_date?: string
          week_start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "weekly_skin_schedule_skin_id_fkey"
            columns: ["skin_id"]
            isOneToOne: false
            referencedRelation: "skins"
            referencedColumns: ["id"]
          },
        ]
      }
      weekly_skin_winners: {
        Row: {
          id: string
          schedule_id: string
          shards_spent: number
          user_id: string
          won_at: string
        }
        Insert: {
          id?: string
          schedule_id: string
          shards_spent: number
          user_id: string
          won_at?: string
        }
        Update: {
          id?: string
          schedule_id?: string
          shards_spent?: number
          user_id?: string
          won_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "weekly_skin_winners_schedule_id_fkey"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "weekly_skin_schedule"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_creator_earning: {
        Args: {
          p_creator_id: string
          p_video_id: string
          p_earning_type: string
          p_amount: number
          p_currency: Database["public"]["Enums"]["crypto_currency"]
          p_transaction_id?: string
        }
        Returns: undefined
      }
      claim_daily_reward: {
        Args: { p_user_id: string }
        Returns: Json
      }
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
      is_admin: {
        Args: { _user_id: string }
        Returns: boolean
      }
      log_admin_activity: {
        Args: {
          _action: string
          _target_type?: string
          _target_id?: string
          _details?: Json
        }
        Returns: undefined
      }
      update_user_shards: {
        Args: {
          p_user_id: string
          p_amount: number
          p_transaction_type: string
          p_description?: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      crypto_currency: "BTC" | "ETH" | "USDC" | "USDT"
      payment_status: "pending" | "completed" | "failed" | "refunded"
      subscription_tier: "basic" | "premium" | "vip"
      transaction_type: "upload_fee" | "tip" | "withdrawal"
      video_status: "pending" | "processing" | "published" | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      crypto_currency: ["BTC", "ETH", "USDC", "USDT"],
      payment_status: ["pending", "completed", "failed", "refunded"],
      subscription_tier: ["basic", "premium", "vip"],
      transaction_type: ["upload_fee", "tip", "withdrawal"],
      video_status: ["pending", "processing", "published", "rejected"],
    },
  },
} as const
