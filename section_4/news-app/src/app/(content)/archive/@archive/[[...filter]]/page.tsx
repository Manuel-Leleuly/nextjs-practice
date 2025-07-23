import { NewsList } from "@/components/news-list";
import { PageParams } from "@/models/models";
import { News } from "@/models/news";
import { NewsUtils } from "@/utils/newsUtils";
import Link from "next/link";

type Props = PageParams<{ filter?: string[] }>;

export default async function FilteredNewsPage({ params }: Props) {
  const { filter } = await params;
  const selectedYear = filter?.[0];
  const selectedMonth = filter?.[1];

  let news: News[] | undefined;
  let links = NewsUtils.getAvailableNewsYears();

  if (selectedYear && !selectedMonth) {
    news = NewsUtils.getNewsForYear(selectedYear);
    links = NewsUtils.getAvailableNewsMonths(selectedYear);
  }

  if (selectedYear && selectedMonth) {
    news = NewsUtils.getNewsForYearAndMonth(selectedYear, selectedMonth);
    links = [];
  }

  if (
    (selectedYear &&
      !NewsUtils.getAvailableNewsYears().includes(parseInt(selectedYear))) ||
    (selectedMonth &&
      selectedYear &&
      !NewsUtils.getAvailableNewsMonths(selectedYear).includes(
        parseInt(selectedMonth)
      ))
  ) {
    throw new Error("Invalid filter");
  }

  return (
    <>
      <header id="archive-header">
        <nav>
          <ul>
            {links.map((link) => {
              const href = selectedYear
                ? `/archive/${selectedYear}/${link}`
                : `/archive/${link}`;

              return (
                <li key={link}>
                  <Link href={href}>{link}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      {news?.length ? (
        <NewsList news={news} />
      ) : (
        <p>No news found for the selected period.</p>
      )}
    </>
  );
}
