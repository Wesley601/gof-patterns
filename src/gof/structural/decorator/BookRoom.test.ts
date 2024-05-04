import { afterEach, beforeEach, expect, test } from "bun:test";
import { BookRoom } from "./BookRoom";
import { BookingRepositoryDB } from "./BookingRepository";
import { RoomRepositoryDB } from "./RoomRepository";

const connection = new RoomRepositoryDB().connection;

beforeEach(() => {
  connection.exec(
    `INSERT INTO rooms (category, price, status)
     VALUES
     ('suite', 500, 'available'),
     ('suite', 500, 'available'),
     ('standard', 300, 'available'),
     ('standard', 300, 'maintenance');`
  );
});

afterEach(() => {
  connection.exec("delete from rooms");
  connection.exec("DELETE FROM bookings");
  connection.exec("delete from sqlite_sequence where name='rooms'");
});

test("deve reservar um quarto", async function () {
  const roomRepository = new RoomRepositoryDB();
  const bookingRepository = new BookingRepositoryDB();
  const bookRoom = new BookRoom(roomRepository, bookingRepository);
  const output = await bookRoom.execute({
    email: "john.doe@gmail.com",
    checkin: new Date("2021-03-01T10:00:00"),
    checkout: new Date("2021-03-05T10:00:00"),
    category: "suite",
  });
  const booking = await bookingRepository.getByCode(output.code);
  expect(booking.duration).toBe(4);
  expect(booking.price).toBe(2000);
});

test("deve lançar erro ao tentar reservar um quarto indisponível", async function () {
  connection.exec(
    `INSERT INTO bookings (code, email, room_id, checkin, checkout, duration, price, status)
    VALUES
    ('123', 'seila@mail.com', 1, 1614558000000, 1614730800000, 2, 1000, 'confirmed');`
  );
  connection.exec(
    `INSERT INTO bookings (code, email, room_id, checkin, checkout, duration, price, status)
    VALUES
    ('333', 'seila@mail.com', 2, 1614558000000, 1614730800000, 2, 1000, 'confirmed');`
  );

  const roomRepository = new RoomRepositoryDB();
  const bookingRepository = new BookingRepositoryDB();
  const bookRoom = new BookRoom(roomRepository, bookingRepository);
  expect(() =>
    bookRoom.execute({
      email: "john.doe@gmail.com",
      checkin: new Date("2021-03-01T10:00:00"),
      checkout: new Date("2021-03-02T10:00:00"),
      category: "suite",
    })
  ).toThrowError("Room not available");
});
