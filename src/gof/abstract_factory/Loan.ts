import { randomUUID } from "crypto";

export abstract class Loan {
  abstract rate: number;

  constructor(
    readonly id: string,
    readonly amount: number,
    readonly income: number,
    readonly installments: number,
    readonly type: string
  ) {}

  static create(amount: number, income: number, installments: number) {
    throw new Error("this method should be overwritten");
  }

  exceedMaxInstallments(months: number) {
    return this.installments > months;
  }

  portion() {
    return this.amount / this.installments;
  }

  incomeExceedThePortion(rate: number) {
    return this.income * rate < this.portion();
  }
}

export class MortgageLoan extends Loan {
  rate = 10;

  constructor(
    loanId: string,
    amount: number,
    income: number,
    installments: number
  ) {
    super(loanId, amount, income, installments, "mortgage");
    if (this.exceedMaxInstallments(420))
      throw new Error(
        "The maximum number of installments for mortgage loan is 420"
      );
    if (this.incomeExceedThePortion(0.25))
      throw new Error(
        "The installment amount could not exceed 25% of monthly income"
      );
  }

  static create(amount: number, income: number, installments: number) {
    return new MortgageLoan(randomUUID(), amount, income, installments);
  }
}

export class CarLoan extends Loan {
  rate = 15;

  constructor(
    loanId: string,
    amount: number,
    income: number,
    installments: number
  ) {
    super(loanId, amount, income, installments, "car");
    if (this.exceedMaxInstallments(60))
      throw new Error("The maximum number of installments for car loan is 60");
    if (this.incomeExceedThePortion(0.3))
      throw new Error(
        "The installment amount could not exceed 30% of monthly income"
      );
  }

  static create(amount: number, income: number, installments: number) {
    return new CarLoan(randomUUID(), amount, income, installments);
  }
}
