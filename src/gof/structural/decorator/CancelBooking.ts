import { BookingRepository } from "./BookingRepository";
import { UseCase } from "./UseCase";

export class CancelBooking implements UseCase<Input> {
  constructor(readonly bookingRepository: BookingRepository) {}

  async execute(input: Input) {
    const booking = await this.bookingRepository.getByCode(input.code);
    booking.cancel();
    await this.bookingRepository.update(booking);
  }
}

type Input = {
  code: string;
};
