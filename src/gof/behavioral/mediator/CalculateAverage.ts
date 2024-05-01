import { Average } from "./Average";
import { AverageRepository } from "./AverageRepository";
import { GradeRepository } from "./GradeRepository";

export class CalculateAverage {
  constructor(
    private readonly gradeRepository: GradeRepository,
    private averageRepository: AverageRepository
  ) {}

  async execute(studentId: number): Promise<void> {
    const grades = await this.gradeRepository.listByStudentId(studentId);
    if (grades.length === 0) throw new Error("Nenhuma nota encontrada");

    const value =
      grades.reduce((acc, grade) => acc + grade.value, 0) / grades.length;

    const average = new Average(studentId, value);
    await this.averageRepository.save(average);
  }
}
