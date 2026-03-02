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

const tests = Number(first);
let cursor = 0;
const res = [];

for (let i = 0; i < tests; i++) {
  const [n, m, t] = inputs[cursor++].split(" ").map(Number);
  const [s, g, h] = inputs[cursor++].split(" ").map(Number);

  const graph = Array.from({ length: n + 1 }, () => []);

  for (let j = 0; j < m; j++) {
    const [v1, v2, dist] = inputs[cursor++].split(" ").map(Number);
    graph[v1].push([dist, v2]);
    graph[v2].push([dist, v1]);
  }

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

  const candidates = [];
  for (let j = 0; j < t; j++) {
    candidates.push(Number(inputs[cursor++]));
  }

  const distS = dijkstra(s);
  const distG = dijkstra(g);
  const distH = dijkstra(h);

  const testRes = [];

  for (const c of candidates) {
    const minDist = distS[c];
    if (minDist === Infinity) continue;

    const path1 = distS[g] + distG[h] + distH[c];
    const path2 = distS[h] + distH[g] + distG[c];
    const pathMin = Math.min(path1, path2);

    if (minDist === pathMin) {
      testRes.push(c);
    }
  }

  res.push(testRes.sort((a, b) => a - b).join(" "));
}

console.log(res.join("\n"));
