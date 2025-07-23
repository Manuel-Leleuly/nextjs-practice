import { Posts } from "@/components/posts";
import { PostsLib } from "@/lib/posts";

export default async function FeedPage() {
  const posts = await PostsLib.getPosts();

  return (
    <>
      <h1>All posts by all users</h1>
      <Posts posts={posts} />
    </>
  );
}
