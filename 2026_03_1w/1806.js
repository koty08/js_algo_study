const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const [first, nums] = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);

const [n, s] = first.split(" ").map(Number);
const arr = nums.split(" ").map(Number);

let sum = 0;
let l = 0;
let res = Infinity;

for (let r = 0; r < n; r++) {
  sum += arr[r];

  let found = false;
  while (sum >= s) {
    found = true;
    sum -= arr[l++];
  }

  if (found) res = Math.min(res, r - l + 2);
}

console.log(res === Infinity ? 0 : res);
