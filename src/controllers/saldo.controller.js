import SaldoService from "../services/saldo.service.js";
import UserService from "../services/user.service.js";

class SaldoController {
  constructor() {
    this.saldoService = new SaldoService();
  }

  async getBalance(req, res, next) {
    try {
      const userId = req.user.id;
      console.log(userId);
      const saldo = await this.saldoService.getBalance(userId);
      if (!saldo) {
        return res.status(404).json({
          status: 404,
          message: "Balance not found for the user",
          data: null,
        });
      }

      console.log(saldo);
      const balance = parseInt(saldo.balance);
      return res.status(200).json({
        status: 0,
        message: "Get Balance Berhasil",
        data: {
          balance,
        },
      });
    } catch (err) {
      console.error(err.message);

      return res.status(500).json({
        status: 500,
        message: err.message,
        data: null,
      });
    }
  }

  async topUp(req, res, next) {
    try {
      const userId = req.user.id;
      const { top_up_amount } = req.body;

      if (typeof top_up_amount !== "number" || isNaN(top_up_amount)) {
        return res.status(400).json({
          status: 400,
          message: "Invalid balance value",
          data: null,
        });
      }
      await this.saldoService.topUp(userId, top_up_amount);
      const saldo = await this.saldoService.getBalance(userId);
      const balance = parseInt(saldo.balance);

      return res.status(200).json({
        status: 0,
        message: "Top Up Balance berhasil",
        data: {
          top_up_amount: balance,
        },
      });
    } catch (err) {
      console.log(err);

      return res.status(500).json({
        status: 500,
        message: err.message,
        data: null,
      });
    }
  }
}

export default SaldoController;
