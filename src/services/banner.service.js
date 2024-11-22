import BannerRepository from "../repository/banner.repository.js";

class BannerService {
  constructor() {
    this.bannerRepository = new BannerRepository();
  }

  async getAll() {
    const result = await this.bannerRepository.getALl();
    return result;
  }
}
export default BannerService;
