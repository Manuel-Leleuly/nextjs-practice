import { NewsList } from "@/components/news-list";
import { PageParams } from "@/models/models";
import { News } from "@/models/news";
import { NewsUtils } from "@/utils/newsUtils";
import Link from "next/link";
import { Suspense } from "react";

type Props = PageParams<{ filter?: string[] }>;

export default async function FilteredNewsPage({ params }: Props) {
  const { filter } = await params;
  const selectedYear = filter?.[0];
  const selectedMonth = filter?.[1];

  return (
    <>
      <Suspense fallback={<p>Loading filter...</p>}>
        <FilterHeader year={selectedYear} month={selectedMonth} />
      </Suspense>
      <Suspense fallback={<p>Loading news...</p>}>
        <FilteredNews year={selectedYear} month={selectedMonth} />
      </Suspense>
    </>
  );
}

const FilteredNews = async ({
  year,
  month,
}: {
  year?: string;
  month?: string;
}) => {
  let news: News[] | undefined;

  if (year && !month) {
    news = await NewsUtils.getNewsForYear(year);
  } else if (year && month) {
    news = await NewsUtils.getNewsForYearAndMonth(year, month);
  }

  if (!news?.length) {
    return <p>No news found for the selected period.</p>;
  }

  return <NewsList news={news} />;
};

const FilterHeader = async ({
  year,
  month,
}: {
  year?: string;
  month?: string;
}) => {
  const newsYears = await NewsUtils.getAvailableNewsYears();
  let links = Array.from(newsYears);

  const newsMonths = year ? NewsUtils.getAvailableNewsMonths(year) : [];

  if (
    (year && !newsYears.includes(year)) ||
    (month && year && !newsMonths.includes(month))
  ) {
    throw new Error("Invalid filter");
  }

  if (year && !month) {
    links = NewsUtils.getAvailableNewsMonths(year);
  }

  if (year && month) {
    links = [];
  }

  return (
    <header id="archive-header">
      <nav>
        <ul>
          {links.map((link) => {
            const href = year ? `/archive/${year}/${link}` : `/archive/${link}`;

            return (
              <li key={link}>
                <Link href={href}>{link}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};
