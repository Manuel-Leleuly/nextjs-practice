import { NewsList } from "@/components/news-list";
import { NewsUtils } from "@/utils/newsUtils";

export default function LatestNewsPage() {
  const latestNews = NewsUtils.getLatestNews();

  return (
    <>
      <h2>Latest News</h2>
      <NewsList news={latestNews} />
    </>
  );
}
