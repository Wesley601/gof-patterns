import { BankAccount } from "./BankAccount";

export interface AccountRepository {
  save(account: BankAccount): Promise<void>;
  update(account: BankAccount): Promise<void>;
  getById(accountId: number): Promise<BankAccount | undefined>;
}

export class InMemoryAccountRepository implements AccountRepository {
  private accounts: BankAccount[] = [];

  async save(account: BankAccount) {
    this.accounts.push(account);
  }

  async update(account: BankAccount) {
    const index = this.accounts.findIndex((a) => a.id === account.id);
    this.accounts[index] = account;
  }

  async getById(accountId: number) {
    return this.accounts.find((a) => a.id === accountId);
  }
}
