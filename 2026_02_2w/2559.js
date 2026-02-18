const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const [[n, k], arr] = fs
  .readFileSync(filePath, "utf-8")
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((e) => e.split(" ").map(Number));

const sum_arr = new Array(n + 1).fill(0);

for (let i = 0; i < n; i++) {
  sum_arr[i + 1] = sum_arr[i] + arr[i];
}

const cont_arr = [];

for (let i = 0; i < n - k + 1; i++) {
  cont_arr.push(sum_arr[i + k] - sum_arr[i]);
}

console.log(Math.max(...cont_arr));
