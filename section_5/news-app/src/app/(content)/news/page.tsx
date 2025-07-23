import { NewsList } from "@/components/news-list";
import { NewsUtils } from "@/utils/newsUtils";

export default async function NewsPage() {
  // const response = await fetch("http://localhost:8080/news");
  // if (!response.ok) {
  //   throw new Error("Failed to fetch news.");
  // }

  // const news = (await response.json()) as News[];
  const news = await NewsUtils.getAllNews();

  return (
    <>
      <h1>News Page</h1>
      <NewsList news={news} />
    </>
  );
}
