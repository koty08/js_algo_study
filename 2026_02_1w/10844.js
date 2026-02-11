const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const n = Number(fs.readFileSync(filePath, "utf-8").toString().trim());

const dp = Array.from({ length: n + 1 }, () => Array(10));

dp[1] = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1];

for (let i = 2; i <= n; i++) {
  for (let j = 0; j < 10; j++) {
    dp[i][j] = (dp[i - 1][j - 1] ?? 0) + ((dp[i - 1][j + 1] ?? 0) % 1000000000);
  }
}

const res = dp[n].reduce((acc, p) => (acc + p) % 1000000000, 0);

console.log(res);
