const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const [first, ...inputs] = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);

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

const [n, _] = first.split(" ").map(Number);
const graph = Array.from({ length: n + 1 }, () => []);
const indegree = Array(n + 1).fill(0);

for (const input of inputs) {
  const [from, to] = input.split(" ").map(Number);
  graph[from].push(to);
  indegree[to]++;
}

const res = [];
const queue = new Queue();

for (let i = 1; i <= n; i++) {
  if (!indegree[i]) queue.enqueue(i);
}

while (queue.size) {
  const cur = queue.dequeue();
  res.push(cur);

  for (const next of graph[cur]) {
    indegree[next] -= 1;
    if (!indegree[next]) queue.enqueue(next);
  }
}

console.log(res.join(" "));
