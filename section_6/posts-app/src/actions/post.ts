"use server";

import { CloudinaryLib } from "@/lib/cloudinary";
import { PostsLib } from "@/lib/posts";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createPost = async (
  _: { errors: string[] | null },
  formData: FormData
) => {
  const title = formData.get("title");
  const image = formData.get("image");
  const content = formData.get("content");

  let errors: string[] = [];

  if (!title || !title.toString().length) {
    errors.push("Title is required");
  }

  if (!content || !content.toString().length) {
    errors.push("Content is required");
  }

  if (!image || (image as File).name.toLowerCase() === "undefined") {
    errors.push("Image is required");
  }

  if (!!errors.length) {
    return { errors };
  }

  let imageUrl = "";

  try {
    imageUrl = await CloudinaryLib.uploadImage(image as File);
  } catch (error) {
    throw new Error(
      "Image upload failed, post was not created. Please try again later."
    );
  }

  await PostsLib.storePost({
    image_url: imageUrl,
    title: title?.toString() ?? "",
    content: content?.toString() ?? "",
    user_id: 1,
  });

  revalidatePath("/", "layout");
  redirect("/feed");
};

export const togglePostLikeStatus = async (postId: number) => {
  await PostsLib.updatePostLikeStatus(postId, 2);
  revalidatePath("/", "layout");
};
