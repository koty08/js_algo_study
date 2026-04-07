const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const inputs = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);

const max = 40000;
const weights = inputs[1].split(" ").map(Number);
const marvels = inputs[3].split(" ").map(Number);

const dp = Array(max + 1).fill(false);
dp[0] = true;

for (const weight of weights) {
  const possible = [];
  for (let i = 0; i <= max; i++) {
    if (dp[i]) possible.push(i + weight, Math.abs(i - weight));
  }
  for (const p of possible) {
    if (p >= 1 && p <= max) dp[p] = true;
  }
}

const res = [];
for (const marvel of marvels) {
  res.push(dp[marvel] ? "Y" : "N");
}

console.log(res.join(" "));
