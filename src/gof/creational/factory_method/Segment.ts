import { Location } from "./Location";

export class Segment {
  constructor(
    readonly rideId: string,
    readonly from: Location,
    readonly to: Location,
  ) {}

  getDistance() {
    const earthRadius = 6371;
    const degreesToRadians = Math.PI / 180;
    const deltaLat =
      (this.to.coord.lat - this.from.coord.lat) * degreesToRadians;
    const deltaLong =
      (this.to.coord.long - this.from.coord.long) * degreesToRadians;
    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(this.from.coord.lat * degreesToRadians) *
        Math.sin(deltaLong / 2) *
        Math.sin(deltaLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(earthRadius * c);
  }

  getDiffInMinutes() {
    return (this.to.getTime() - this.from.getTime()) / (1000 * 60);
  }
}
