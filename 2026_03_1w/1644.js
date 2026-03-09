const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const n = Number(fs.readFileSync(filePath, "utf-8").toString().trim());

const isPrime = Array(n + 1).fill(true);
isPrime[0] = isPrime[1] = false;
for (let i = 2; i * i <= n; i++) {
  if (isPrime[i]) {
    for (let j = i * i; j <= n; j += i) {
      isPrime[j] = false;
    }
  }
}

const primes = [];
for (let i = 2; i <= n; i++) {
  if (isPrime[i]) primes.push(i);
}

let res = 0;
let sum = 0;
let l = 0;

for (let r = 0; r < primes.length; r++) {
  sum += primes[r];

  while (sum >= n) {
    if (sum === n) {
      res++;
    }
    sum -= primes[l++];
  }
}

console.log(res);
