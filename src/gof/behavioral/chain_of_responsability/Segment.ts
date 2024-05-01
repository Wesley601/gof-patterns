export class Segment {
  constructor(readonly distance: number, readonly date: Date) {
    if (!this.isValidDistance(this.distance))
      throw new Error("Invalid distance");
    if (!this.isValidDate(this.date)) throw new Error("Invalid date");
  }
  isOvernight = () => this.date.getHours() >= 22 || this.date.getHours() < 6;

  isSunday = () => this.date.getDay() === 0;

  isValidDistance = (distance: number): boolean =>
    !!distance && typeof distance === "number" && distance > 0;

  isValidDate = (d: Date) =>
    !!d && d instanceof Date && d.toString() != "Invalid Date";
}
