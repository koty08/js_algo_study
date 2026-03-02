const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const [n, k] = fs.readFileSync(filePath, "utf-8").toString().trim().split(" ").map(Number);

const MAX = 100001;
const visited = Array(MAX).fill(false);

class Queue {
  constructor() {
    this.q = [];
    this.l = 0;
    this.r = 0;
  }

  enqueue(v) {
    this.q[this.r++] = v;
  }

  dequeue() {
    const v = this.q[this.l];
    delete this.q[this.l++];
    return v;
  }

  get size() {
    return this.r - this.l;
  }
}

const queue = new Queue();
queue.enqueue([n, 0]);
visited[n] = true;
let res = 0;

while (queue.size) {
  const cur = queue.dequeue();
  if (cur[0] === k) {
    res = cur[1];
    break;
  }

  const nextArr = [cur[0] - 1, cur[0] + 1, cur[0] * 2];
  for (const next of nextArr) {
    if (next >= 0 && next < MAX) {
      if (!visited[next]) {
        queue.enqueue([next, cur[1] + 1]);
        visited[next] = true;
      }
    }
  }
}

console.log(res);
