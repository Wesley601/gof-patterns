import { Booking } from "./Booking";
import { BookingRepository } from "./BookingRepository";
import { RoomRepository } from "./RoomRepository";
import { UseCase } from "./UseCase";

export class BookRoom implements UseCase<Input> {
  constructor(
    readonly roomRepository: RoomRepository,
    readonly bookingRepository: BookingRepository
  ) {}

  async execute(input: Input) {
    const [availableRoom] = await this.roomRepository.getAvailableRoomsByPeriod(
      input.checkin,
      input.checkout,
      input.category
    );
    if (!availableRoom) throw new Error("Room not available");
    const booking = Booking.create(
      input.email,
      availableRoom,
      input.checkin,
      input.checkout
    );
    await this.bookingRepository.save(booking);
    return {
      code: booking.code,
    };
  }
}

type Input = {
  email: string;
  checkout: Date;
  checkin: Date;
  category?: string;
};
