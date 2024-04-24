import { InstallmentRepository } from "./InstallmentRepository";
import { LoanRepository } from "./LoanRepository";
import RepositoryFactory from "./RepositoryFactory";

export class GetLoan {
  readonly loanRepository: LoanRepository;
  readonly installmentRepository: InstallmentRepository;

  constructor(readonly repositoryFactory: RepositoryFactory) {
    this.loanRepository = repositoryFactory.createLoanRepository();
    this.installmentRepository =
      repositoryFactory.createInstallmentRepository();
  }

  async execute(input: Input): Promise<Output> {
    const loan = await this.loanRepository.getById(input.loanId);
    const installments = await this.installmentRepository.listByLoanId(
      input.loanId
    );

    return {
      amount: loan.amount,
      income: loan.income,
      installments: installments.map((i) => ({
        number: i.number,
        amount: i.amount,
        amortization: i.amortization,
        interest: i.interest,
        balance: i.balance,
      })),
    };
  }
}

type Input = {
  loanId: string;
};

type Output = {
  amount: number;
  income: number;
  installments: {
    number: number;
    amount: number;
    amortization: number;
    interest: number;
    balance: number;
  }[];
};
