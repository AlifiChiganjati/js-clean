import pool from "../config/config.js";

class UserRepository {
  constructor() {
    this.pool = pool;
  }
  async create({ email, first_name, last_name, password }) {
    const query = `
    INSERT INTO "users" 
      (email, first_name, last_name, password) 
    VALUES 
      ($1,$2,$3,$4)
    RETURNING id, email, first_name, last_name, password
`;
    const result = await this.pool.query(query, [
      email,
      first_name,
      last_name,
      password,
    ]);
    // console.log(result);
    return result.rows[0];
  }

  async findByEmail(email) {
    const query = `
SELECT id, email, first_name, last_name, password
FROM users 
WHERE email = $1
`;
    const result = await this.pool.query(query, [email]);
    return result.rows[0];
  }

  async findById(id) {
    const query = `
SELECT id,email,first_name,last_name,profile_image FROM users WHERE id=$1
`;
    const result = await this.pool.query(query, [id]);
    console.log("result user repository", result.rows);
    return result.rows[0];
  }
  async update(id, { first_name, last_name }) {
    const query = `
    UPDATE users 
    SET first_name = $1, last_name = $2
    WHERE id = $3
  `;
    const result = await this.pool.query(query, [first_name, last_name, id]);
    return result.rows[0];
  }
}

export default UserRepository;
