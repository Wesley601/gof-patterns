import type { FareCalculator } from "./FareCalculator";
import { Segment } from "./Segment";

export class Ride {
  private _segments: Segment[] = [];
  private _fare: number = 0;

  constructor(readonly fareCalculator: FareCalculator) {}

  addSegment(distance: number, date: Date) {
    this._segments.push(new Segment(distance, date));
  }

  calculateFare() {
    this._fare = 0;
    for (const segment of this._segments) {
      this._fare += this.fareCalculator.calculate(segment);
    }

    this._fare = this._fare < 10 ? 10 : this._fare;
  }

  get fare() {
    return this._fare;
  }
}
