import { Coord } from "./Coord";

export class Location {
  coord: Coord;

  constructor(
    lat: number,
    long: number,
    readonly date: Date,
  ) {
    this.coord = new Coord(lat, long);
  }

  getTime() {
    return this.date.getTime();
  }
}
