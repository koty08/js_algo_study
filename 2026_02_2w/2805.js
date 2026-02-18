const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const [[_, m], trees] = fs
  .readFileSync(filePath, "utf-8")
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((e) => e.split(" ").map(Number));

let low = 0;
let high = Math.max(...trees);

while (low <= high) {
  const mid = Math.floor((low + high) / 2);

  const len = trees.reduce((acc, cur) => (acc += mid < cur ? cur - mid : 0), 0);

  if (len >= m) {
    low = mid + 1;
  } else high = mid - 1;
}

console.log(high);
