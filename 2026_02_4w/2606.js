const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const inputs = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);

const n = Number(inputs[0]);
const graph = [...Array(n + 1)].map(() => []);
const visited = Array(n + 1).fill(false);

for (const line of inputs.slice(2)) {
  const [v1, v2] = line.split(" ").map(Number);
  graph[v1].push(v2);
  graph[v2].push(v1);
}

let count = 0;
function dfs(v) {
  if (!visited[v]) {
    visited[v] = true;
    count++;
    for (const next of graph[v]) dfs(next);
  }
}

dfs(1);

console.log(count - 1);
