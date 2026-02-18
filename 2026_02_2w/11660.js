const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const [[n, m], ...inputs] = fs
  .readFileSync(filePath, "utf-8")
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((e) => e.split(" ").map(Number));

const table = inputs.slice(0, n);
const questions = inputs.slice(n);

const sum_arr = Array.from({ length: n }, () => Array(n + 1).fill(0));

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    sum_arr[i][j + 1] = sum_arr[i][j] + table[i][j];
  }
}

const res = [];

for (let q of questions) {
  const [x1, y1, x2, y2] = q;
  let q_sum = 0;
  for (let i = x1 - 1; i < x2; i++) {
    q_sum += sum_arr[i][y2] - sum_arr[i][y1 - 1];
  }
  res.push(q_sum);
}

console.log(res.join("\n"));
