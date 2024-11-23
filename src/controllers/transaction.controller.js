import LayananService from "../services/layanan.service.js";
import TransactionService from "../services/transaction.service.js";

class TransactionController {
  constructor() {
    this.transactionService = new TransactionService();
    this.layananService = new LayananService();
  }
  async processPayment(req, res, next) {
    try {
      const userId = req.user.id;
      const { service_code } = req.body;

      if (!service_code) {
        return res.status(400).json({
          status: 400,
          message: "Service ataus Layanan tidak ditemukan",
          data: null,
        });
      }
      const service = await this.layananService.findByCode(service_code);
      if (!service) {
        return res.status(400).json({
          status: 400,
          message: "Layanan tidak ada",
          data: null,
        });
      }
      const transaction = await this.transactionService.payment(
        userId,
        service_code,
      );

      return res.status(200).json({
        status: 0,
        message: "Transaksi berhasil",
        data: {
          invoice_number: transaction.invoice_number,
          service_code: transaction.service_code,
          service_name: transaction.service_name,
          transaction_type: transaction.transaction_type,
          total_amount: parseInt(transaction.total_amount),
          created_on: transaction.created_on,
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

  async getHistory(req, res, next) {
    try {
      const userId = req.user.id;

      const limit = parseInt(req.query.limit) || 3;
      const offset = parseInt(req.query.offset) || 0;

      const transactions = await this.transactionService.getByUserId(
        userId,
        limit,
        offset,
      );
      console.log(transactions);
      const responseData = transactions.map((transaction) => ({
        invoice_number: transaction.invoice_number,
        transaction_type: transaction.transaction_type,
        description: transaction.service_name,
        total_amount: parseInt(transaction.total_amount),
        created_on: transaction.created_on,
      }));

      return res.status(200).json({
        status: 200,
        message: "Get History Berhasil",
        data: responseData,
      });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({
        status: 500,
        message: "Internal server error",
        data: null,
      });
    }
  }
}

export default TransactionController;
