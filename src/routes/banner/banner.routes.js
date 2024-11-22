import express from "express";
import BannerController from "../../controllers/banner.controller.js";

const router = express.Router();
const bannerController = new BannerController();

router.get(
  "/banner",
  async (req, res, next) => await bannerController.list(req, res, next),
);

export default router;
