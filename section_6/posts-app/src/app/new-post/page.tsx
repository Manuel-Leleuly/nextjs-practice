import { createPost } from "@/actions/post";
import { PostForm } from "@/components/post-form";

export default function NewPostPage() {
  return <PostForm createPost={createPost} />;
}
