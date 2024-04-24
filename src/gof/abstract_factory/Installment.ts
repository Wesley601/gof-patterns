export class Installment {
  constructor(
    readonly loanId: string, // identificador do financiamento
    readonly number: number, // número da parcela
    readonly amount: number, // valor da parcela
    readonly amortization: number, // amortização
    readonly interest: number, // juros
    readonly balance: number // saldo devedor
  ) {}
}
