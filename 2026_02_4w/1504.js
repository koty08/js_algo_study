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

const [n] = first.split(" ").map(Number);

const graph = Array.from({ length: n + 1 }, () => []);

for (const line of inputs.slice(0, -1)) {
  const [v1, v2, dist] = line.split(" ").map(Number);
  graph[v1].push([dist, v2]);
  graph[v2].push([dist, v1]);
}

const [mustV1, mustV2] = inputs[inputs.length - 1].split(" ").map(Number);

function dijkstra(start) {
  const dists = Array(n + 1).fill(Infinity);

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

  return dists;
}

const v1Dists = dijkstra(1);
const mustV1Dists = dijkstra(mustV1);
const mustV2Dists = dijkstra(mustV2);

const path1 = v1Dists[mustV1] + mustV1Dists[mustV2] + mustV2Dists[n];
const path2 = v1Dists[mustV2] + mustV2Dists[mustV1] + mustV1Dists[n];

const res = Math.min(path1, path2);
console.log(res === Infinity ? -1 : res);
