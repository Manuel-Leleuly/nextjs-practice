export interface Post {
  id: number;
  imageUrl: string;
  title: string;
  content: string;
  userFirstName: string;
  userLastName: string;
  likes: number;
  isLiked: boolean;
  createdAt: string;
  userId: number;
}
