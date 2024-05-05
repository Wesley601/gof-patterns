import { Location } from "./Location";
import { RideRepository } from "./RideRepository";
import { Segment } from "./Segment";
import { SegmentRepository } from "./SegmentRepository";

export class UpdateLocation {
  constructor(
    readonly rideRepository: RideRepository,
    readonly segmentRepository: SegmentRepository,
  ) {}

  async execute(input: Input) {
    const ride = await this.rideRepository.getById(input.rideId);
    const location = new Location(input.lat, input.long, input.date);
    const segment = new Segment(ride.rideId, ride.lastLocation, location);
    ride.updateLocation(location);
    await this.rideRepository.update(ride);
    await this.segmentRepository.save(segment);
  }
}

type Input = {
  rideId: string;
  lat: number;
  long: number;
  date: Date;
};
