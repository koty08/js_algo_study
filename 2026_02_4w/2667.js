const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const [first, ...inputs] = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);

const n = Number(first);
const map = inputs.map((e) => e.split("").map(Number));
const visited = Array.from({ length: n }, () => Array(n).fill(false));

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

let cnt = 0;
const res = [];

function dfs(x, y) {
  if (map[x][y] && !visited[x][y]) {
    visited[x][y] = true;
    cnt++;

    for (let i = 0; i < 4; i++) {
      const [nextX, nextY] = [x + dx[i], y + dy[i]];
      if (nextX >= 0 && nextY >= 0 && nextX < n && nextY < n) {
        dfs(nextX, nextY);
      }
    }
  }
}

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (map[i][j] && !visited[i][j]) {
      dfs(i, j);
      res.push(cnt);
      cnt = 0;
    }
  }
}

res.sort((a, b) => a - b);
console.log([res.length, ...res].join("\n"));
