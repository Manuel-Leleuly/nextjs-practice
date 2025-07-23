import { NewsList } from "@/components/news-list";
import { NewsUtils } from "@/utils/newsUtils";

export default function NewsPage() {
  return (
    <>
      <h1>News Page</h1>
      <NewsList news={NewsUtils.getAllNews()} />
    </>
  );
}
