import { test, expect, beforeEach } from "bun:test";
import { Ride } from "./Ride";
import {
  NormalFareCalculator,
  OvernightFareCalculator,
  SundayFareCalculator,
  SundayOvernightFareCalculator,
  type FareCalculator,
} from "./FareCalculator";

let fareCalculator: FareCalculator;

beforeEach(() => {
  fareCalculator = new NormalFareCalculator(
    new OvernightFareCalculator(
      new SundayFareCalculator(new SundayOvernightFareCalculator())
    )
  );
});

test("deve calcular o valor da corrida em horário comercial", () => {
  const ride = new Ride(fareCalculator);
  ride.addSegment(10, new Date("2021-03-01T10:00:00"));

  ride.calculateFare();
  expect(ride.fare).toBe(21);
});

test("deve calcular o valor da corrida em horário comercial em um domingo", () => {
  const ride = new Ride(fareCalculator);
  ride.addSegment(10, new Date("2021-03-07T10:00:00"));

  ride.calculateFare();
  expect(ride.fare).toBe(29);
});

test("deve calcular o valor da corrida fora do horário comercial", () => {
  const ride = new Ride(fareCalculator);
  ride.addSegment(10, new Date("2021-03-01T22:00:00"));

  ride.calculateFare();
  expect(ride.fare).toBe(39);
});

test("deve calcular o valor da corrida fora do horário comercial em um domingo", () => {
  const ride = new Ride(fareCalculator);
  ride.addSegment(10, new Date("2021-03-07T22:00:00"));

  ride.calculateFare();
  expect(ride.fare).toBe(50);
});

test("deve calcular o valor da corrida em horário comercial com valor mínimo", () => {
  const ride = new Ride(fareCalculator);
  ride.addSegment(1, new Date("2021-03-01T10:00:00"));

  ride.calculateFare();
  expect(ride.fare).toBe(10);
});

test("deve validar se a data é invalida", () => {
  const ride = new Ride(fareCalculator);
  expect(() => ride.addSegment(10, new Date("invalid date"))).toThrow(
    new Error("Invalid date")
  );
});

test("deve validar se a distância é invalida", () => {
  const ride = new Ride(fareCalculator);
  expect(() => ride.addSegment(-10, new Date())).toThrow(
    new Error("Invalid distance")
  );
});
