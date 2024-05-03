import fs from "fs";

export class LotteryTicket {
  constructor(
    readonly draw: DrawFlyweight,
    readonly bet1: string,
    readonly bet2: string,
    readonly bet3: string,
    readonly bet4: string,
    readonly bet5: string,
    readonly bet6: string,
  ) {}
}

export class DrawFlyweight {
  constructor(
    readonly draw: string,
    readonly data: Date,
  ) {}
}

export class FlyweightFactory {
  static cache: {
    [index: string]: DrawFlyweight;
  } = {};

  static getDraw(draw: string, date: string) {
    const index = `${draw}:${date}`;
    if (!FlyweightFactory.cache[index]) {
      FlyweightFactory.cache[index] = new DrawFlyweight(draw, new Date(+date));
    }

    return FlyweightFactory.cache[index];
  }
}
const data = fs.readFileSync("./data/bets.csv", "utf8");
const [_, ...lines] = data.split("\n");
const tickets = [];
for (const line of lines) {
  const [draw, date, bet1, bet2, bet3, bet4, bet5, bet6] = line.split(";");
  tickets.push(
    new LotteryTicket(
      FlyweightFactory.getDraw(draw, date),
      bet1,
      bet2,
      bet3,
      bet4,
      bet5,
      bet6,
    ),
  );
}

console.log(FlyweightFactory.cache);
console.log(process.memoryUsage().heapUsed / Math.pow(1024, 2));
