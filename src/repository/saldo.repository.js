import pool from "../config/config.js";

class SaldoRepository {
  constructor() {
    this.pool = pool;
  }

  async get(id) {
    const query = `SELECT balance FROM saldo WHERE user_id=$1`;
    const result = await this.pool.query(query, [id]);
    return result.rows[0];
  }

  async create(id) {
    const query = `
      INSERT INTO saldo (user_id, balance)
      VALUES ($1, 0)
      RETURNING *;
    `;
    const result = await this.pool.query(query, [id]);
    return result.rows[0];
  }

  async topUp(id, amount) {
    const client = await this.pool.connect();
    try {
      await client.query("BEGIN");
      const currentSaldo = await client.query(
        "SELECT balance FROM saldo WHERE user_id=$1",
        [id],
      );
      if (!currentSaldo.rows[0]) {
        throw new Error("User saldo not found");
      }
      const currentBalance = parseFloat(currentSaldo.rows[0].balance);
      const newBalance = currentBalance + parseFloat(amount);

      const updateSaldoQuery = `
        UPDATE saldo
        SET balance = $1
        WHERE user_id = $2
        RETURNING *;
      `;
      const updatedSaldo = await client.query(updateSaldoQuery, [
        newBalance,
        id,
      ]);

      await client.query("COMMIT");
      return updatedSaldo.rows[0];
    } catch (err) {
      // If any error occurs, rollback the transaction
      await client.query("ROLLBACK");
      throw err;
    } finally {
      // Release the client back to the pool
      client.release();
    }
  }
}

export default SaldoRepository;
