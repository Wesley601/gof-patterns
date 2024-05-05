export class Coord {
  constructor(
    readonly lat: number,
    readonly long: number,
  ) {
    if (lat < -90 || long > 90) throw new Error("invalid latitude");
    if (lat < -180 || long > 180) throw new Error("invalid longitude");
  }
}
