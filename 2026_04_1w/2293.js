const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const [first, ...inputs] = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);

const [n, k] = first.split(" ").map(Number);
const coins = inputs.map(Number);
const dp = Array(k + 1).fill(0);
dp[0] = 1;

for (let i = 0; i < n; i++) {
  for (let j = coins[i]; j <= k; j++) {
    dp[j] += dp[j - coins[i]];
  }
}

console.log(dp[k]);
