const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const input = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);

const lines = input.slice(0, -1);
const res = [];

for (let line of lines) {
  const stack = [];

  for (let char of line) {
    if (char === "(" || char === "[") stack.push(char);
    else if (char === ")") {
      if (stack[stack.length - 1] === "(") stack.pop();
      else stack.push(")");
    } else if (char === "]") {
      if (stack[stack.length - 1] === "[") stack.pop();
      else stack.push("]");
    }
  }

  res.push(stack.length ? "no" : "yes");
}

console.log(res.join("\n"));
