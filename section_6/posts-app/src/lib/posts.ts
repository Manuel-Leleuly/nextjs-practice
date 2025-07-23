import { Post, PostData } from "@/models/post";
import { Utils } from "@/utils/utils";
import sql from "better-sqlite3";

const db = new sql("src/data/posts.db");

function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY, 
      first_name TEXT, 
      last_name TEXT,
      email TEXT
    )`);
  db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY, 
      image_url TEXT NOT NULL,
      title TEXT NOT NULL, 
      content TEXT NOT NULL, 
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      user_id INTEGER, 
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    )`);
  db.exec(`
    CREATE TABLE IF NOT EXISTS likes (
      user_id INTEGER, 
      post_id INTEGER, 
      PRIMARY KEY(user_id, post_id),
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE, 
      FOREIGN KEY(post_id) REFERENCES posts(id) ON DELETE CASCADE
    )`);

  // Creating two dummy users if they don't exist already
  const stmt = db.prepare<unknown[], { count: number }>(
    "SELECT COUNT(*) AS count FROM users"
  );

  if (stmt.get()?.count === 0) {
    db.exec(`
    INSERT INTO users (first_name, last_name, email)
    VALUES ('John', 'Doe', 'john@example.com')
  `);

    db.exec(`
    INSERT INTO users (first_name, last_name, email)
    VALUES ('Max', 'Schwarz', 'max@example.com')
  `);
  }
}

initDb();

export class PostsLib {
  static getPosts = async (maxNumber?: number) => {
    const limitClause = maxNumber ? "LIMIT ?" : "";

    const stmt = db.prepare<unknown[], PostData>(`
        SELECT posts.id, image_url AS image, title, content, created_at AS createdAt, first_name AS userFirstName, last_name AS userLastName, COUNT(likes.post_id) AS likes, EXISTS(SELECT * FROM likes WHERE likes.post_id = posts.id and likes.user_id = 2) AS isLiked
        FROM posts
        INNER JOIN users ON posts.user_id = users.id
        LEFT JOIN likes ON posts.id = likes.post_id
        GROUP BY posts.id
        ORDER BY createdAt DESC
        ${limitClause}`);

    await Utils.sleepAsync(1000);
    return maxNumber ? stmt.all(maxNumber) : stmt.all();
  };

  static storePost = async (
    post: Pick<Post, "image_url" | "title" | "content" | "user_id">
  ) => {
    const stmt = db.prepare<[string, string, string, number]>(`
        INSERT INTO posts (image_url, title, content, user_id)
        VALUES (?, ?, ?, ?)`);
    await Utils.sleepAsync(1000);
    return stmt.run(post.image_url, post.title, post.content, post.user_id);
  };

  static updatePostLikeStatus = async (postId: number, userId: number) => {
    const stmt = db.prepare<[number, number], { count: number }>(`
        SELECT COUNT(*) AS count
        FROM likes
        WHERE user_id = ? AND post_id = ?`);

    const isLiked = stmt.get(userId, postId)?.count === 0;

    if (isLiked) {
      const stmt = db.prepare<[number, number]>(`
        INSERT INTO likes (user_id, post_id)
        VALUES (?, ?)`);
      await Utils.sleepAsync(1000);
      return stmt.run(userId, postId);
    } else {
      const stmt = db.prepare<[number, number]>(`
        DELETE FROM likes
        WHERE user_id = ? AND post_id = ?`);
      await Utils.sleepAsync(1000);
      return stmt.run(userId, postId);
    }
  };
}
