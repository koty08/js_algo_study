const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const inputs = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);

const [[n, k], ...products] = inputs.map((e) => e.split(" ").map(Number));

const dp = Array.from({ length: n + 1 }, () => Array(k + 1).fill(0));

for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= k; j++) {
    let [w, v] = products[i - 1];

    if (j >= w) dp[i][j] = Math.max(dp[i - 1][j - w] + v, dp[i - 1][j]);
    else dp[i][j] = dp[i - 1][j];
  }
}

console.log(dp[n][k]);
