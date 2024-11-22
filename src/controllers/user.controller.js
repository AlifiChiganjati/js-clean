import bcrypt from "bcryptjs/dist/bcrypt.js";
import UserService from "../services/user.service.js";

class UserController {
  constructor() {
    this.userService = new UserService();
  }
  async register(req, res, next) {
    try {
      const { email, first_name, last_name, password } = req.body;
      // const password = await bcrypt.hash(req.body.password, 8);
      // console.log(password);
      const payload = { email, first_name, last_name, password };
      await this.userService.createUser(payload);
      // console.log(data);
      return res.status(201).json({
        status: 201,
        message: "Register berhasil silahkan login",
        data: null,
      });
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({
        status: 400,
        message: "Parameter email tidak sesuai format",
        data: null,
      });
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const { token, user } = await this.userService.login({ email, password });

      return res.status(200).json({
        status: 200,
        message: "Login Sukses",
        data: { token },
      });
    } catch (err) {
      console.log(err.message);

      if (
        err.message === "User not found" ||
        err.message === "Invalid password"
      ) {
        return res.status(401).json({
          status: 401,
          message: "Username atau password salah",
          data: null,
        });
      }
      return res.status(400).json({
        status: 400,
        message: "Parameter email tidak sesuai format",
        data: null,
      });
    }
  }

  async findUserById(req, res, next) {
    try {
      const userId = req.user.id;
      const user = await this.userService.findById(userId);

      if (!user) {
        return res.status(404).json({
          status: 404,
          message: "User not found",
          data: null,
        });
      }

      return res.status(200).json({
        status: 200,
        message: "Sukses",
        data: {
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          profile_image: user.profile_image,
        },
      });
    } catch {
      return res.status(401).json({
        status: 401,
        message: "Token tidak tidak valid atau kadaluwarsa",
        data: null,
      });
    }
  }
}

export default UserController;
