const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const [first, ...inputs] = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);

const n = Number(first);
const visited = Array(n + 1).fill(false);
const adj = Array.from({ length: n + 1 }, () => []);

for (const line of inputs) {
  const [a, b] = line.split(" ").map(Number);
  adj[a].push(b);
  adj[b].push(a);
}

const parents = [];
function dfs(v) {
  visited[1] = true;
  for (const next of adj[v]) {
    if (!visited[next]) {
      visited[next] = true;
      parents[next] = v;
      dfs(next);
    }
  }
}
dfs(1);

console.log(parents.slice(2).join("\n"));
