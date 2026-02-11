const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const inputs = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);

const n = Number(inputs[0]);
const seq = inputs[1].split(" ").map(Number);

const dp = Array(n).fill(1);

for (let i = 0; i < n; i++) {
  let cnt = 1;
  for (let j = 0; j < i; j++) {
    if (seq[i] > seq[j]) cnt = Math.max(cnt, dp[j] + 1);
  }
  dp[i] = cnt;
}

console.log(dp);
