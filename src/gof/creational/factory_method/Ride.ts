import { randomUUID } from "crypto";
import { Location } from "./Location";
import { Segment } from "./Segment";

export abstract class Ride {
  lastLocation: Location;

  constructor(
    readonly rideId: string,
    lat: number,
    long: number,
    date: Date,
  ) {
    this.lastLocation = new Location(lat, long, date);
  }

  updateLocation(l: Location) {
    this.lastLocation = l;
  }

  abstract calculateFare(segments: Segment[]): number;
}

export class DistanceRide extends Ride {
  static PRICE_PER_KM = 4;

  calculateFare(segments: Segment[]) {
    return (
      segments.reduce((acc, s) => acc + s.getDistance(), 0) *
      DistanceRide.PRICE_PER_KM
    );
  }

  static create(lat: number, long: number, date: Date) {
    return new DistanceRide(randomUUID(), lat, long, date);
  }
}

export class TimeRide extends Ride {
  calculateFare(segments: Segment[]) {
    return segments.reduce((acc, s) => acc + s.getDiffInMinutes(), 0);
  }

  static create(lat: number, long: number, date: Date) {
    return new TimeRide(randomUUID(), lat, long, date);
  }
}
