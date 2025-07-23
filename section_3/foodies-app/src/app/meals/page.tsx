import { MealsGrid } from "@/components/meals/meals-grid";
import { MealsLib } from "@/lib/meals";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "All Meals",
  description: "Browser the delicious meals shared by our vibrant community.",
};

export default function MealsPage() {
  return (
    <>
      <header className={styles.header}>
        <h1>
          Delicious meals, created{" "}
          <span className={styles.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={styles.cta}>
          <Link href="/meals/share">Share Your Favorite Recipe</Link>
        </p>
      </header>
      <main className={styles.main}>
        <Suspense
          fallback={<p className={styles.loading}>Fetching meals...</p>}
        >
          <Meals />
        </Suspense>
      </main>
    </>
  );
}

const Meals = async () => {
  const meals = await MealsLib.getMeals();

  return <MealsGrid meals={meals} />;
};
