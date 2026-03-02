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

const t = Number(first);

let cursor = 0;
for (let i = 0; i < t; i++) {
  const [v, e] = inputs[cursor++].split(" ").map(Number);

  const graph = [...Array(v + 1)].map(() => []);

  for (let j = 0; j < e; j++) {
    const [v1, v2] = inputs[cursor++].split(" ").map(Number);
    graph[v1].push(v2);
    graph[v2].push(v1);
  }

  const visited = Array(v + 1).fill(0);

  for (let j = 1; j <= v; j++) {
    if (!visited[j]) {
      let queue = new Queue();
      queue.enqueue(j);
      visited[j] = 1;

      while (queue.size) {
        const cur = queue.dequeue();

        for (const next of graph[cur]) {
          if (!visited[next]) {
            queue.enqueue(next);
            visited[next] = visited[cur] * -1;
          }
        }
      }
    }
  }

  let res = "YES";
  for (let j = 1; j <= v; j++) {
    for (const next of graph[j]) {
      if (visited[j] === visited[next]) {
        res = "NO";
        break;
      }
    }
  }

  console.log(res);
}
