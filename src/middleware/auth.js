import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserRepository from "../repository/user.repository.js";

dotenv.config();
export const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        status: 401,
        message: "Authentication failed, no token provided",
        data: null,
      });
    }

    const decoded = jwt.decode(token, process.env.JWT_SECRET);

    console.log(decoded);
    // const findUser = await new UserRepository().findByEmail({
    // email: decoded.email,
    // });
    const findUser = await new UserRepository().findById({ id: decoded.id });
    console("ini finduser in auth", findUser);
    if (!findUser) throw Error("please authenticate");

    req.user = findUser;
    req.token = token;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send({ message: "please authenticate" });
  }
};
