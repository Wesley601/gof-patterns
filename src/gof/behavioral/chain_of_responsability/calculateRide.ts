export type Segment = {
  distance: number | null;
  date: Date;
};

export const calculateFare = (segments: Segment[]) => {
  let fare = 0;
  for (const segment of segments) {
    let { distance, date } = segment;
    if (!isValidDistance(distance)) throw new Error("Invalid distance");
    if (!isValidDate(date)) throw new Error("Invalid date");

    distance = distance as number;

    if (isOvernight(date) && !isSunday(date)) {
      fare += distance * 3.9;
    }
    if (isOvernight(date) && isSunday(date)) {
      fare += distance * 5;
    }
    if (!isOvernight(date) && isSunday(date)) {
      fare += distance * 2.9;
    }
    if (!isOvernight(date) && !isSunday(date)) {
      fare += distance * 2.1;
    }
  }

  return fare < 10 ? 10 : fare;
};

const isValidDistance = (distance: number | null): boolean =>
  !!distance && typeof distance === "number" && distance > 0;

const isValidDate = (d: Date) =>
  !!d && d instanceof Date && d.toString() != "Invalid Date";

const isOvernight = (date: Date) =>
  date.getHours() >= 22 || date.getHours() < 6;

const isSunday = (date: Date) => date.getDay() === 0;
