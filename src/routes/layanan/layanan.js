import express from "express";
import LayananController from "../../controllers/layanan.controller.js";

const router = express.Router();
const layananController = new LayananController();

router.get(
  "/services",
  async (req, res, next) => await layananController.list(req, res, next),
);

export default router;
