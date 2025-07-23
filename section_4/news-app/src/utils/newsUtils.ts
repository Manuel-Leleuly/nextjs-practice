import { DUMMY_NEWS } from "@/data/dummy-news";

export class NewsUtils {
  static getAllNews = () => DUMMY_NEWS;

  static getLatestNews = () => DUMMY_NEWS.slice(0, 3);

  static getAvailableNewsYears = () => {
    return DUMMY_NEWS.reduce<number[]>((years, news) => {
      const year = new Date(news.date).getFullYear();
      if (!years.includes(year)) {
        years.push(year);
      }
      return years;
    }, []).sort((a, b) => b - a);
  };

  static getAvailableNewsMonths = (year: string) => {
    return DUMMY_NEWS.reduce<number[]>((months, news) => {
      const newsYear = new Date(news.date).getFullYear();
      if (newsYear === +year) {
        const month = new Date(news.date).getMonth();
        if (!months.includes(month)) {
          months.push(month + 1);
        }
      }
      return months;
    }, []).sort((a, b) => b - a);
  };

  static getNewsForYear = (year: string) => {
    return DUMMY_NEWS.filter(
      (news) => new Date(news.date).getFullYear() === +year
    );
  };

  static getNewsForYearAndMonth = (year: string, month: string) => {
    return DUMMY_NEWS.filter((news) => {
      const newsYear = new Date(news.date).getFullYear();
      const newsMonth = new Date(news.date).getMonth() + 1;
      return newsYear === +year && newsMonth === +month;
    });
  };
}
