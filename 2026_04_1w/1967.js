const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const [first, ...inputs] = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);

const n = Number(first);
const visited = Array(n + 1).fill(false);
const adj = Array.from({ length: n + 1 }, () => []);

for (const line of inputs) {
  const [a, b, dist] = line.split(" ").map(Number);
  adj[a].push([b, dist]);
  adj[b].push([a, dist]);
}

let maxNode = 0;
let maxDist = 0;

function dfs(v, dist) {
  visited[v] = true;

  if (maxDist < dist) {
    maxDist = dist;
    maxNode = v;
  }

  for (const [next, nextDist] of adj[v]) {
    if (!visited[next]) dfs(next, dist + nextDist);
  }
}

dfs(1, 0);
visited.fill(false);
dfs(maxNode, 0);
console.log(maxDist);
