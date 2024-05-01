import Database from "bun:sqlite";
import { Grade } from "./Grade";

export interface GradeRepository {
  save(grade: Grade): Promise<void>;
  listByStudentId(studentId: number): Promise<Grade[]>;
}

export class GradeRepositoryDB implements GradeRepository {
  connection: Database;
  constructor() {
    this.connection = new Database("db/main.db");
  }

  async save(grade: Grade): Promise<void> {
    const statement = this.connection.prepare(
      "INSERT INTO grades (student_id, exam, value) VALUES (?, ?, ?)"
    );
    statement.run(grade.studentId, grade.exam, grade.value);
    statement.finalize();
  }

  async listByStudentId(studentId: number): Promise<Grade[]> {
    const statement = this.connection.prepare(
      "SELECT * FROM grades WHERE student_id = ?"
    );
    const grades: {
      student_id: number;
      exam: string;
      value: number;
    }[] = statement.all(studentId) as any;
    statement.finalize();
    return grades.map(
      (grade) => new Grade(grade.student_id, grade.exam, grade.value)
    );
  }
}
