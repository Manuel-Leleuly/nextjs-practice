import { Training } from "@/models/database";
import { db } from "./db";

export class TrainingLib {
  static getTrainings = () => {
    const stmt = db.prepare<unknown[], Training>("SELECT * FROM trainings");
    return stmt.all();
  };
}
