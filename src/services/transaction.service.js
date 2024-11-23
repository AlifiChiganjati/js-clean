import SaldoRepository from "../repository/saldo.repository.js";
import TransactionRepository from "../repository/transaction.repository.js";

class TransactionService {
  constructor() {
    this.transactionRepository = new TransactionRepository();
    this.saldoRepository = new SaldoRepository();
  }

  async payment(userId, serviceCode) {
    await this.saldoRepository.get(userId);

    const transaction = await this.transactionRepository.create(
      userId,
      serviceCode,
    );

    return transaction;
  }

  async getByUserId(id, limit = 3, offset = 0) {
    const transactions = await this.transactionRepository.getByUserId(
      id,
      limit,
      offset,
    );
    return transactions;
  }
}

export default TransactionService;
