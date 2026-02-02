const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const inputs = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);

const n = Number(inputs[0]);
const arr = inputs[1].split(" ").map(Number);

const dp = Array(n).fill(0);
dp[0] = arr[0];

for (let i = 1; i < n; i++) {
  dp[i] = Math.max(dp[i - 1] + arr[i], arr[i]);
}

console.log(Math.max(...dp));
