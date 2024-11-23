import LayananRepository from "../repository/layanan.repository.js";

class LayananService {
  constructor() {
    this.layananRepository = new LayananRepository();
  }

  async getAll() {
    const result = await this.layananRepository.getALl();
    return result;
  }
  async findByCode(code) {
    const result = await this.layananRepository.getByCode(code);
    return result;
  }
}
export default LayananService;
