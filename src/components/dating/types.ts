
export interface DatingProfile {
  id: string;
  user_id: string;
  display_name: string;
  age: number;
  bio?: string;
  location?: string;
  photos: string[];
  verified: boolean;
  interests?: string[];
}

export interface Match {
  id: string;
  user1_id: string;
  user2_id: string;
  matched_at: string;
  profile: DatingProfile;
}
