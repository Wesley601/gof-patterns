import Database from "bun:sqlite";
import { User } from "./User";

export interface UserRepository {
  save(user: User): Promise<void>;
  update(user: User): Promise<void>;
  delete(user: User): Promise<void>;
  getById(id: string): Promise<User | null>;
}

export class UserRepositoryDB implements UserRepository {
  connection: Database;

  constructor() {
    this.connection = new Database("db/main.db");
  }

  async save(user: User): Promise<void> {
    const stm = this.connection.prepare(
      "INSERT INTO users (id, email, password, status) VALUES (?, ?, ?, ?)"
    );
    stm.run(user.id, user.email, user.password, user.status);
    stm.finalize();
  }

  async update(user: User): Promise<void> {
    const stm = this.connection.prepare(
      "UPDATE users SET email = ?, password = ?, status = ? WHERE id = ?"
    );
    stm.run(user.email, user.password, user.status, user.id);
    stm.finalize();
  }

  async delete(user: User): Promise<void> {
    const stm = this.connection.prepare("DELETE FROM users WHERE id = ?");
    stm.run(user.id);
    stm.finalize();
  }

  async getById(id: string): Promise<User | null> {
    const stm = this.connection.prepare("SELECT * FROM users WHERE id = ?");
    const user = stm.get(id) as any;
    stm.finalize();
    if (!user) return null;
    return new User(user.id, user.email, user.password, user.status);
  }
}
