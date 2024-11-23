import express from "express";
import passport from "passport";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./routes/main.routes.js";
import path from "path";

const app = express();
const __dirname = new URL(".", import.meta.url).pathname;

export const createApp = () => {
  app.use(helmet());
  app.use(cors());
  app.use(passport.initialize());
  app.use(bodyParser.json());

  app.use(express.static(path.join(__dirname, "/public")));
  app.use(express.static(`${__dirname}/upload`));
  router(app);

  return app;
};
