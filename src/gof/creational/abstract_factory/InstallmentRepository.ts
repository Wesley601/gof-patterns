import { Installment } from "./Installment";

export interface InstallmentRepository {
  save(data: Installment): Promise<void>;
  listByLoanId(id: string): Promise<Installment[]>;
}

export class InstallmentRepositoryInMemory implements InstallmentRepository {
  data: Installment[] = [];
  static instance: InstallmentRepositoryInMemory;

  private constructor() {}

  async listByLoanId(loanId: string): Promise<Installment[]> {
    return this.data.filter((d) => d.loanId === loanId);
  }

  async save(data: Installment): Promise<void> {
    this.data.push(data);
  }

  static getInstance() {
    if (!this.instance) this.instance = new InstallmentRepositoryInMemory();
    return this.instance;
  }
}
