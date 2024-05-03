import * as fs from "fs";
import { randomInt } from "crypto";

const generateBets = (numEntries: number) => {
  const startDate = new Date("2024-01-01T00:00:00Z");
  let csvContent = "DRAW;DATE;BET1;BET2;BET3;BET4;BET5;BET6\n"; // Header

  const groups = numEntries / 4;

  for (let j = 0; j < 4; j++) {
    const date = new Date(startDate.getTime() + j * 86400000);
    const epochDate = Math.floor(date.getTime() / 1000);
    for (let i = 0; i < groups; i++) {
      const bets = [
        randomInt(1, 61),
        randomInt(1, 61),
        randomInt(1, 61),
        randomInt(1, 61),
        randomInt(1, 61),
        randomInt(1, 61),
      ];

      const row = `${j + 1};${epochDate};${bets.join(";")}\n`;
      csvContent += row;
    }
  }

  fs.writeFile("./data/bets.csv", csvContent, (err) => {
    if (err) {
      console.error("Failed to write CSV file:", err);
    } else {
      console.log("CSV file has been written.");
    }
  });
};

generateBets(100_000);
