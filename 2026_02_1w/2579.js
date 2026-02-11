const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const inputs = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);

const [n, ...stairs] = inputs.map(Number);

const dp = [stairs[0], stairs[1] + stairs[0], Math.max(stairs[0], stairs[1]) + stairs[2]];

for (let i = 3; i < n; i++) {
  dp[i] = Math.max(dp[i - 3] + stairs[i - 1], dp[i - 2]) + stairs[i];
}

console.log(dp[n - 1]);
