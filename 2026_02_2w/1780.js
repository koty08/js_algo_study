const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const [first, ...inputLines] = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);

const n = Number(first);
const inputs = inputLines.map((e) => e.split(" ").map(Number));

const res = [0, 0, 0];

function divide(x, y, len) {
  let count = [0, 0, 0];
  for (let i = x; i < x + len; i++) {
    for (let j = y; j < y + len; j++) {
      const idx = inputs[i][j] + 1;
      count[idx]++;
    }
  }

  const pow = len * len;
  if (count[0] === pow) res[0]++;
  else if (count[1] === pow) res[1]++;
  else if (count[2] === pow) res[2]++;
  else {
    const nextLen = len / 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        divide(x + i * nextLen, y + j * nextLen, nextLen);
      }
    }
  }
}

divide(0, 0, n);

console.log(res.join("\n"));
