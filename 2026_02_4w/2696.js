const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const inputs = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\s+/).map(Number);

class PriorityQueue {
  constructor(max) {
    this.heap = [];
    this.max = max;
  }

  push(value) {
    this.heap.push(value);

    let idx = this.size() - 1;
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      if (this.max ? this.heap[parentIdx] >= this.heap[idx] : this.heap[parentIdx] <= this.heap[idx]) break;

      [this.heap[parentIdx], this.heap[idx]] = [this.heap[idx], this.heap[parentIdx]];
      idx = parentIdx;
    }
  }

  pop() {
    let length = this.size();
    if (length === 1) return this.heap.pop();
    if (length === 0) return null;

    const root = this.heap[0];
    this.heap[0] = this.heap.pop();

    let idx = 0;
    while (true) {
      let lcIdx = 2 * idx + 1;
      let rcIdx = lcIdx + 1;
      let swap = null;

      if (lcIdx < length) {
        if (this.max ? this.heap[lcIdx] > this.heap[idx] : this.heap[lcIdx] < this.heap[idx]) swap = lcIdx;
      }

      if (rcIdx < length) {
        if (
          (swap === null && (this.max ? this.heap[rcIdx] > this.heap[idx] : this.heap[rcIdx] < this.heap[idx])) ||
          (swap !== null && (this.max ? this.heap[rcIdx] > this.heap[lcIdx] : this.heap[rcIdx] < this.heap[lcIdx]))
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

  peek() {
    return this.heap[0];
  }
}

let cursor = 0;
const T = inputs[cursor++];

for (let t = 0; t < T; t++) {
  const M = inputs[cursor++];
  const minHeap = new PriorityQueue(false);
  const maxHeap = new PriorityQueue(true);
  const medians = [];

  for (let j = 0; j < M; j++) {
    const num = inputs[cursor++];

    if (maxHeap.size() === minHeap.size()) maxHeap.push(num);
    else minHeap.push(num);

    if (maxHeap.size() > 0 && minHeap.size() > 0 && maxHeap.peek() > minHeap.peek()) {
      const tmp = maxHeap.pop();
      maxHeap.push(minHeap.pop());
      minHeap.push(tmp);
    }

    if (j % 2 === 0) {
      medians.push(maxHeap.peek());
    }
  }

  console.log(medians.length);
  let line = "";
  for (let i = 0; i < medians.length; i++) {
    line += medians[i] + ((i + 1) % 10 === 0 || i === medians.length - 1 ? "" : " ");
    if ((i + 1) % 10 === 0 || i === medians.length - 1) {
      console.log(line);
      line = "";
    }
  }
}
