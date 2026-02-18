const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const [[n, m], nums] = fs
  .readFileSync(filePath, "utf-8")
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((e) => e.split(" ").map(Number));

const mod_arr = Array(n).fill(0);

for (let i = 0; i < n; i++) {
  mod_arr[i + 1] = (mod_arr[i] + nums[i]) % m;
}

mod_arr.shift();

function nCr(n, r) {
  if (r > n) return 0;
  if (r === n) return 1;
  if (r > n / 2) r = n - r;

  let numer = 1;
  for (let i = 0; i < r; i++) {
    numer *= n - i;
  }

  let denom = 1;
  for (let i = 1; i <= r; i++) {
    denom *= i;
  }

  return Math.round(numer / denom);
}

const mod_count = Array(m).fill(0);

for (let i = 0; i < n; i++) {
  mod_count[mod_arr[i]]++;
}

let res = 0;
res += mod_count[0];

for (let count of mod_count) {
  res += nCr(count, 2);
}

console.log(res);
