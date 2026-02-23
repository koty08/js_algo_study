const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const [_, ...inputs] = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/).map(Number);

class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  comp(v1, v2, equal = false) {
    const abs1 = Math.abs(v1);
    const abs2 = Math.abs(v2);

    if (abs1 === abs2) return equal ? v1 <= v2 : v1 < v2;
    else return equal ? abs1 <= abs2 : abs1 < abs2;
  }

  push(value) {
    this.heap.push(value);

    let idx = this.size() - 1;
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      if (this.comp(this.heap[parentIdx], this.heap[idx], true)) break;

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
        if (this.comp(this.heap[lcIdx], this.heap[idx])) swap = lcIdx;
      }

      if (rcIdx < length) {
        if (
          (swap === null && this.comp(this.heap[rcIdx], this.heap[idx])) ||
          (swap !== null && this.comp(this.heap[rcIdx], this.heap[lcIdx]))
        ) {
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

const pq = new PriorityQueue();
const res = [];

for (let input of inputs) {
  if (input === 0) res.push(pq.pop());
  else pq.push(input);
}

console.log(res.join("\n"));
