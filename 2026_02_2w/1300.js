const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const [n, k] = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/).map(Number);

let low = 1;
let high = k;
let res = 0;

while (low <= high) {
  const mid = Math.floor((low + high) / 2);

  let count = 0;
  for (let i = 1; i <= n; i++) {
    count += Math.min(Math.floor(mid / i), n);
  }

  if (count >= k) {
    res = mid;
    high = mid - 1;
  } else low = mid + 1;
}

console.log(res);
