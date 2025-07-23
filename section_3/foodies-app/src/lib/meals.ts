import { Meal, MealReqBody } from "@/models/meal";
import { Utils } from "@/utils/utils";
import sql from "better-sqlite3";
import fs from "node:fs";
import slugify from "slugify";

const db = sql("meals.db");

export class MealsLib {
  static getMeals = async () => {
    await Utils.sleepAsync(2000);
    return db.prepare<unknown[], Meal>("SELECT * FROM meals").all();
  };

  static getMeal = (slug: string) => {
    return db
      .prepare<unknown[], Meal>("SELECT * FROM meals WHERE slug = ?")
      .get(slug);
  };

  static saveMeal = async (meal: MealReqBody<"slug">) => {
    const newSlug = slugify(meal.title, { lower: true });
    meal.instructions = Utils.sanitize(meal.instructions);

    const extension = meal.image.name.split(".").pop() ?? "jpg";
    const fileName = `${newSlug}.${extension}`;

    const stream = fs.createWriteStream(`public/images/${fileName}`);
    const bufferedImage = await meal.image.arrayBuffer();
    stream.write(Buffer.from(bufferedImage), (error) => {
      if (error) {
        throw new Error("Saving image failed!");
      }
    });

    const imagePath = `/images/${fileName}`;

    db.prepare<Omit<Meal, "id">, Meal>(
      `
      INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug)
      VALUES (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)
    `
    ).run({
      ...meal,
      slug: newSlug,
      image: imagePath,
    });
  };
}
