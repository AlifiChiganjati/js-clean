import express from "express";
import SaldoController from "../../controllers/saldo.controller.js";
import auth from "../../middleware/auth.js";

const saldoController = new SaldoController();
const router = express.Router();

router.get(
  "/balance",
  auth,
  async (req, res, next) => await saldoController.getBalance(req, res, next),
);

router.put(
  "/topup",
  auth,
  async (req, res, next) => await saldoController.topUp(req, res, next),
);
export default router;
