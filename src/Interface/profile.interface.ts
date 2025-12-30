export interface UserProfile {
  userId: number;
  username: string;
  email: string;
  phone: string;
  roleName?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export type UserProfileUpdatePayload = Partial<Pick<UserProfile, 'username' | 'email' | 'phone'>>;
