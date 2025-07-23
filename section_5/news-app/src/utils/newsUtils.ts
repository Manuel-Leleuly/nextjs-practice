import { News } from "@/models/news";
import sql from "better-sqlite3";
import { Utils } from "./utils";

const db = sql("src/data/data.db");

export class NewsUtils {
  static getAllNews = async () => {
    await Utils.sleepAsync(2000);
    return db.prepare<unknown[], News>("SELECT * FROM news").all();
  };

  static getNewsItem = async (slug: string) => {
    await Utils.sleepAsync(2000);
    return db
      .prepare<unknown[], News>("SELECT * FROM news WHERE slug = ?")
      .get(slug);
  };

  static getLatestNews = async () => {
    await Utils.sleepAsync(2000);
    return db
      .prepare<unknown[], News>("SELECT * FROM news ORDER BY date DESC LIMIT 3")
      .all();
  };

  static getAvailableNewsYears = async () => {
    await Utils.sleepAsync(2000);
    return db
      .prepare<unknown[], { year: string }>(
        "SELECT DISTINCT strftime('%Y', date) as year FROM news"
      )
      .all()
      .map((year) => year.year);
  };

  static getAvailableNewsMonths = (year: string) => {
    return db
      .prepare<unknown[], { month: string }>(
        "SELECT DISTINCT strftime('%m', date) as month FROM news WHERE strftime('%Y', date) = ?"
      )
      .all(year)
      .map((month) => month.month);
  };

  static getNewsForYear = async (year: string) => {
    await Utils.sleepAsync(2000);
    return db
      .prepare<unknown[], News>(
        "SELECT * FROM news WHERE strftime('%Y', date) = ? ORDER BY date DESC"
      )
      .all(year);
  };

  static getNewsForYearAndMonth = async (year: string, month: string) => {
    await Utils.sleepAsync(2000);
    return db
      .prepare<unknown[], News>(
        "SELECT * FROM news WHERE strftime('%Y', date) = ? AND strftime('%m', date) = ? ORDER BY date DESC"
      )
      .all(year, month);
  };
}
