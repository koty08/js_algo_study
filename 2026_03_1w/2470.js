const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const [_, nums] = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);

const arr = nums.split(" ").map(Number);

arr.sort((a, b) => a - b);

let l = 0;
let r = arr.length - 1;
let min = Infinity;
let res = [];

while (l < r) {
  const sum = arr[l] + arr[r];
  const absSum = Math.abs(sum);

  if (absSum < min) {
    min = absSum;
    res = [arr[l], arr[r]];
  }

  if (sum < 0) l++;
  else r--;
}

console.log(res.join(" "));
