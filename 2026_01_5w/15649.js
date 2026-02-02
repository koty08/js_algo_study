const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const [n, m] = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/)[0].split(" ").map(Number);

let visited = Array(n).fill(false);

const res = [];
const perm = [];

function dfs(depth) {
  if (depth === m) {
    res.push(perm.join(" "));
    return;
  }

  for (let i = 0; i < n; i++) {
    if (visited[i]) continue;
    visited[i] = true;
    perm.push(i + 1);
    dfs(depth + 1);
    perm.pop();
    visited[i] = false;
  }
}

dfs(0);
console.log(res.join("\n"));
