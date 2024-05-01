import { Grade } from "./Grade";
import { GradeRepository } from "./GradeRepository";
import { Mediator } from "./Mediator";

export class SaveGrade {
  constructor(
    private readonly gradeRepository: GradeRepository,
    private readonly mediator: Mediator
  ) {}

  async execute(request: Input): Promise<void> {
    const grade = new Grade(request.studentId, request.exam, request.value);
    await this.gradeRepository.save(grade);
    await this.mediator.notify("gradeSaved", grade);
  }
}

export type Input = {
  studentId: number;
  exam: string;
  value: number;
};
