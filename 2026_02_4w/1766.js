const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const [first, ...inputs] = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);

class PriorityQueue {
  constructor() {
    this.heap = [null];
  }

  push(value) {
    this.heap.push(value);

    let idx = this.size;
    while (idx > 1) {
      let parentIdx = Math.floor(idx / 2);
      if (this.heap[parentIdx] <= this.heap[idx]) break;

      [this.heap[parentIdx], this.heap[idx]] = [this.heap[idx], this.heap[parentIdx]];
      idx = parentIdx;
    }
  }

  pop() {
    let length = this.size;
    if (length === 1) return this.heap.pop();
    if (length === 0) return null;

    const root = this.heap[1];
    this.heap[1] = this.heap.pop();

    let idx = 1;
    while (true) {
      let lcIdx = 2 * idx;
      let rcIdx = lcIdx + 1;
      let swap = null;

      if (lcIdx < length) {
        if (this.heap[lcIdx] < this.heap[idx]) swap = lcIdx;
      }

      if (rcIdx < length) {
        if ((swap === null && this.heap[rcIdx] < this.heap[idx]) || (swap !== null && this.heap[rcIdx] < this.heap[lcIdx])) {
          swap = rcIdx;
        }
      }

      if (swap === null) break;
      [this.heap[idx], this.heap[swap]] = [this.heap[swap], this.heap[idx]];
      idx = swap;
    }
    return root;
  }

  get size() {
    return this.heap.length - 1;
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
const pq = new PriorityQueue();

for (let i = 1; i <= n; i++) {
  if (!indegree[i]) pq.push(i);
}

while (pq.size) {
  const cur = pq.pop();
  res.push(cur);

  for (const next of graph[cur]) {
    indegree[next] -= 1;
    if (!indegree[next]) pq.push(next);
  }
}

console.log(res.join(" "));
