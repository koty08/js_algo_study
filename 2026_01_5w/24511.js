const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const input = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);

const A = input[1].split(" ").map(Number);
const B = input[2].split(" ").map(Number);
const M = input[4].split(" ").map(Number);

const res = [];

for (let i = B.length - 1; i >= 0; i--) {
  if (A[i] === 0 && res.length < M.length) res.push(B[i]);
}

let m_idx = 0;
for (let i = res.length; i < M.length; i++) {
  res.push(M[m_idx++]);
}

console.log(res.join(" "));
