import { db } from "../database/database.js";

const listMessages = async () => {
  return await db`SELECT * FROM messages ORDER BY id DESC LIMIT 5`;
};

const addMessage = async (sender, message) => {
  await db`INSERT INTO messages (sender, message) VALUES (${sender}, ${message})`;
};

export { listMessages, addMessage };