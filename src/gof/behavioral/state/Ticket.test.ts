import { expect, test } from "bun:test";
import { Ticket } from "./Ticket";

const testDate = (hour = "08:00:00") => new Date(`2021-03-01T${hour}`);

test("Deve realizar transições de estado em um chamado", function () {
  const customerId = 1;
  const ticket = new Ticket(customerId, testDate());
  expect(ticket.getStatus()).toBe("requested");
  expect(ticket.getStatistics(testDate("09:00:00")).requestDuration).toBe(1);
  const employeeId = 2;
  ticket.assign(employeeId, testDate("10:00:00"));
  expect(ticket.getStatistics(testDate("11:00:00")).assignDuration).toBe(1);
  expect(ticket.getStatus()).toBe("assigned");
  ticket.start(testDate("14 :00:00"));
  expect(ticket.getStatus()).toBe("in_progress");
  ticket.close(testDate("16:00:00"));
  expect(ticket.getStatus()).toBe("closed");
});
