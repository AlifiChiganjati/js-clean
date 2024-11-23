import express from "express";
import TransactionController from "../../controllers/transaction.controller.js";
import auth from "../../middleware/auth.js";
const router = express.Router();
const transactionController = new TransactionController();

router.post(
  "/transaction",
  auth,
  async (req, res, next) =>
    await transactionController.processPayment(req, res, next),
);

router.get(
  "/transaction/history",
  auth,
  async (req, res, next) =>
    await transactionController.getHistory(req, res, next),
);

export default router;
