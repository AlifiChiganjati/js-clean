import user from "./user/user.routes.js";
import banner from "./banner/banner.routes.js";
import layanan from "./layanan/layanan.js";
import saldo from "./saldo/saldo.routes.js";

const router = (app) => {
  app.get("/", (req, res) => {
    res.status(200).json({
      status: 200,
      message: "server in running up",
    });
  });
  app.use("/", user);
  app.use("/", banner);
  app.use("/", layanan);
  app.use("/", saldo);
};

export default router;
