import {
  InstallmentCalculator,
  PriceInstallmentCalculator,
  SACInstallmentCalculator,
} from "./InstallmentCalculator";
import { CarLoan, Loan, MortgageLoan } from "./Loan";

export default interface LoanFactory {
  createLoan(amount: number, income: number, installment: number): Loan;
  createInstallmentCalculator(): InstallmentCalculator;
}

export class MortgageLoanFactory implements LoanFactory {
  createLoan(
    amount: number,
    income: number,
    installment: number
  ): MortgageLoan {
    return MortgageLoan.create(amount, income, installment);
  }

  createInstallmentCalculator(): InstallmentCalculator {
    return new SACInstallmentCalculator();
  }
}

export class CarLoanFactory implements LoanFactory {
  createLoan(amount: number, income: number, installment: number): CarLoan {
    return CarLoan.create(amount, income, installment);
  }

  createInstallmentCalculator(): InstallmentCalculator {
    return new PriceInstallmentCalculator();
  }
}
