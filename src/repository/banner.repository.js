import pool from "../config/config.js";

class BannerRepository {
  constructor() {
    this.pool = pool;
  }
  async getALl() {
    const query = `
SELECT banner_name, banner_image, description FROM banner
`;
    const result = await this.pool.query(query);
    return result.rows;
  }
}

export default BannerRepository;
