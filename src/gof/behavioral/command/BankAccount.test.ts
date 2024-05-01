import { expect, test } from "bun:test";
import { BankAccount } from "./BankAccount";
import { TransferCommand } from "./TransferCommand";

test("deve fazer uma transferência entre duas contas", () => {
  const from = new BankAccount(1);
  const to = new BankAccount(2);
  expect(from.getBalance()).toBe(0);
  expect(from.getBalance()).toBe(0);
  from.debit(100);
  to.credit(100);
  expect(from.getBalance()).toBe(-100);
  expect(to.getBalance()).toBe(100);
});

test("deve fazer uma transferência entre duas contas usando um comando", () => {
  const from = new BankAccount(1);
  const to = new BankAccount(2);
  expect(from.getBalance()).toBe(0);
  expect(from.getBalance()).toBe(0);
  const transferCommand = new TransferCommand(from, to, 100);
  transferCommand.execute();
  expect(from.getBalance()).toBe(-100);
  expect(to.getBalance()).toBe(100);
});
