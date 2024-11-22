import dotenv from "dotenv";
import { createApp } from "./src/app.js";

dotenv.config();

const port = process.env.PORT || 5000;
const app = createApp();

app.listen(`${port}`, () => {
  console.log(`app listen on port ${port}`);
});
