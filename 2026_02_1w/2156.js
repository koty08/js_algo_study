const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const [n, ...wines] = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/).map(Number);

const dp = [0, wines[0], wines[0] + wines[1], ...Array(n - 1).fill(0)];

for (let i = 3; i <= n; i++) {
  dp[i] = Math.max(dp[i - 3] + wines[i - 2] + wines[i - 1], dp[i - 2] + wines[i - 1], dp[i - 1]);
}

console.log(dp[n]);
