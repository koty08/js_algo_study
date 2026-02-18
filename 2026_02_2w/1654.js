const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const [first, ...inputs] = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);

const [_, n] = first.split(" ").map(Number);
const cables = inputs.map(Number);

let low = 1;
let high = Math.max(...cables);

while (low <= high) {
  const mid = Math.floor((low + high) / 2);

  const cableCnt = cables.reduce((acc, cur) => (acc += Math.floor(cur / mid)), 0);

  if (cableCnt >= n) {
    low = mid + 1;
  } else high = mid - 1;
}

console.log(high);
