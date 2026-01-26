const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const input = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);

const lines = input.slice(1);
const res = [];

for (let line of lines) {
  const stack = [];

  for (let char of line) {
    if (char === "(") stack.push("(");
    else {
      if (stack[stack.length - 1] === "(") stack.pop();
      else stack.push(")");
    }
  }

  res.push(stack.length ? "NO" : "YES");
}

console.log(res.join("\n"));
