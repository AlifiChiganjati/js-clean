import pool from "../config/config.js";

class SaldoRepository {
  constructor() {
    this.pool = pool;
  }

  async get(id) {
    const query = `SELECT saldo FROM users WHERE id=$1`;
    const result = await this.pool.query(query, [id]);
    return result.rows[0];
  }

  async topUp(id, amount) {
    const client = await this.pool.connect();
    try {
      await client.query("BEGIN");
      const currentSaldo = await client.query(
        "SELECT saldo FROM users WHERE id=$1",
        [id],
      );

      if (!currentSaldo.rows[0]) {
        throw new Error("User saldo not found");
      }

      const currentBalance = parseFloat(currentSaldo.rows[0].saldo);
      const newBalance = currentBalance + parseFloat(amount);

      const updateSaldoQuery = `
        UPDATE users
        SET saldo = $1
        WHERE id = $2
        RETURNING *;
      `;
      const updatedSaldo = await client.query(updateSaldoQuery, [
        newBalance,
        id,
      ]);

      await client.query("COMMIT");
      return updatedSaldo.rows[0];
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  }
}

export default SaldoRepository;
