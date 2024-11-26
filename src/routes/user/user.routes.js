import express from "express";
import UserController from "../../controllers/user.controller.js";
import auth from "../../middleware/auth.js";
import upload from "../../middleware/uploadImage.js";

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

router.get(
  "/profile",
  auth,
  async (req, res, next) => await userController.findUserById(req, res, next),
);

router.put(
  "/profile/update",
  auth,
  async (req, res, next) => await userController.updateProfile(req, res, next),
);

router.put(
  "/profile/image",
  auth,
  upload.single("file"),
  async (req, res, next) =>
    await userController.uploadProfileImage(req, res, next),
);

export default router;
