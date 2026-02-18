const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const [_, arr] = fs
  .readFileSync(filePath, "utf-8")
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((e) => e.split(" ").map(Number));

let res = [];

function binarySearch(target) {
  let low = 0;
  let high = res.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    if (res[mid] < target) low = mid + 1;
    else high = mid - 1;
  }

  return low;
}

for (let cur of arr) {
  if (!res.length || res[res.length - 1] < cur) res.push(cur);
  else {
    const idx = binarySearch(cur);
    res[idx] = cur;
  }
}

console.log(res.length);
