import pool from "../config/config.js";

class TransactionRepository {
  constructor() {
    this.pool = pool;
  }
  async create(userId, serviceCode) {
    const client = await this.pool.connect();
    try {
      await client.query("BEGIN");
      const queryService = `
        SELECT id, service_code, service_name, service_tarif 
        FROM layanan 
        WHERE service_code=$1;
      `;
      const resultService = await client.query(queryService, [serviceCode]);
      const service = resultService.rows[0];
      console.log(service);
      if (!service) {
        throw new Error("Layanan tidak ada");
      }

      const queryBalance = `
        SELECT balance FROM saldo WHERE user_id=$1;
      `;
      const resultBalance = await client.query(queryBalance, [userId]);
      const currentBalance = resultBalance.rows[0]?.balance;
      console.log(currentBalance);
      if (!currentBalance || currentBalance > service.service_tarif) {
        throw new Error("Saldo tidak cukup");
      }

      const newBalance = currentBalance - service.service_tarif;
      console.log(newBalance);
      const queryUpdateBalance = `
        UPDATE saldo 
        SET balance = $1 
        WHERE user_id = $2 
        RETURNING *;
      `;
      await client.query(queryUpdateBalance, [newBalance, userId]);

      const invoiceNumber = `INV-${Date.now()}`;

      const queryTransaction = `
        INSERT INTO "transaction" (user_id, layanan_id, transaction_type, invoice_number, total_amount, created_on)
        VALUES ($1, $2, 'PAYMENT', $3, $4, NOW())
        RETURNING *;
      `;
      const resultTransaction = await client.query(queryTransaction, [
        userId,
        service.id,
        invoiceNumber,
        service.service_tarif,
      ]);

      const transaction = resultTransaction.rows[0];

      await client.query("COMMIT");

      return {
        invoice_number: transaction.invoice_number,
        service_code: service.service_code,
        service_name: service.service_name,
        transaction_type: transaction.transaction_type,
        total_amount: transaction.total_amount,
        created_on: transaction.created_on,
      };
    } catch (error) {
      await client.query("ROLLBACK");
      throw new Error(error.message);
    } finally {
      client.release();
    }
  }
}
export default TransactionRepository;