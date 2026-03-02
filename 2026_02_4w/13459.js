const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const [n, k] = fs.readFileSync(filePath, "utf-8").toString().trim().split(" ").map(Number);

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

const dists = Array(100001).fill(Infinity);

const pq = new PriorityQueue();
pq.push([0, n]);
dists[n] = 0;

while (pq.size()) {
  const [dist, cur] = pq.pop();

  if (dists[cur] < dist) continue;

  const nexts = [
    [0, cur * 2],
    [1, cur - 1],
    [1, cur + 1],
  ];

  for (const [nextDist, next] of nexts) {
    const cost = dist + nextDist;
    if (cost < dists[next]) {
      pq.push([cost, next]);
      dists[next] = cost;
    }
  }
}

console.log(dists[k]);
