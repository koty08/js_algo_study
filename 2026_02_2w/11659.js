const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const [_, ...inputs] = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);

const [nums, ...intervals] = inputs.map((e) => e.split(" ").map(Number));

const sum_arr = new Array(nums.length + 1).fill(0);

for (let i = 0; i < nums.length; i++) {
  sum_arr[i + 1] = sum_arr[i] + nums[i];
}

const res = [];

for (let int of intervals) {
  const [start, end] = int;
  res.push(sum_arr[end] - sum_arr[start - 1]);
}

console.log(res.join("\n"));
