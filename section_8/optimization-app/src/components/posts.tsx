"use client";

import { togglePostLikeStatus } from "@/actions/posts";
import { FormatLib } from "@/lib/format";
import { Post } from "@/models/post";
import Image, { ImageLoader } from "next/image";
import { useOptimistic } from "react";
import { LikeButton } from "./like-icon";

export const Posts = ({ posts }: { posts: Post[] }) => {
  const [optimisticPosts, updateOptimisticPosts] = useOptimistic(
    posts,
    (prevPosts, updatedPostId) => {
      const updatedPostIndex = prevPosts.findIndex(
        (post) => post.id === updatedPostId
      );

      if (updatedPostIndex === -1) {
        return prevPosts;
      }

      const updatedPost = { ...prevPosts[updatedPostIndex] };
      updatedPost.likes = updatedPost.likes + (updatedPost.isLiked ? -1 : 1);
      updatedPost.isLiked = !updatedPost.isLiked;
      const newPosts = [...prevPosts];
      newPosts[updatedPostIndex] = updatedPost;
      return newPosts;
    }
  );

  const updatePost = async (postId: number) => {
    updateOptimisticPosts(postId);
    await togglePostLikeStatus(postId);
  };

  return (
    <ul className="posts">
      {optimisticPosts.map((post) => (
        <li key={post.id}>
          <PostContent post={post} action={updatePost} />
        </li>
      ))}
    </ul>
  );
};

const PostContent = ({
  post,
  action,
}: {
  post: Post;
  action: (postId: number) => void;
}) => {
  const imageLoader: ImageLoader = (config) => {
    const urlSplit = config.src.split("upload/");
    const urlStart = urlSplit[0];
    const urlEnd = urlSplit[1];
    const transformations = `w_200,q_${config.quality}`;
    return `${urlStart}upload/${transformations}/${urlEnd}`;
  };

  return (
    <article className="post">
      <div className="post-image">
        <Image
          loader={imageLoader}
          src={post.imageUrl}
          width={200}
          height={120}
          alt={post.title}
          quality={50}
        />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on{" "}
              <time dateTime={post.createdAt}>
                {FormatLib.formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <div>
            <form
              action={() => action(post.id)}
              className={post.isLiked ? "liked" : ""}
            >
              <LikeButton />
            </form>
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
};
