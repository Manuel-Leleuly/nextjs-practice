"use server";

import { ObjectUtils } from "@/utils/objectUtils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { MealsLib } from "./meals";

const isInvalidText = (text: string): boolean => {
  return !text.trim().length;
};

const isValidEmail = (email: string): boolean => {
  return email.includes("@");
};

export const shareMeal = async (
  _: { message: string | null },
  formData: FormData
) => {
  const meal = {
    title: formData.get("title") as string,
    summary: formData.get("summary") as string,
    instructions: formData.get("instructions") as string,
    image: formData.get("image") as File,
    creator: formData.get("name") as string,
    creator_email: formData.get("email") as string,
  };

  if (
    ObjectUtils.keys(meal).some(
      (mealKey) => mealKey !== "image" && isInvalidText(meal[mealKey])
    ) ||
    !isValidEmail(meal.creator_email) ||
    !meal.image ||
    !meal.image.size
  ) {
    return {
      message: "Invalid input.",
    };
  }

  await MealsLib.saveMeal(meal);
  revalidatePath("/meals");
  redirect("/meals");
};
