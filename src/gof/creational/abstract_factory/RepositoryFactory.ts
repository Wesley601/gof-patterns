import {
  InstallmentRepository,
  InstallmentRepositoryInMemory,
} from "./InstallmentRepository";
import { LoanRepository, LoanRepositoryInMemory } from "./LoanRepository";

export default interface RepositoryFactory {
  createLoanRepository(): LoanRepository;
  createInstallmentRepository(): InstallmentRepository;
}

export class RepositoryFactoryInMemory implements RepositoryFactory {
  createLoanRepository(): LoanRepository {
    return LoanRepositoryInMemory.getInstance();
  }

  createInstallmentRepository(): InstallmentRepository {
    return InstallmentRepositoryInMemory.getInstance();
  }
}
