import UserService from "../services/user.service.js";

class UserController {
  constructor() {
    this.userService = new UserService();
  }
  async register(req, res, next) {
    try {
      const { email, first_name, last_name, password } = req.body;
      const payload = { email, first_name, last_name, password };
      await this.userService.createUser(payload);
      return res.status(201).json({
        status: 201,
        message: "Register berhasil silahkan login",
        data: null,
      });
    } catch (err) {
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

      const { token } = await this.userService.login({ email, password });

      return res.status(200).json({
        status: 200,
        message: "Login Sukses",
        data: { token },
      });
    } catch (err) {
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
      return res.status(500).json({
        status: 500,
        message: "Internal server error",
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
          message: "User tidak ditemukan",
          data: null,
        });
      }
      return res.status(200).json({
        status: 200,
        message: "Sukses",
        data: user,
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        message: "Internal server error",
        data: null,
      });
    }
  }
  async updateProfile(req, res, next) {
    try {
      const userId = req.user.id;
      const { first_name, last_name } = req.body;

      await this.userService.updateUser(userId, {
        first_name,
        last_name,
      });
      const user = await this.userService.findById(userId);
      return res.status(200).json({
        status: 200,
        message: "Update Pofile berhasil",
        data: user,
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({
        status: 500,
        message: err.message,
        data: null,
      });
    }
  }

  async uploadProfileImage(req, res, next) {
    try {
      const userId = req.user.id;
      const file = req.file;

      await this.userService.updateProfileImage(userId, file);
      const user = await this.userService.findById(userId);

      return res.status(200).json({
        status: 200,
        message: "Update Profile Image berhasil",
        data: user,
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        message: "Internal server error",
        data: null,
      });
    }
  }
}

export default UserController;
