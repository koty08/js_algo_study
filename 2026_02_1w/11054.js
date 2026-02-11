const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const inputs = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);

const n = Number(inputs[0]);
const seq = inputs[1].split(" ").map(Number);

const inc_dp = Array(n).fill(1);

for (let i = 0; i < n; i++) {
  let cnt = 1;
  for (let j = 0; j < i; j++) {
    if (seq[i] > seq[j]) cnt = Math.max(cnt, inc_dp[j] + 1);
  }
  inc_dp[i] = cnt;
}

const dec_dp = Array(n).fill(1);

for (let i = n - 1; i >= 0; i--) {
  let cnt = 1;
  for (let j = i + 1; j < n; j++) {
    if (seq[i] > seq[j]) cnt = Math.max(cnt, dec_dp[j] + 1);
  }
  dec_dp[i] = cnt;
}

const dp = Array(n).fill(0);

for (let i = 0; i < n; i++) {
  dp[i] = inc_dp[i] + dec_dp[i] - 1;
}

console.log(Math.max(...dp));
