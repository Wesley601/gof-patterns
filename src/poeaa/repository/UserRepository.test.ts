import { afterEach, expect, test } from "bun:test";
import { User } from "../User";
import { UserRepositoryDB } from "./UserRepository";

afterEach(() => {
  new UserRepositoryDB().connection.exec("DELETE FROM users");
});

test("Deve criar um usuário", async () => {
  const user = new User("test", "joth@email.com", "123asdadcas");
  const userRepository = new UserRepositoryDB();
  await userRepository.save(user);
  const userSaved = await userRepository.getById(user.id);
  expect(userSaved?.id).toBe(user.id);
  expect(userSaved?.email).toBe(user.email);
  expect(userSaved?.password).toBe(user.password);
  expect(userSaved?.status).toBe(user.status);
});

test("Deve atualizar um usuário", async () => {
  const user = new User("test", "joth@email.com", "123asdadcas");
  const userRepository = new UserRepositoryDB();
  await userRepository.save(user);
  user.changeEmail("john@email.com");
  await userRepository.update(user);
  const userSaved = await userRepository.getById(user.id);
  expect(userSaved?.email).toBe("john@email.com");
});

test("deve deletar um usuário", async () => {
  const user = new User("test", "joth@email.com", "123asdadcas");
  const userRepository = new UserRepositoryDB();
  await userRepository.save(user);

  await userRepository.delete(user);
  const userSaved = await userRepository.getById(user.id);
  expect(userSaved).toBeNull();
});
