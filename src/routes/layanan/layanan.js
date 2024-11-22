import express from "express";
import LayananController from "../../controllers/layanan.controller.js";
import { auth } from "../../middleware/auth.js";

const router = express.Router();
const layananController = new LayananController();

router.get(
  "/services",
  auth,
  async (req, res, next) => await layananController.list(req, res, next),
);

export default router;
