const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const [[n], ...inputs] = fs
  .readFileSync(filePath, "utf-8")
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((e) => e.split(" ").map(Number));

let white = 0;
let blue = 0;

function divide(x, y, len) {
  let blue_cnt = 0;
  for (let i = x; i < x + len; i++) {
    for (let j = y; j < y + len; j++) {
      if (inputs[i][j]) blue_cnt++;
    }
  }

  if (blue_cnt === len * len) blue++;
  else if (!blue_cnt) white++;
  else {
    const nextLen = len / 2;

    divide(x, y, nextLen);
    divide(x + nextLen, y, nextLen);
    divide(x, y + nextLen, nextLen);
    divide(x + nextLen, y + nextLen, nextLen);
  }
}

divide(0, 0, n);

console.log(`${white}\n${blue}`);
