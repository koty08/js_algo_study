const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const [first, ...inputs] = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);

const t = Number(first);

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

let cursor = 0;
const res = [];

for (let i = 0; i < t; i++) {
  const [m, n, k] = inputs[cursor++].split(" ").map(Number);
  const map = Array.from({ length: m }, () => Array(n).fill(0));
  const visited = Array.from({ length: m }, () => Array(n).fill(false));

  for (let j = 0; j < k; j++) {
    const [x, y] = inputs[cursor++].split(" ").map(Number);
    map[x][y] = 1;
  }

  function dfs(x, y) {
    if (map[x][y] && !visited[x][y]) {
      visited[x][y] = true;

      for (let l = 0; l < 4; l++) {
        const [nextX, nextY] = [x + dx[l], y + dy[l]];
        if (nextX >= 0 && nextY >= 0 && nextX < m && nextY < n) {
          dfs(nextX, nextY);
        }
      }
    }
  }

  let cnt = 0;

  for (let x = 0; x < m; x++) {
    for (let y = 0; y < n; y++) {
      if (map[x][y] && !visited[x][y]) {
        dfs(x, y);
        cnt++;
      }
    }
  }

  res.push(cnt);
}

console.log(res.join("\n"));
