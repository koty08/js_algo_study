const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const inputs = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);

const n = Number(inputs[0]);
const dp = inputs.slice(1).map((c) => c.split(" ").map(Number));

for (let i = 1; i < n; i++) {
  for (let j = 0; j < dp[i].length; j++) {
    dp[i][j] = dp[i][j] + Math.max(dp[i - 1][j - 1] ?? 0, dp[i - 1][j] ?? 0);
  }
}

console.log(Math.max(...dp[n - 1]));
