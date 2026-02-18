const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const [first, ...inputs] = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);

let [n, k] = first.split(" ").map(Number);
const coins = inputs.map(Number);

let res = 0;

for (let coin of coins.reverse()) {
  if (k === 0) break;

  res += Math.floor(k / coin);
  k %= coin;
}

console.log(res);
