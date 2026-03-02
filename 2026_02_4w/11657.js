const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const [first, ...inputs] = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);

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

const [n, _] = first.split(" ").map(Number);
const edges = inputs.map((e) => e.split(" ").map(Number));

const dists = Array(n + 1).fill(Infinity);
dists[1] = 0;

for (let i = 1; i <= n; i++) {
  for (const [from, to, cost] of edges) {
    if (dists[from] !== Infinity && dists[to] > dists[from] + cost) {
      dists[to] = dists[from] + cost;

      if (i === n) {
        console.log("-1");
        return;
      }
    }
  }
}

console.log(
  dists
    .slice(2)
    .map((dist) => (dist === Infinity ? -1 : dist))
    .join("\n"),
);
