const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const [first, ...inputs] = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);

const T = Number(first);
let res = [];
let cursor = 0;

for (let t = 0; t < T; t++) {
  const k = Number(inputs[cursor++]);
  const files = inputs[cursor++].split(" ").map(Number);

  const dp = Array.from({ length: k + 1 }, () => Array(k + 1).fill(0));
  const sum = Array(k + 1).fill(0);

  for (let i = 1; i <= k; i++) {
    sum[i] = sum[i - 1] + files[i - 1];
  }

  for (let len = 2; len <= k; len++) {
    for (let i = 1; i <= k - len + 1; i++) {
      const j = i + len - 1;
      dp[i][j] = Infinity;

      for (let mid = i; mid < j; mid++) {
        const cost = dp[i][mid] + dp[mid + 1][j] + (sum[j] - sum[i - 1]);
        dp[i][j] = Math.min(dp[i][j], cost);
      }
    }
  }

  res.push(dp[1][k]);
}

console.log(res.join("\n"));
