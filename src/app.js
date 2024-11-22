import express from "express";
import passport from "passport";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./routes/main.routes.js";

const app = express();

export const createApp = () => {
  app.use(helmet());
  app.use(cors());
  app.use(passport.initialize());
  app.use(bodyParser.json());

  router(app);

  return app;
};
