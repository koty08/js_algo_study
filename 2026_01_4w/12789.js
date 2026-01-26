const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const input = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);

const numbers = input[1];

const stack = [];
let cur = 1;

for (num of numbers.split(" ").map(Number)) {
  stack.push(num);
  while (stack.length && stack.at(-1) === cur) {
    stack.pop();
    cur++;
  }
}

console.log(stack.length ? "Sad" : "Nice");
