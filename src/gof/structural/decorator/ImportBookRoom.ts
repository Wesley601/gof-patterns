import { UseCase } from "./UseCase";

export class ImportBookRoom implements UseCase<string> {
  constructor(readonly useCase: UseCase) {}

  async execute(input: string) {
    const lines = input.split("\n");
    const codes: string[] = [];

    for (const line of lines.slice(1)) {
      const [email, checkin, checkout, category] = line.split(";");
      const { code } = await this.useCase.execute({
        email,
        checkin: new Date(checkin),
        checkout: new Date(checkout),
        category,
      });
      codes.push(code);
    }

    return {
      codes,
    };
  }
}
