import { expect, test } from "bun:test";
import { User } from "../User";

test("Deve criar um usuário", async () => {
  const user = new User("test", "John@Doe.com", "abc123469");
  expect(user.id).toBe("test");
  expect(user.email).toBe("john@doe.com");
  expect(user.password).toBe("abc123469");
  expect(user.status).toBe("active");
});

test("Deve bloquear um usuário", async () => {
  const user = new User("test", "John@Doe.com", "abc123469");
  user.block();
  expect(user.status).toBe("blocked");
});

test("Não deve bloquear um usuário já bloqueado", async () => {
  const user = new User("test", "John@Doe.com", "abc123469");
  user.block();
  expect(() => user.block()).toThrowError("User already blocked");
});

test("Não Deve criar um usuário com email invalido", async () => {
  expect(() => new User("test", "JohnDoe.com", "abc123469")).toThrowError(
    "Email invalid"
  );
});

test("Não deve modificar um usuário com email invalido", async () => {
  const user = new User("test", "John@Doe.com", "abc123469");

  expect(() => user.changeEmail("invalidemail")).toThrowError("Email invalid");
});

test("Deve modificar a senha de um usuário", async () => {
  const user = new User("test", "John@Doe.com", "abc123469");
  user.changePassword("123456789");
  expect(user.password).toBe("123456789");
});

test("não Deve modificar a senha de um usuário se a senha for invalida", async () => {
  const user = new User("test", "John@Doe.com", "abc123469");
  expect(() => user.changePassword("12378")).toThrowError(
    "Password must have at least 8 characters"
  );
});
