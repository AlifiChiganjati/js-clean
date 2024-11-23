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
      if (!service) {
        throw new Error("Layanan tidak ada");
      }

      const queryBalance = `
        SELECT saldo FROM users WHERE id=$1;
      `;
      const resultBalance = await client.query(queryBalance, [userId]);
      const currentBalance = resultBalance.rows[0]?.saldo;
      if (!currentBalance || currentBalance < service.service_tarif) {
        throw new Error("Saldo tidak cukup");
      }

      const newBalance = currentBalance - service.service_tarif;
      const queryUpdateBalance = `
        UPDATE users 
        SET saldo = $1 
        WHERE id = $2 
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

  async getByUserId(id, limit, offset) {
    const query = `
SELECT  u.id, u.email, u.saldo,l.service_code,l.service_name,l.service_tarif, t.invoice_number,t.total_amount,t.created_on,t.transaction_type 
FROM users AS u 
LEFT JOIN transaction t ON u.id=t.user_id
LEFT JOIN layanan AS l ON t.layanan_id=l.id
WHERE u.id=$1
ORDER BY 
t.user_id DESC 
LIMIT $2 OFFSET $3;
`;
    const result = await this.pool.query(query, [id, limit, offset]);
    return result.rows;
  }
}
export default TransactionRepository;
