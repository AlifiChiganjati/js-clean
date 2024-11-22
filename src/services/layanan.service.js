import LayananRepository from "../repository/layanan.repository.js";

class LayananService {
  constructor() {
    this.layananRepository = new LayananRepository();
  }

  async getAll() {
    const result = await this.layananRepository.getALl();
    return result;
  }
}
export default LayananService;
