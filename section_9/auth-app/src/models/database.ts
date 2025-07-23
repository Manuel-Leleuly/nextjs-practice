export interface Training {
  id: number;
  title: string;
  image: string;
  description: string;
}

export interface User {
  id: number;
  email: string;
  password: string;
}

export interface Session {
  id: string;
  expires_at: number;
  user_id: string;
}
