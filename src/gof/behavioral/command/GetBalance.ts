import { AccountRepository } from "./AccountRepository";

export class GetBalance {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(request: Input) {
    const account = await this.accountRepository.getById(request.accountId);
    const balance = account ? account.getBalance() : 0;

    return { balance };
  }
}

export type Input = {
  accountId: number;
};
