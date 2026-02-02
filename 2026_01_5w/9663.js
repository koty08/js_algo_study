const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const n = Number(fs.readFileSync(filePath, "utf-8").toString().trim());

const occupiedColumns = Array(n).fill(0);
let res = 0;

function check(depth) {
  for (let i = 0; i < depth; i++) {
    if (occupiedColumns[depth] === occupiedColumns[i]) return false;
    if (Math.abs(occupiedColumns[depth] - occupiedColumns[i]) === depth - i) return false;
  }
  return true;
}

function dfs(depth) {
  if (depth === n) {
    res++;
    return;
  }

  for (let i = 0; i < n; i++) {
    if (occupiedColumns[depth]) continue;
    occupiedColumns[depth] = i;
    if (check(depth)) dfs(depth + 1);
    occupiedColumns[depth] = 0;
  }
}

dfs(0);
console.log(res);
