const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const [_, ...inputs] = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);

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
    const ret = this.q[this.l];
    delete this.q[this.l++];
    return ret;
  }

  get size() {
    return this.r - this.l;
  }
}

const snakeLadders = new Map();

for (const input of inputs) {
  const [from, to] = input.split(" ").map(Number);
  snakeLadders.set(from, to);
}

const visited = Array(101).fill(false);

const queue = new Queue();
queue.enqueue([1, 0]);
visited[1] = true;
let res = 0;

while (queue.size) {
  const cur = queue.dequeue();

  if (cur[0] === 100) {
    res = cur[1];
    break;
  }

  for (let i = 1; i <= 6; i++) {
    let next = cur[0] + i;
    if (next > 100) continue;

    if (snakeLadders.has(next)) next = snakeLadders.get(next);

    if (!visited[next]) {
      visited[next] = true;
      queue.enqueue([next, cur[1] + 1]);
    }
  }
}

console.log(res);
