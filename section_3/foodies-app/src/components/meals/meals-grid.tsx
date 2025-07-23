import { Meal } from "@/models/meal";
import MealItem from "./meal-item";
import styles from "./meals-grid.module.css";

interface Props {
  meals: Meal[];
}

export const MealsGrid = ({ meals }: Props) => {
  return (
    <ul className={styles.meals}>
      {meals.map((meal) => (
        <li key={meal.id}>
          <MealItem
            creator={meal.creator}
            image={meal.image}
            slug={meal.slug}
            summary={meal.summary}
            title={meal.title}
          />
        </li>
      ))}
    </ul>
  );
};
