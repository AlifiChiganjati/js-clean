import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

await sleep(3000);
if (
  process.env.DB_HOST === "" ||
  process.env.DB_PORT === "" ||
  process.env.DB_USER === "" ||
  process.env.DB_PASS === "" ||
  process.env.DB_NAME === ""
) {
  throw new Error("envirovment required");
}

const { Pool } = pg;
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: String(process.env.DB_PASS),
  database: process.env.DB_NAME,
});

export default pool;
