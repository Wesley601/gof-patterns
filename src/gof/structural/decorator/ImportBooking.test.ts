import { afterEach, beforeEach, expect, test } from "bun:test";
import { BookingRepositoryDB } from "./BookingRepository";
import { RoomRepositoryDB } from "./RoomRepository";
import { ImportBookRoom } from "./ImportBookRoom";
import { BookRoom } from "./BookRoom";

const connection = new RoomRepositoryDB().connection;

beforeEach(() => {
  connection.exec(
    `INSERT INTO rooms (category, price, status)
     VALUES
     ('suite', 500, 'available'),
     ('suite', 500, 'available'),
     ('standard', 300, 'available'),
     ('standard', 300, 'maintenance'),
     ('suite', 500, 'available'),
     ('suite', 500, 'available'),
     ('suite', 500, 'available');`
  );
});

afterEach(() => {
  connection.exec("delete from rooms");
  connection.exec("DELETE FROM bookings");
  connection.exec("delete from sqlite_sequence where name='rooms'");
});

test("deve importar uma lista de reservas", async function () {
  const roomRepository = new RoomRepositoryDB();
  const bookingRepository = new BookingRepositoryDB();
  const input = `email;checkin;checkout;category;
    john@mail.com;2021-03-01T10:00:00;2021-03-05T10:00:00;suite;
    james@mail.com;2021-03-06T10:00:00;2021-03-11T10:00;suite;
    judy@mail.com;2021-03-11T10:00:00;2021-03-17T10:00;suite;`;
  const importBookRoom = new ImportBookRoom(
    new BookRoom(roomRepository, bookingRepository)
  );
  const output = await importBookRoom.execute(input);

  expect(output.codes).toHaveLength(3);
});
