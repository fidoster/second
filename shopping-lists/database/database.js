import { postgres } from "../deps.js";

let db;
if (Deno.env.get("DATABASE_URL")) {
  db = postgres(Deno.env.get("DATABASE_URL"));
} else {
  db = postgres({});
}

export { db };