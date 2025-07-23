export interface Post {
  id: number;
  image_url: string;
  title: string;
  content: string;
  created_at: string;
  user_id: number;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export interface Like {
  user_id: number;
  post_id: number;
}

export type ReqBody<
  T extends { id: number },
  Q extends keyof Omit<T, "id"> | "" = ""
> = Omit<T, Q | "id">;

// related to controller
export type PostData = {
  id: number;
  image: string;
  title: string;
  content: string;
  createdAt: string;
  userFirstName: string;
  userLastName: string;
  likes: number;
  isLiked: boolean;
};
