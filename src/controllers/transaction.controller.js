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
      parseInt(transaction.total_amount);
      console.log(transaction);
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
}

export default TransactionController;
