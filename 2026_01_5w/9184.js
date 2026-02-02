const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const inputs = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);

const dp = Array.from({ length: 21 }, () => Array.from({ length: 21 }, () => Array(21).fill(0)));

for (let input of inputs.slice(0, -1)) {
  const [a, b, c] = input.split(" ").map(Number);
  let res = w(a, b, c);

  console.log(`w(${a}, ${b}, ${c}) = ${res}`);
}

function w(a, b, c) {
  if (a <= 0 || b <= 0 || c <= 0) return 1;
  else if (a > 20 || b > 20 || c > 20) return w(20, 20, 20);

  if (dp[a][b][c]) return dp[a][b][c];

  if (a < b && b < c) return (dp[a][b][c] = w(a, b, c - 1) + w(a, b - 1, c - 1) - w(a, b - 1, c));
  else return (dp[a][b][c] = w(a - 1, b, c) + w(a - 1, b - 1, c) + w(a - 1, b, c - 1) - w(a - 1, b - 1, c - 1));
}
