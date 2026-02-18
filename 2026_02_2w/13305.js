const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const [_, dist, prices] = fs
  .readFileSync(filePath, "utf-8")
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((e) => e.split(" ").map((e) => BigInt(e)));

let res = 0n;
let cur_price = prices[0];

for (let i = 0; i < dist.length; i++) {
  res += cur_price * dist[i];
  if (cur_price > prices[i + 1]) cur_price = prices[i + 1];
}

console.log(`${res}`);
