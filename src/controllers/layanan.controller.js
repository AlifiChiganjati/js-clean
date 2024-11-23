import LayananService from "../services/layanan.service.js";

class LayananController {
  constructor() {
    this.layananService = new LayananService();
  }

  async list(req, res, next) {
    try {
      const response = await this.layananService.getAll();
      return res.status(200).json({
        status: 200,
        message: "Sukses",
        data: response,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        status: 500,
        message: "Internal server error",
        data: null,
      });
    }
  }
}

export default LayananController;
