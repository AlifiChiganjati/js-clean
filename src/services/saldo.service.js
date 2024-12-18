import SaldoRepository from "../repository/saldo.repository.js";

class SaldoService {
  constructor() {
    this.saldoRepository = new SaldoRepository();
  }
  async getBalance(id) {
    let saldo = await this.saldoRepository.get(id);

    return saldo;
  }

  async updateBalance(id, amount) {
    let saldo = await this.saldoRepository.get(id);
    if (amount <= 0) {
      throw new Error("saldo yang dimasukan harus leboh dari 0");
    }
    saldo.balance += parseFloat(amount);
    saldo = await this.saldoRepository.update(id, saldo.balance);
    return saldo;
  }

  async topUp(id, amount) {
    if (isNaN(amount) || amount <= 0) {
      throw new Error("saldo harus lebih dari 0");
    }
    await this.saldoRepository.get(id);

    const updatedSaldo = await this.saldoRepository.topUp(id, amount);
    return updatedSaldo;
  }
}

export default SaldoService;
