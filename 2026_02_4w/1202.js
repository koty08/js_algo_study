const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const [first, ...inputs] = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);

class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  push(value) {
    this.heap.push(value);

    let idx = this.heap.length - 1;
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      if (this.heap[parentIdx] >= this.heap[idx]) break;

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
        if (this.heap[lcIdx] > this.heap[idx]) {
          swap = lcIdx;
        }
      }

      if (rcIdx < length) {
        if ((swap === null && this.heap[rcIdx] > this.heap[idx]) || (swap !== null && this.heap[rcIdx] > this.heap[lcIdx])) {
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

const [n, k] = first.split(" ").map(Number);

const gems = [];
for (let i = 0; i < n; i++) {
  gems.push(inputs[i].split(" ").map(Number));
}

const bags = [];
for (let i = 0; i < k; i++) {
  bags.push(Number(inputs[n + i]));
}

gems.sort((a, b) => a[0] - b[0]);
bags.sort((a, b) => a - b);

const pq = new PriorityQueue();
let gemLastIdx = 0;
let res = 0;

for (let bag of bags) {
  while (gemLastIdx < n && gems[gemLastIdx][0] <= bag) {
    pq.push(gems[gemLastIdx][1]);
    gemLastIdx++;
  }

  if (pq.size() > 0) {
    res += pq.pop();
  }
}

console.log(res);
