import { test, expect } from "bun:test";
import { calculateFare } from "./calculateRide";

test("deve calcular o valor da corrida em horário comercial", () => {
  const segments = [{ distance: 10, date: new Date("2021-03-01T10:00:00") }];

  const fare = calculateFare(segments);
  expect(fare).toBe(21);
});

test("deve calcular o valor da corrida em horário noturno", () => {
  const segments = [{ distance: 10, date: new Date("2021-03-01T23:00:00") }];

  const fare = calculateFare(segments);
  expect(fare).toBe(39);
});

test("deve calcular o valor da corrida em horário de domingo", () => {
  const segments = [{ distance: 10, date: new Date("2021-03-07T10:00:00") }];

  const fare = calculateFare(segments);
  expect(fare).toBe(29);
});

test("deve calcular o valor da corrida em horário de domingo a noite", () => {
  const segments = [{ distance: 10, date: new Date("2021-03-07T23:00:00") }];

  const fare = calculateFare(segments);
  expect(fare).toBe(50);
});

test("não deve calcular o valor da corrida se a distancia for invalida", () => {
  const segments = [{ distance: null, date: new Date("2021-03-07T23:00:00") }];

  expect(() => calculateFare(segments)).toThrowError("Invalid distance");
});

test("não deve calcular o valor da corrida se a data for invalida", () => {
  const segments = [{ distance: 10, date: new Date("invalid format") }];

  expect(() => calculateFare(segments)).toThrowError("Invalid date");
});

test("o valor minimo da tarifa deve ser 10", () => {
  const segments = [{ distance: 1, date: new Date("2021-03-05T10:00:00") }];

  const fare = calculateFare(segments);
  expect(fare).toBe(10);
});
