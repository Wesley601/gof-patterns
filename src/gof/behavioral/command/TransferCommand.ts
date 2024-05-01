import { BankAccount } from "./BankAccount";

export interface Command {
  execute(): void;
}

export class TransferCommand implements Command {
  constructor(
    private readonly from: BankAccount,
    private readonly to: BankAccount,
    private readonly amount: number
  ) {}

  execute(): void {
    this.from.debit(this.amount);
    this.to.credit(this.amount);
  }
}
