import SaldoService from "../services/saldo.service.js";

class SaldoController {
  constructor() {
    this.saldoService = new SaldoService();
  }

  async getBalance(req, res, next) {
    try {
      const userId = req.user.id;
      console.log(userId);
      let saldo = await this.saldoService.getBalance(userId);
      console.log("ini saldo controller", saldo);
      if (!saldo) {
        return res.status(404).json({
          status: 404,
          message: "Balance not found for the user",
          data: null,
        });
      }

      return res.status(200).json({
        status: 200,
        message: "Get Balance Berhasil",
        data: {
          saldo: parseInt(saldo.saldo),
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

      if (saldo && saldo.saldo !== undefined) {
        const balance = parseFloat(saldo.saldo);
        return res.status(200).json({
          status: 200,
          message: "Top Up Balance Berhasil",
          data: {
            top_up_amount: balance,
          },
        });
      }
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
