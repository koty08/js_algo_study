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

const c = Number(first);
const res = [];
let cursor = 0;

const dx = [-2, -1, 1, 2, 2, 1, -1, -2];
const dy = [-1, -2, -2, -1, 1, 2, 2, 1];

for (let i = 0; i < c; i++) {
  const l = Number(inputs[cursor++]);
  const fromPos = inputs[cursor++].split(" ").map(Number);
  const toPos = inputs[cursor++].split(" ").map(Number);
  const visited = Array.from({ length: l }, () => Array(l).fill(false));

  let ans = 0;
  const queue = new Queue();
  queue.enqueue([...fromPos, 0]);
  visited[fromPos[0]][fromPos[1]] = true;

  while (queue.size) {
    const cur = queue.dequeue();
    if (cur[0] === toPos[0] && cur[1] === toPos[1]) {
      ans = cur[2];
      break;
    }

    for (let j = 0; j < 8; j++) {
      const [nextX, nextY] = [cur[0] + dx[j], cur[1] + dy[j]];
      if (nextX >= 0 && nextY >= 0 && nextX < l && nextY < l) {
        if (!visited[nextX][nextY]) {
          queue.enqueue([nextX, nextY, cur[2] + 1]);
          visited[nextX][nextY] = true;
        }
      }
    }
  }
  res.push(ans);
}

console.log(res.join("\n"));
