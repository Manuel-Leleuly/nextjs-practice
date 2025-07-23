import { NewsList } from "@/components/news-list";
import { NewsUtils } from "@/utils/newsUtils";

export default async function LatestNewsPage() {
  const latestNews = await NewsUtils.getLatestNews();

  return (
    <>
      <h2>Latest News</h2>
      <NewsList news={latestNews} />
    </>
  );
}
