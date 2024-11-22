import BannerService from "../services/banner.service.js";

class BannerController {
  constructor() {
    this.bannerService = new BannerService();
  }

  async list(req, res, next) {
    try {
      const response = await this.bannerService.getAll();
      return res.status(200).json({
        status: 200,
        message: "Sukses",
        data: response,
      });
    } catch (err) {
      console.log(err);
      return res.status(401).json({
        status: 401,
        message: "Token tidak tidak valid atau kadaluwarsa",
        data: null,
      });
    }
  }
}

export default BannerController;
