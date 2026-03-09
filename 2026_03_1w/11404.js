const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const [first, ...inputs] = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);

const n = Number(first);

const dists = Array.from({ length: n + 1 }, (_, i) => [...Array(n + 1)].map((_, j) => (i === j ? 0 : Infinity)));

for (const line of inputs.slice(1)) {
  const [v1, v2, cost] = line.split(" ").map(Number);

  dists[v1][v2] = Math.min(dists[v1][v2], cost);
}

for (let k = 1; k <= n; k++) {
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      if (dists[i][j] > dists[i][k] + dists[k][j]) {
        dists[i][j] = dists[i][k] + dists[k][j];
      }
    }
  }
}

console.log(
  dists
    .slice(1)
    .map((d) =>
      d
        .slice(1)
        .map((e) => (e === Infinity ? 0 : e))
        .join(" "),
    )
    .join("\n"),
);
