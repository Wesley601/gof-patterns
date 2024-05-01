import { Transaction } from "./Transaction";

export class BankAccount {
  transactions: Transaction[] = [];

  constructor(public readonly id: number, public balance: number = 0) {}

  credit(amount: number): void {
    this.transactions.push(new Transaction("credit", amount));
  }

  debit(amount: number): void {
    this.transactions.push(new Transaction("debit", amount));
  }

  getBalance(): number {
    return this.transactions.reduce(
      (acc, transaction) =>
        transaction.type === "credit"
          ? acc + transaction.amount
          : acc - transaction.amount,
      this.balance
    );
  }
}
