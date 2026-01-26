const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const input = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);

const nums = input.slice(1);

const stack = [];

for (let i = 0; i < nums.length; i++) {
  const num = nums[i];
  if (num !== "0") stack.push(num);
  else stack.pop();
}

const res = stack.reduce((p, c) => parseInt(p) + parseInt(c), 0);

console.log(res);
