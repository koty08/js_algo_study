const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const [first, ...inputs] = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);

class Queue {
  constructor() {
    this.q = [];
    this.l = 0;
    this.r = 0;
  }

  enqueue(val) {
    this.q[this.r++] = val;
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

const [n, m, r] = first.split(" ").map(Number);
const graph = [...Array(n + 1)].map(() => []);
const visited = Array(n + 1).fill(0);

for (const line of inputs) {
  const [v1, v2] = line.split(" ").map(Number);
  graph[v1].push(v2);
  graph[v2].push(v1);
}

graph.map((g) => g.sort((a, b) => a - b));

let cnt = 1;
const queue = new Queue();
queue.enqueue(r);
visited[r] = cnt++;

while (queue.size) {
  const cur = queue.dequeue();

  for (const next of graph[cur]) {
    if (!visited[next]) {
      queue.enqueue(next);
      visited[next] = cnt++;
    }
  }
}

console.log(visited.slice(1).join("\n"));
