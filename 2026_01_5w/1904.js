const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const n = Number(fs.readFileSync(filePath, "utf-8").toString().trim());

const dp = Array(n + 1).fill(0);

dp[1] = 1;
dp[2] = 2;
dp[3] = 3;

for (let i = 4; i <= n; i++) {
  dp[i] = (dp[i - 1] + dp[i - 2]) % 15746;
}

console.log(dp[n]);
