import { DUMMY_NEWS } from "@/data/dummy-news";
import { PageParams } from "@/models/models";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = PageParams<{ slug: string }>;

export default async function PageDetail({ params }: Props) {
  const { slug: newsSlug } = await params;

  const newsItem = DUMMY_NEWS.find((news) => news.slug === newsSlug);

  if (!newsItem) notFound();

  return (
    <article className="news-article">
      <header>
        <Link href={`/news/${newsItem.slug}/image`}>
          <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        </Link>
        <h1>{newsItem.title}</h1>
        <time dateTime={newsItem.date}>{newsItem.date}</time>
      </header>
      <p>{newsItem.content}</p>
    </article>
  );
}
