import { Loan } from "./Loan";

export interface LoanRepository {
  save(data: Loan): Promise<void>;
  getById(id: string): Promise<Loan>;
}

export class LoanRepositoryInMemory implements LoanRepository {
  data: Loan[] = [];
  static instance: LoanRepositoryInMemory;

  private constructor() {}

  async save(data: Loan): Promise<void> {
    this.data.push(data);
  }

  async getById(id: string): Promise<Loan> {
    const value = this.data.find((d) => (d as any).id === id);
    if (!value) throw new Error("value not found");

    return value;
  }

  static getInstance() {
    if (!this.instance) this.instance = new LoanRepositoryInMemory();
    return this.instance;
  }
}
