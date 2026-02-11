const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const inputs = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);

const n = Number(inputs[0]);
const lines = inputs.slice(1).map((l) => l.split(" ").map(Number));

const dp = Array(n).fill(1);

lines.sort((a, b) => a[0] - b[0]);

for (let i = 0; i < n; i++) {
  let cnt = 1;
  for (let j = 0; j < i; j++) {
    if (lines[i][1] > lines[j][1]) cnt = Math.max(cnt, dp[j] + 1);
  }
  dp[i] = cnt;
}

console.log(n - Math.max(...dp));
