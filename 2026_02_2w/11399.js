const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const [_, input] = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);

const times = input.split(" ").map(Number);
times.sort((a, b) => a - b);

const sum_arr = Array(times.length + 1).fill(0);

for (let i = 0; i < times.length; i++) {
  sum_arr[i + 1] = sum_arr[i] + times[i];
}

console.log(sum_arr.reduce((acc, cur) => (acc += cur), 0));
