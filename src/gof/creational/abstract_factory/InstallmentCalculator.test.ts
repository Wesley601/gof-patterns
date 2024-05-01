import { expect, test } from "bun:test";
import {
  PriceInstallmentCalculator,
  SACInstallmentCalculator,
} from "./InstallmentCalculator";
import { MortgageLoan } from "./Loan";

test("Deve calcular as parcelas utilizando SAC", () => {
  const installmentCalculator = new SACInstallmentCalculator();
  const loan = MortgageLoan.create(100000, 10000, 240);
  const installments = installmentCalculator.calculate(loan);
  expect(installments).toHaveLength(240);

  const firstInstallment = installments.at(0);
  const lastInstallment = installments.at(-1);

  expect(firstInstallment?.number).toBe(1);
  expect(firstInstallment?.amount).toBe(1250);
  expect(firstInstallment?.amortization).toBe(416.67);
  expect(firstInstallment?.interest).toBe(833.33);
  expect(firstInstallment?.balance).toBe(99583.33);

  expect(lastInstallment?.number).toBe(240);
  expect(lastInstallment?.amount).toBe(420.14);
  expect(lastInstallment?.amortization).toBe(416.67);
  expect(lastInstallment?.interest).toBe(3.47);
  expect(lastInstallment?.balance).toBe(0);
});

test("Deve calcular as parcelas utilizando PRICE", () => {
  const installmentCalculator = new PriceInstallmentCalculator();
  const loan = MortgageLoan.create(100000, 10000, 240);
  const installments = installmentCalculator.calculate(loan);
  expect(installments).toHaveLength(240);

  const firstInstallment = installments.at(0);
  const lastInstallment = installments.at(-1);

  expect(firstInstallment?.number).toBe(1);
  expect(firstInstallment?.amount).toBe(965.02);
  expect(firstInstallment?.amortization).toBe(131.69);
  expect(firstInstallment?.interest).toBe(833.33);
  expect(firstInstallment?.balance).toBe(99868.31);

  expect(lastInstallment?.number).toBe(240);
  expect(lastInstallment?.amount).toBe(965.02);
  expect(lastInstallment?.amortization).toBe(957.03);
  expect(lastInstallment?.interest).toBe(7.99);
  expect(lastInstallment?.balance).toBe(0);
});
