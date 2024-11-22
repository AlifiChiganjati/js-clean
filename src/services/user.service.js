import UserRepository from "../repository/user.repository.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();
class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(payload) {
    if (payload.password.length < 8) {
      throw new Error("password minimal 8 karakter");
    }
    const pass = await bcrypt.hash(payload.password, 10);
    const newUser = {
      id: payload.id,
      email: payload.email,
      first_name: payload.first_name,
      last_name: payload.last_name,
      password: pass,
    };
    const createUser = await this.userRepository.create(newUser);
    console.log(createUser);
    return createUser;
  }

  async login({ email, password }) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    return { token, user };
  }

  async findById(id) {
    const user = this.userRepository.findById(id);
    return user;
  }
}

export default UserService;
