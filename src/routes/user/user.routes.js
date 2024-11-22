import express from "express";
import UserController from "../../controllers/user.controller.js";

const router = express.Router();
const userController = new UserController();

router.post(
  "/registration",
  async (req, res, next) => await userController.register(req, res, next),
);

router.post(
  "/login",
  async (req, res, next) => await userController.login(req, res, next),
);
export default router;
