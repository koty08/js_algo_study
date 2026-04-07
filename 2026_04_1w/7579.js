const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const [[n, m], memorys, costs] = fs
  .readFileSync(filePath, "utf-8")
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((e) => e.split(" ").map(Number));

const allCosts = costs.reduce((pre, cur) => pre + cur);
const dp = Array(allCosts + 1).fill(0);

for (let a = 0; a < n; a++) {
  const memory = memorys[a];
  const cost = costs[a];

  for (let i = allCosts; i >= cost; i--) {
    dp[i] = Math.max(dp[i], dp[i - cost] + memory);
  }
}

console.log(dp.findIndex((it) => it >= m));
