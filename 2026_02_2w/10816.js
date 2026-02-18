const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const [_, arr, __, targets] = fs
  .readFileSync(filePath, "utf-8")
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((e) => e.split(" ").map(Number));

arr.sort((a, b) => a - b);

function upperBound(target) {
  let idx = -1;
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    if (arr[mid] === target) {
      idx = mid;
      low = mid + 1;
    } else if (arr[mid] > target) high = mid - 1;
    else low = mid + 1;
  }

  return idx;
}

function lowerBound(target) {
  let idx = -1;
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    if (arr[mid] === target) {
      idx = mid;
      high = mid - 1;
    } else if (arr[mid] > target) high = mid - 1;
    else low = mid + 1;
  }

  return idx;
}

const res = [];

for (let t of targets) {
  const upperIdx = upperBound(t);
  const lowerIdx = lowerBound(t);

  if (upperIdx !== -1 && lowerIdx !== -1) res.push(upperIdx - lowerIdx + 1);
  else res.push(0);
}

console.log(res.join("\n"));
