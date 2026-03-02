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

const dx = [1, -1, 0, 0, 0, 0];
const dy = [0, 0, 1, -1, 0, 0];
const dz = [0, 0, 0, 0, 1, -1];

const [m, n, h] = first.split(" ").map(Number);
const map = [];

for (let i = 0; i < h; i++) {
  const tmp = [];
  for (let j = 0; j < n; j++) {
    tmp.push(inputs[n * i + j].split(" ").map(Number));
  }
  map.push(tmp);
}

const queue = new Queue();

for (let i = 0; i < h; i++) {
  for (let j = 0; j < n; j++) {
    for (let k = 0; k < m; k++) {
      if (map[i][j][k] === 1) queue.enqueue([i, j, k]);
    }
  }
}

while (queue.size) {
  const cur = queue.dequeue();

  for (let i = 0; i < 6; i++) {
    const [nextZ, nextY, nextX] = [cur[0] + dz[i], cur[1] + dy[i], cur[2] + dx[i]];

    if (nextZ >= 0 && nextY >= 0 && nextX >= 0 && nextZ < h && nextY < n && nextX < m) {
      if (!map[nextZ][nextY][nextX]) {
        queue.enqueue([nextZ, nextY, nextX]);
        map[nextZ][nextY][nextX] = map[cur[0]][cur[1]][cur[2]] + 1;
      }
    }
  }
}

let max = 0;
for (let i = 0; i < h; i++) {
  for (let j = 0; j < n; j++) {
    for (let k = 0; k < m; k++) {
      if (map[i][j][k] === 0) {
        max = -1;
        break;
      }
      max = Math.max(max, map[i][j][k]);
    }
    if (max === -1) break;
  }
  if (max === -1) break;
}

console.log(max === -1 ? max : max - 1);
