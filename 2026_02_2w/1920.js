const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const [_, arr, __, targets] = fs
  .readFileSync(filePath, "utf-8")
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((e) => e.split(" ").map(Number));

arr.sort((a, b) => a - b);

function binarySearch(target) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    if (arr[mid] === target) return 1;
    else if (arr[mid] > target) high = mid - 1;
    else low = mid + 1;
  }

  return 0;
}

const res = [];

for (let t of targets) {
  res.push(binarySearch(t));
}

console.log(res.join("\n"));
