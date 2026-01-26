const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const input = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);

const queue = [];
let f = 0;
let b = 0;

const n = Number(input[0]);

for (let i = 0; i < n; i++) {
  queue.push(i + 1);
  b++;
}

let flag = true;

while (b - f !== 1) {
  if (flag) {
    f++;
    flag = false;
  } else {
    queue.push(queue[f++]);
    b++;
    flag = true;
  }
}

console.log(queue[f]);
