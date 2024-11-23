import pool from "../config/config.js";

class LayananRepository {
  constructor() {
    this.pool = pool;
  }
  async getALl() {
    const query = `
SELECT service_code, service_name, service_icon, service_tarif FROM layanan
`;
    const result = await this.pool.query(query);
    return result.rows;
  }

  async getByCode(code) {
    const query = `
SELECT service_code FROM layanan WHERE service_code = $1`;
    const result = await this.pool.query(query, [code]);
    return result;
  }
}

export default LayananRepository;
