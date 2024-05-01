export class Transaction {
  constructor(
    public readonly type: "credit" | "debit",
    public readonly amount: number
  ) {}
}
