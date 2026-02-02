const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const sudoku = fs
  .readFileSync(filePath, "utf-8")
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((e) => e.split(" ").map(Number));

const zeros = [];

function findZero() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (sudoku[i][j] === 0) zeros.push([i, j]);
    }
  }
}

function check(x, y, val) {
  for (let i = 0; i < 9; i++) {
    if (sudoku[x][i] === val) return false;
  }

  for (let i = 0; i < 9; i++) {
    if (sudoku[i][y] === val) return false;
  }

  let x3 = Math.floor(x / 3) * 3;
  let y3 = Math.floor(y / 3) * 3;
  for (let i = x3; i < x3 + 3; i++) {
    for (let j = y3; j < y3 + 3; j++) {
      if (sudoku[i][j] === val) return false;
    }
  }

  return true;
}

function dfs(depth) {
  if (depth === zeros.length) {
    console.log(sudoku.map((row) => row.join(" ")).join("\n"));
    process.exit();
  }

  let [x, y] = zeros[depth];

  for (let val = 1; val <= 9; val++) {
    if (check(x, y, val)) {
      sudoku[x][y] = val;
      dfs(depth + 1);
      sudoku[x][y] = 0;
    }
  }
}

findZero();
dfs(0);
