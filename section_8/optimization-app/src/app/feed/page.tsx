import { Posts } from "@/components/posts";
import { PostsLib } from "@/lib/posts";
import { DynamicMetadataFunction } from "@/models/models";

export const generateMetadata: DynamicMetadataFunction = async () => {
  const posts = await PostsLib.getPosts();
  const numberOfPosts = posts.length;
  return {
    title: `Browse all our ${numberOfPosts} posts.`,
    description: "Browse all our posts",
  };
};

export default async function FeedPage() {
  const posts = await PostsLib.getPosts();
  return (
    <>
      <h1>All posts by all users</h1>
      <Posts posts={posts} />
    </>
  );
}
