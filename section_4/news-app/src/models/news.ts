export type News = {
  id: string;
  slug: string;
  title: string;
  image: string;
  date: string;
  content: string;
};

export type ReqBody<
  T extends { id: string },
  Q extends keyof Omit<T, "id"> | "" = ""
> = Omit<T, Q | "id">;
