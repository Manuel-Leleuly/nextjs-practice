import { togglePostLikeStatus } from "@/actions/post";
import { FormatLib } from "@/lib/format";
import { PostData } from "@/models/post";
import { ObjectUtils } from "@/utils/objectUtils";
import classNames from "classnames";
import { useOptimistic } from "react";
import { LikeButton } from "./like-icon";

interface Props {
  posts: PostData[];
}

export const Posts = ({ posts }: Props) => {
  const [optimisticPosts, updateOptimisiticPosts] = useOptimistic<
    PostData[],
    number
  >(posts, (prevPosts, updatedPostId) => {
    const updatedPostIndex = prevPosts.findIndex(
      (post) => post.id === updatedPostId
    );
    if (!updatedPostIndex) return prevPosts;

    const updatedPost = ObjectUtils.cloneObject(prevPosts[updatedPostIndex]);
    updatedPost.likes += updatedPost.isLiked ? -1 : 1;
    updatedPost.isLiked = !updatedPost.isLiked;

    const newPosts = Array.from(prevPosts);
    newPosts[updatedPostIndex] = updatedPost;

    return newPosts;
  });

  const updatePost = async (postId: number) => {
    updateOptimisiticPosts(postId);
    await togglePostLikeStatus(postId);
  };

  if (!optimisticPosts || optimisticPosts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

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
  post: PostData;
  action: (postId: number) => void;
}) => {
  return (
    <article className="post">
      <div className="post-image">
        <img src={post.image} alt={post.title} />
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
              className={classNames({ liked: post.isLiked })}
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
