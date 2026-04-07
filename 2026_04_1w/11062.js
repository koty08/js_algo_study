const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const inputs = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);

let cursor = 0;
const t = Number(inputs[cursor++]);
const res = [];

for (let k = 0; k < t; k++) {
  const n = Number(inputs[cursor++]);
  const cards = inputs[cursor++].split(" ").map(Number);
  const dp = Array.from({ length: n }, () => Array(n).fill(0));
  const prefixSum = Array(n + 1).fill(0);

  for (let i = 0; i < n; i++) {
    prefixSum[i + 1] = prefixSum[i] + cards[i];
  }

  for (let i = 0; i < n; i++) {
    dp[i][i] = cards[i];
  }

  for (let len = 2; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      let j = i + len - 1;

      let totalSum = prefixSum[j + 1] - prefixSum[i];

      dp[i][j] = Math.max(totalSum - dp[i + 1][j], totalSum - dp[i][j - 1]);
    }
  }

  res.push(dp[0][n - 1]);
}

console.log(res.join("\n"));
