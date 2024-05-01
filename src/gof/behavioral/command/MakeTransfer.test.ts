import { expect, test } from "bun:test";
import { InMemoryAccountRepository } from "./AccountRepository";
import { MakeTransfer } from "./MakeTransfer";
import { GetBalance } from "./GetBalance";
import { BankAccount } from "./BankAccount";

test("deve fazer uma transferencia bancária", async () => {
  const accountRepository = new InMemoryAccountRepository();
  await Promise.all([
    accountRepository.save(new BankAccount(1)),
    accountRepository.save(new BankAccount(2)),
  ]);
  const makeTransfer = new MakeTransfer(accountRepository);
  await makeTransfer.execute({
    from: 1,
    to: 2,
    amount: 100,
  });
  const getBalance = new GetBalance(accountRepository);
  const balance1 = await getBalance.execute({ accountId: 1 });
  const balance2 = await getBalance.execute({ accountId: 2 });
  expect(balance1.balance).toBe(-100);
  expect(balance2.balance).toBe(100);
});
