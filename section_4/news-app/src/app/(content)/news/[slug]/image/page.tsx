import { PageParams } from "@/models/models";
import { NewsUtils } from "@/utils/newsUtils";
import { notFound } from "next/navigation";

export default async function ImagePage({
  params,
}: PageParams<{ slug: string }>) {
  const { slug: newsItemSlug } = await params;
  const newsItem = NewsUtils.getAllNews().find(
    (newsItem) => newsItem.slug === newsItemSlug
  );
  if (!newsItem) notFound();

  return (
    <div className="fullscreen-image">
      <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
    </div>
  );
}
