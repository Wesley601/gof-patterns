import Database from "bun:sqlite";
import { Booking } from "./Booking";

export interface BookingRepository {
  save(booking: Booking): Promise<void>;
  update(booking: Booking): Promise<void>;
  getByCode(code: string): Promise<Booking>;
}

export class BookingRepositoryDB implements BookingRepository {
  connection: Database;

  constructor() {
    this.connection = new Database("db/main.db");
  }

  async update(booking: Booking): Promise<void> {
    const stm = this.connection.prepare("UPDATE bookings SET status = ?");
    stm.run(booking.status);
    stm.finalize();
  }

  async save(booking: Booking) {
    const stm = this.connection.prepare(
      `INSERT INTO bookings (code, email, room_id, checkin, checkout, duration, price, status)
      VALUES ($code, $email, $room_id, $checkin, $checkout, $duration, $price, $status);`
    );

    stm.run({
      $code: booking.code,
      $email: booking.email,
      $room_id: booking.roomId,
      $checkin: booking.checkin.getTime(),
      $checkout: booking.checkout.getTime(),
      $duration: booking.duration,
      $price: booking.price,
      $status: booking.status,
    });
    stm.finalize();
  }

  async getByCode(code: string) {
    const stm = this.connection.prepare("SELECT * FROM bookings WHERE code=?");
    const booking = stm.get(code) as any;
    stm.finalize();
    if (!booking) throw new Error("booking not found");
    const b = new Booking(
      code,
      booking.room_id,
      booking.email,
      new Date(booking.checkin),
      new Date(booking.checkout),
      booking.duration,
      booking.price,
      booking.status
    );
    return b;
  }
}
