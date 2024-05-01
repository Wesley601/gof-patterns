import { afterEach, expect, test } from "bun:test";
import { CalculateAverage } from "./CalculateAverage";
import { SaveGrade } from "./SaveGrade";
import { GradeRepositoryDB } from "./GradeRepository";
import { AverageRepositoryDB } from "./AverageRepository";
import { Mediator } from "./Mediator";
import { Grade } from "./Grade";

afterEach(() => {
  const { connection } = new GradeRepositoryDB();
  connection.exec("DELETE FROM grades");
  connection.exec("DELETE FROM average");
});

test("Deve salvar a nota do aluno e calcular a media", async () => {
  const studentId = Math.round(Math.random() * 1000);
  const gradeRepository = new GradeRepositoryDB();
  const averageRepository = new AverageRepositoryDB();
  const calculateAverage = new CalculateAverage(
    gradeRepository,
    averageRepository
  );
  const mediator = new Mediator();
  mediator.listen("gradeSaved", (data: Grade) =>
    calculateAverage.execute(data.studentId)
  );
  const saveGrade = new SaveGrade(gradeRepository, mediator);
  await saveGrade.execute({ studentId, exam: "P1", value: 10 });
  await saveGrade.execute({ studentId, exam: "P2", value: 9 });
  await saveGrade.execute({ studentId, exam: "P3", value: 8 });
  const output = await averageRepository.getByStudentId(studentId);
  expect(output.value).toBe(9);
});
