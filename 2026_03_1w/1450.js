const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const [[n, c], arr] = fs
  .readFileSync(filePath, "utf-8")
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((e) => e.split(" ").map(Number));

function getSums(arr, index, currentSum, result) {
  if (currentSum > c) return;

  if (index === arr.length) {
    result.push(currentSum);
    return;
  }
  getSums(arr, index + 1, currentSum, result);
  getSums(arr, index + 1, currentSum + arr[index], result);
}

const half = Math.floor(n / 2);
const group1 = arr.slice(0, half);
const group2 = arr.slice(half);

const sumA = [];
const sumB = [];

getSums(group1, 0, 0, sumA);
getSums(group2, 0, 0, sumB);

sumA.sort((a, b) => a - b);
sumB.sort((a, b) => a - b);

let l = 0;
let r = sumB.length - 1;
let res = 0;

while (l < sumA.length && r >= 0) {
  if (sumA[l] + sumB[r] <= c) {
    res += r + 1;
    l++;
  } else {
    r--;
  }
}

console.log(res);
