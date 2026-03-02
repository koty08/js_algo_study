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
const res = [];

for (let i = 0; i < t; i++) {
  const n = Number(inputs[cursor++]);
  const prevRank = inputs[cursor++].split(" ").map(Number);
  const adj = Array.from({ length: n + 1 }, () => Array(n + 1).fill(false));
  const indegree = Array(n + 1).fill(0);

  for (let j = 0; j < n; j++) {
    for (let k = j + 1; k < n; k++) {
      adj[prevRank[j]][prevRank[k]] = true;
      indegree[prevRank[k]]++;
    }
  }

  const m = Number(inputs[cursor++]);

  for (let j = 0; j < m; j++) {
    const [a, b] = inputs[cursor++].split(" ").map(Number);
    if (adj[a][b]) {
      adj[a][b] = false;
      adj[b][a] = true;
      indegree[b]--;
      indegree[a]++;
    } else {
      adj[a][b] = true;
      adj[b][a] = false;
      indegree[b]++;
      indegree[a]--;
    }
  }

  const caseRes = [];
  const queue = new Queue();

  for (let j = 1; j <= n; j++) {
    if (!indegree[j]) queue.enqueue(j);
  }

  let impossible = false;
  let ambiguous = false;

  for (let j = 0; j < n; j++) {
    if (!queue.size) {
      impossible = true;
      break;
    }

    if (queue.size >= 2) ambiguous = true;

    const cur = queue.dequeue();
    caseRes.push(cur);

    for (let next = 1; next <= n; next++) {
      if (adj[cur][next]) {
        indegree[next]--;
        if (!indegree[next]) queue.enqueue(next);
      }
    }
  }

  if (impossible) res.push("IMPOSSIBLE");
  else if (ambiguous) res.push("?");
  else res.push(caseRes.join(" "));
}

console.log(res.join("\n"));
