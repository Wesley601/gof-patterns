import { Room } from "./Room";
import { randomUUID } from "crypto";

export class Booking {
  constructor(
    readonly code: string,
    readonly roomId: number,
    readonly email: string,
    readonly checkin: Date,
    readonly checkout: Date,
    readonly duration: number,
    readonly price: number,
    private _status: string
  ) {}

  static create(email: string, room: Room, checkin: Date, checkout: Date) {
    const code = randomUUID();
    const duration =
      (checkout.getTime() - checkin.getTime()) / (1000 * 60 * 60 * 24);
    const price = duration * room.price;
    return new Booking(
      code,
      room.roomId,
      email,
      checkin,
      checkout,
      duration,
      price,
      "confirmed"
    );
  }

  cancel() {
    this._status = "cancelled";
  }

  get status() {
    return this._status;
  }
}
