import { Message } from "@/models/message";
import sql from "better-sqlite3";
import { unstable_cache } from "next/cache";
import { cache } from "react";

const db = new sql("src/data/messages.db");

function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY, 
      text TEXT
    )`);
}

initDb();

// helper functions
const getMessages = async (): Promise<Message[]> => {
  console.log("Fetching messages from db");
  return db.prepare<unknown[], Message>("SELECT * FROM messages").all();
};

export class MessagesLib {
  static addMessage = (message: string) => {
    db.prepare<[string]>("INSERT INTO messages (text) VALUES (?)").run(message);
  };

  static getMessages = unstable_cache(cache(getMessages), ["messages"], {
    tags: ["msg"],
  });
}
