export interface Meal {
  id: number;
  slug: string;
  title: string;
  image: string;
  summary: string;
  instructions: string;
  creator: string;
  creator_email: string;
}

export type MealReqBody<T extends keyof Omit<Meal, "id" | "image"> | "" = ""> =
  Omit<Meal, T | "id" | "image"> & {
    image: File;
  };
