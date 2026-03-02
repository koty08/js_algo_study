const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const [first, ...inputs] = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);

const [n, m, start] = first.split(" ").map(Number);
const graph = [...Array(n + 1)].map(() => []);

for (const line of inputs) {
  const [v1, v2] = line.split(" ").map(Number);
  graph[v1].push(v2);
  graph[v2].push(v1);
}

graph.map((g) => g.sort((a, b) => a - b));

let res = [];

let visited = Array(n + 1).fill(false);
const res_dfs = [];

function dfs(v) {
  if (!visited[v]) {
    visited[v] = true;
    res_dfs.push(v);
    for (const next of graph[v]) dfs(next);
  }
}
dfs(start);
res.push(res_dfs);

visited = Array(n + 1).fill(false);
const res_bfs = [];

function bfs() {
  class Queue {
    constructor() {
      this.q = [];
      this.l = 0;
      this.r = 0;
    }

    enqueue(v) {
      this.q[this.r++] = v;
    }

    dequeue() {
      const ret = this.q[this.l];
      delete this.q[this.l++];
      return ret;
    }

    get size() {
      return this.r - this.l;
    }
  }

  const queue = new Queue();
  queue.enqueue(start);
  visited[start] = true;

  while (queue.size) {
    const cur = queue.dequeue();
    res_bfs.push(cur);

    for (const next of graph[cur]) {
      if (!visited[next]) {
        queue.enqueue(next);
        visited[next] = true;
      }
    }
  }
}

bfs();
res.push(res_bfs);

console.log(res.map((e) => e.join(" ")).join("\n"));
