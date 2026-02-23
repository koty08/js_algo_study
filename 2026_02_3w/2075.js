const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.platform === "linux" ? process.stdin : fs.createReadStream("run/input.txt"),
  output: process.stdout,
});

class PriorityQueue {
  constructor() {
    this.heap = [null];
  }

  push(value) {
    this.heap.push(value);

    let idx = this.size();
    while (idx > 1) {
      let parentIdx = Math.floor(idx / 2);
      if (this.heap[parentIdx] <= this.heap[idx]) break;

      [this.heap[parentIdx], this.heap[idx]] = [this.heap[idx], this.heap[parentIdx]];
      idx = parentIdx;
    }
  }

  pop() {
    let length = this.size();
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

  size() {
    return this.heap.length - 1;
  }
}

let n = -1;
const pq = new PriorityQueue();

rl.on("line", (line) => {
  if (n === -1) {
    n = Number(line);
    return;
  }

  line
    .split(" ")
    .map(Number)
    .forEach((num) => {
      pq.push(num);
      if (pq.size() > n) pq.pop();
    });
}).on("close", () => {
  console.log(pq.pop());
  process.exit();
});
