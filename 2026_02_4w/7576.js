const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const [first, ...inputs] = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);

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

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

const [m, n] = first.split(" ").map(Number);
const map = inputs.map((e) => e.split(" ").map(Number));
const ripes = [];

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (map[i][j] === 1) ripes.push([i, j]);
  }
}

const queue = new Queue();

for (const ripe of ripes) queue.enqueue(ripe);

while (queue.size) {
  const cur = queue.dequeue();

  for (let i = 0; i < 4; i++) {
    const [nextX, nextY] = [cur[0] + dx[i], cur[1] + dy[i]];
    if (nextX >= 0 && nextY >= 0 && nextX < n && nextY < m) {
      if (!map[nextX][nextY]) {
        queue.enqueue([nextX, nextY]);
        map[nextX][nextY] = map[cur[0]][cur[1]] + 1;
      }
    }
  }
}

let max = 0;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (map[i][j] === 0) {
      max = -1;
      break;
    }
    max = Math.max(max, map[i][j]);
  }
  if (max === -1) break;
}

console.log(max === -1 ? max : max - 1);
