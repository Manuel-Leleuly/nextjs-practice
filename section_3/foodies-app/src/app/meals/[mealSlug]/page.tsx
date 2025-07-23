import { MealsLib } from "@/lib/meals";
import { DynamicMetadata, PageParams } from "@/models/models";
import { Utils } from "@/utils/utils";
import Image from "next/image";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

type Props = PageParams<{ mealSlug: string }>;

export const generateMetadata: DynamicMetadata<{ mealSlug: string }> = async (
  props,
  _
) => {
  const { mealSlug } = await props.params;
  const meal = MealsLib.getMeal(mealSlug);
  if (!meal) notFound();

  return {
    title: meal.title,
    description: meal.summary,
  };
};

export default async function MealDetailsPage({ params }: Props) {
  const { mealSlug } = await params;
  const meal = MealsLib.getMeal(mealSlug);

  if (!meal) notFound();

  const mealInstructions = Utils.sanitize(meal.instructions).replace(
    /\n/g,
    "<br>"
  );

  return (
    <>
      <header className={styles.header}>
        <div className={styles.image}>
          <Image fill src={meal.image} alt={meal.title} />
        </div>
        <div className={styles.headerText}>
          <h1>{meal.title}</h1>
          <p className={styles.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={styles.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={styles.instructions}
          dangerouslySetInnerHTML={{
            __html: Utils.sanitize(mealInstructions),
          }}
        />
      </main>
    </>
  );
}
