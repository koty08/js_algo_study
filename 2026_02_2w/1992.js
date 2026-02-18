const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const [first, ...inputLines] = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);
const n = Number(first);
const inputs = inputLines.map((e) => e.split("").map(Number));

const res = [];

function divide(x, y, len) {
  let zero_cnt = 0;

  for (let i = x; i < x + len; i++) {
    for (let j = y; j < y + len; j++) {
      if (!inputs[i][j]) zero_cnt++;
    }
  }

  if (zero_cnt === len * len) res.push(0);
  else if (!zero_cnt) res.push(1);
  else {
    res.push("(");
    const nextLen = len / 2;

    divide(x, y, nextLen);
    divide(x, y + nextLen, nextLen);
    divide(x + nextLen, y, nextLen);
    divide(x + nextLen, y + nextLen, nextLen);
    res.push(")");
  }
}

divide(0, 0, n);
console.log(res.join(""));
