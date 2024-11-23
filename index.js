import dotenv from "dotenv";
import { createApp } from "./src/app.js";

dotenv.config();

const port = process.env.PORT || 5000;
const baseUrl = process.env.BASE_URL || `http://localhost:${port}`;
const app = createApp();

app.listen(`${port}`, () => {
  console.log(`app listen on port ${baseUrl}`);
});
