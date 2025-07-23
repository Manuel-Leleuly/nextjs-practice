import { User } from "@/models/database";
import { db } from "./db";

export class UserLib {
  static createUser = (email: string, password: string) => {
    const result = db
      .prepare<[string, string]>(
        "INSERT INTO users (email, password) VALUES (?, ?)"
      )
      .run(email, password);
    return result.lastInsertRowid;
  };

  static getUserByEmail = (email: string) => {
    return db
      .prepare<[string], User>("SELECT * FROM users WHERE email = ?")
      .get(email);
  };
}
