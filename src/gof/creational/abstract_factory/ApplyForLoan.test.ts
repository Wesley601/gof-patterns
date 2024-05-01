import { expect, test } from "bun:test";
import { ApplyForLoan } from "./ApplyForLoan";
import { GetLoan } from "./GetLoan";
import { RepositoryFactoryInMemory } from "./RepositoryFactory";
import { MortgageLoanFactory } from "./LoanFactory";

test("Deve solicitar um financiamento imobiliário", async function () {
  const repositoryFactory = new RepositoryFactoryInMemory();
  const loanFactory = new MortgageLoanFactory();
  const applyForLoan = new ApplyForLoan(repositoryFactory, loanFactory);
  const input = {
    amount: 100_000,
    income: 10_000,
    installments: 240,
  };
  const output = await applyForLoan.execute(input);
  const getLoan = new GetLoan(repositoryFactory);
  const loan = await getLoan.execute({
    loanId: output.loanId,
  });

  expect(loan?.amount).toBe(100_000);
  expect(loan?.income).toBe(10_000);

  const installments = loan.installments;
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
