"use server";

import { CloudinaryLib } from "@/lib/cloudinary";
import { PostsLib } from "@/lib/posts";
import { FormStateFunction } from "@/models/models";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createPost: FormStateFunction = async (_, formData) => {
  const title = formData.get("title");
  const image = formData.get("image");
  const content = formData.get("content");

  let errors = [];

  if (!title || title.toString().trim().length === 0) {
    errors.push("Title is required.");
  }

  if (!content || content.toString().trim().length === 0) {
    errors.push("Content is required.");
  }

  if (!image || (image as File).size === 0) {
    errors.push("Image is required.");
  }

  if (errors.length > 0) {
    return { errors };
  }

  let imageUrl;

  try {
    imageUrl = await CloudinaryLib.uploadImage(image as File);
  } catch (error) {
    throw new Error(
      "Image upload failed, post was not created. Please try again later."
    );
  }

  await PostsLib.storePost({
    imageUrl: imageUrl,
    title: title?.toString() ?? "",
    content: content?.toString() ?? "",
    userId: 1,
  });

  revalidatePath("/", "layout");
  redirect("/feed");
};

export const togglePostLikeStatus = async (postId: number) => {
  await PostsLib.updatePostLikeStatus(postId, 2);
  revalidatePath("/", "layout");
};
