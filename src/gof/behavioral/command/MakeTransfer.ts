import { AccountRepository } from "./AccountRepository";
import { TransferCommand } from "./TransferCommand";

export class MakeTransfer {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(request: Input): Promise<void> {
    const from = await this.accountRepository.getById(request.from);
    if (!from) throw new Error("Conta de origem não encontrada");
    const to = await this.accountRepository.getById(request.to);
    if (!to) throw new Error("Conta de destino não encontrada");
    new TransferCommand(from, to, request.amount).execute();
    await Promise.allSettled([
      this.accountRepository.update(from),
      this.accountRepository.update(to),
    ]);
  }
}

export type Input = {
  from: number;
  to: number;
  amount: number;
};
