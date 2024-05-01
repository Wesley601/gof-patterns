import type { Segment } from "./Segment";

export interface FareCalculator {
  next?: FareCalculator;
  calculate(segment: Segment): number;
}

export class NormalFareCalculator implements FareCalculator {
  FARE = 2.1;
  constructor(readonly next?: FareCalculator) {}

  calculate(segment: Segment): number {
    if (!segment.isOvernight() && !segment.isSunday())
      return segment.distance * 2.1;
    if (this.next) return this.next.calculate(segment);
    return 0;
  }
}

export class OvernightFareCalculator implements FareCalculator {
  FARE = 3.9;
  constructor(readonly next?: FareCalculator) {}

  calculate(segment: Segment): number {
    if (segment.isOvernight() && !segment.isSunday())
      return segment.distance * 3.9;
    if (this.next) return this.next.calculate(segment);
    return 0;
  }
}

export class SundayFareCalculator implements FareCalculator {
  FARE = 2.9;
  constructor(readonly next?: FareCalculator) {}

  calculate(segment: Segment): number {
    if (!segment.isOvernight() && segment.isSunday())
      return segment.distance * 2.9;
    if (this.next) return this.next.calculate(segment);
    return 0;
  }
}

export class SundayOvernightFareCalculator implements FareCalculator {
  FARE = 5;
  constructor(readonly next?: FareCalculator) {}

  calculate(segment: Segment): number {
    if (segment.isOvernight() && segment.isSunday())
      return segment.distance * 5;
    if (this.next) return this.next.calculate(segment);
    return 0;
  }
}
