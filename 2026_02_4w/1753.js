const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const [first, second, ...inputs] = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);

class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  push(value) {
    this.heap.push(value);

    let idx = this.size() - 1;
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      if (this.heap[parentIdx] <= this.heap[idx]) break;

      [this.heap[parentIdx], this.heap[idx]] = [this.heap[idx], this.heap[parentIdx]];
      idx = parentIdx;
    }
  }

  pop() {
    let length = this.size();
    if (length === 1) return this.heap.pop();
    if (length === 0) return 0;

    const root = this.heap[0];
    this.heap[0] = this.heap.pop();

    let idx = 0;
    while (true) {
      let lcIdx = 2 * idx + 1;
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

  size() {
    return this.heap.length;
  }
}

const [v, _] = first.split(" ").map(Number);
const start = Number(second);

const graph = Array.from({ length: v + 1 }, () => []);
const dists = Array(v + 1).fill(Infinity);

for (const line of inputs) {
  const [v1, v2, dist] = line.split(" ").map(Number);
  graph[v1].push([dist, v2]);
}

const pq = new PriorityQueue();
pq.push([0, start]);
dists[start] = 0;

while (pq.size()) {
  const [dist, cur] = pq.pop();

  if (dists[cur] < dist) continue;

  for (const [nextDist, next] of graph[cur]) {
    const cost = dist + nextDist;
    if (cost < dists[next]) {
      pq.push([cost, next]);
      dists[next] = cost;
    }
  }
}

const res = [];

for (let i = 1; i <= v; i++) {
  if (dists[i] === Infinity) res.push("INF");
  else res.push(dists[i]);
}

console.log(res.join("\n"));
