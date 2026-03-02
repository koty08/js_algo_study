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
    return this.q[this.l++];
  }

  get size() {
    return this.r - this.l;
  }
}

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

const [n, m] = first.split(" ").map(Number);
const map = inputs.map((e) => e.split("").map(Number));
const visited = Array.from({ length: n }, () => Array.from({ length: m }, () => Array(2).fill(false)));

const queue = new Queue();
queue.enqueue([0, 0, 1, 0]);
visited[0][0][0] = true;

let res = -1;
while (queue.size) {
  const [x, y, cost, broken] = queue.dequeue();

  if (x === n - 1 && y === m - 1) {
    res = cost;
    break;
  }

  for (let i = 0; i < 4; i++) {
    const [nextX, nextY] = [x + dx[i], y + dy[i]];

    if (nextX >= 0 && nextY >= 0 && nextX < n && nextY < m) {
      if (map[nextX][nextY] === 0) {
        if (!visited[nextX][nextY][broken]) {
          visited[nextX][nextY][broken] = true;
          queue.enqueue([nextX, nextY, cost + 1, broken]);
        }
      } else {
        if (broken === 0 && !visited[nextX][nextY][1]) {
          visited[nextX][nextY][1] = true;
          queue.enqueue([nextX, nextY, cost + 1, 1]);
        }
      }
    }
  }
}

console.log(res);
