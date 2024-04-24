import { expect, test } from "bun:test";
import { CarLoan, MortgageLoan } from "../../../src/gof/abstract_factory/Loan";

test("Deve criar um financiamento imobiliario", async () => {
  const loan = MortgageLoan.create(100000, 10000, 240);
  expect(loan.id).toBeDefined();
  expect(loan.amount).toBe(100000);
  expect(loan.income).toBe(10000);
  expect(loan.installments).toBe(240);
});
test("Não deve criar um financiamento imobiliario com prazo superior a 420", async () => {
  expect(() => MortgageLoan.create(100000, 10000, 440)).toThrow(
    new Error("The maximum number of installments for mortgage loan is 420")
  );
});
test("Não deve criar um financiamento imobiliario caso a parcela ocupe um valor superior a 25% da renda mensal", async () => {
  expect(() => MortgageLoan.create(200000, 1000, 420)).toThrow(
    new Error("The installment amount could not exceed 25% of monthly income")
  );
});
test("Não deve criar um financiamento de carro com prazo superior a 60", async () => {
  expect(() => CarLoan.create(100000, 10000, 72)).toThrow(
    new Error("The maximum number of installments for car loan is 60")
  );
});
test("Não deve criar um financiamento imobiliario caso a parcela ocupe um valor superior a 30% da renda mensal", async () => {
  expect(() => CarLoan.create(200000, 1000, 60)).toThrow(
    new Error("The installment amount could not exceed 30% of monthly income")
  );
});
