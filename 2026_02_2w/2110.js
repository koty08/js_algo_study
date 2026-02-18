const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const [first, ...inputs] = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);

const [_, c] = first.split(" ").map(Number);
const arr = inputs.map(Number);

arr.sort((a, b) => a - b);

let low = 1;
let high = arr[arr.length - 1] - arr[0];

while (low <= high) {
  const mid = Math.floor((low + high) / 2);

  let count = 1;
  let comp = arr[0];
  for (let cur of arr) {
    if (cur - comp < mid) continue;
    comp = cur;
    count++;
  }

  if (count < c) high = mid - 1;
  else low = mid + 1;
}

console.log(high);
