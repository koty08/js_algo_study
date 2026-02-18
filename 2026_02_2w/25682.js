const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const [first, ...boards] = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);

const [m, n, k] = first.split(" ").map(Number);

const diff = Array.from({ length: m }, () => Array(n).fill(0));

for (let i = 0; i < m; i++) {
  for (let j = 0; j < n; j++) {
    const expectedColor = (i + j) % 2 === 0 ? "W" : "B";
    diff[i][j] = boards[i][j] === expectedColor ? 0 : 1;
  }
}

const sum_arr = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

for (let i = 1; i <= m; i++) {
  for (let j = 1; j <= n; j++) {
    sum_arr[i][j] = diff[i - 1][j - 1] + sum_arr[i - 1][j] + sum_arr[i][j - 1] - sum_arr[i - 1][j - 1];
  }
}

let res = k * k;

for (let i = k; i <= m; i++) {
  for (let j = k; j <= n; j++) {
    const cur_sum = sum_arr[i][j] - sum_arr[i - k][j] - sum_arr[i][j - k] + sum_arr[i - k][j - k];
    res = Math.min(res, cur_sum, k * k - cur_sum);
  }
}

console.log(res);
