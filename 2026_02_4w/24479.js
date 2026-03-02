const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const [first, ...inputs] = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);

const [n, m, r] = first.split(" ").map(Number);
const graph = [...Array(n + 1)].map(() => []);
const visited = Array(n + 1).fill(0);

for (const line of inputs) {
  const [v1, v2] = line.split(" ").map(Number);
  graph[v1].push(v2);
  graph[v2].push(v1);
}

graph.map((g) => g.sort((a, b) => a - b));

let cnt = 1;
function dfs(v) {
  if (!visited[v]) {
    visited[v] = cnt++;
    for (const next of graph[v]) dfs(next);
  }
}

dfs(r);

console.log(visited.slice(1).join("\n"));
