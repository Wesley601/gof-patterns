import Database from "bun:sqlite";
import { Average } from "./Average";

export interface AverageRepository {
  getByStudentId(studentId: number): Promise<Average>;
  save(average: Average): Promise<void>;
}

export class AverageRepositoryDB implements AverageRepository {
  connection: Database;
  constructor() {
    this.connection = new Database("db/main.db");
  }

  async save(average: Average): Promise<void> {
    const statement = this.connection.prepare(
      "INSERT INTO average (student_id, value) VALUES (?, ?) ON CONFLICT (student_id) DO UPDATE SET value = excluded.value"
    );
    statement.run(average.studentId, average.value);
    statement.finalize();
  }

  async getByStudentId(studentId: number): Promise<Average> {
    const statement = this.connection.prepare(
      "SELECT * FROM average WHERE student_id = ?"
    );
    const average = statement.get(studentId) as any;
    statement.finalize();
    if (!average) throw new Error("Average not found");
    return new Average(average.student_id, average.value);
  }
}
