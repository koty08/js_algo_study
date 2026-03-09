const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const [_, nums, last] = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);

const arr = nums.split(" ").map(Number);
const x = Number(last);

arr.sort((a, b) => a - b);

let l = 0;
let r = arr.length - 1;
let res = 0;

while (l < r) {
  const sum = arr[l] + arr[r];

  if (sum > x) r--;
  else if (sum < x) l++;
  else {
    res++;
    l++;
    r--;
  }
}

console.log(res);
