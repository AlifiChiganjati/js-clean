import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserRepository from "../repository/user.repository.js";

dotenv.config();
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        status: 401,
        message: "Token tidak tidak valid atau kadaluwarsa",
        data: null,
      });
    }

    const decoded = jwt.decode(token, process.env.JWT_SECRET);

    const findUser = await new UserRepository().findById(decoded.id);
    if (!findUser) throw Error("please authenticate");

    if (findUser) {
      req.user = {
        id: findUser.id,
        email: findUser.email,
        first_name: findUser.first_name,
        last_name: findUser.last_name,
        profile_image: findUser.profile_image,
      };
    }
    next();
  } catch (err) {
    return res.status(401).json({
      status: 401,
      message: "Token tidak tidak valid atau kadaluwarsa",
      data: null,
    });
  }
};

export default auth;
