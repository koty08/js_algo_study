const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const input = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);

const [n, k] = input[0].split(" ").map(Number);
const matrix = input.slice(1).map((e) => e.split(" ").map((v) => Number(v) % 1000));

function matrixMult(a, b) {
  const res = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      for (let r = 0; r < n; r++) {
        res[i][j] = (res[i][j] + a[i][r] * b[r][j]) % 1000;
      }
    }
  }
  return res;
}

function divide(power) {
  if (power === 1) return matrix;

  const half = divide(Math.floor(power / 2));

  let res = matrixMult(half, half);
  if (power % 2) res = matrixMult(res, matrix);

  return res;
}

console.log(
  divide(k)
    .map((e) => e.join(" "))
    .join("\n"),
);
