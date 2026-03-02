const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const [first, ...inputs] = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);

const [n, m] = first.split(" ").map(Number);
const map = inputs.map((e) => e.split("").map(Number));
const visited = Array.from({ length: n }, () => Array(m).fill(false));

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

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
queue.enqueue([0, 0, 1]);
visited[0][0] = true;
let res = 0;

while (queue.size) {
  const cur = queue.dequeue();
  if (cur[0] === n - 1 && cur[1] === m - 1) {
    res = cur[2];
    break;
  }

  for (let i = 0; i < 4; i++) {
    const [nextX, nextY] = [cur[0] + dx[i], cur[1] + dy[i]];
    if (nextX >= 0 && nextY >= 0 && nextX < n && nextY < m) {
      if (map[nextX][nextY] && !visited[nextX][nextY]) {
        queue.enqueue([nextX, nextY, cur[2] + 1]);
        visited[nextX][nextY] = true;
      }
    }
  }
}

console.log(res);
