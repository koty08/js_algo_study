const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const input = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);

const commands = input.slice(1);

const stack = [];
const res = [];

for (let i = 0; i < commands.length; i++) {
  const [command, val] = commands[i].split(" ");

  switch (command) {
    case "1":
      stack.push(val);
      break;
    case "2":
      if (stack.length) res.push(stack.pop());
      else res.push(-1);
      break;
    case "3":
      res.push(stack.length);
      break;
    case "4":
      res.push(stack.length ? 0 : 1);
      break;
    case "5":
      if (stack.length) res.push(stack[stack.length - 1]);
      else res.push(-1);
      break;
  }
}

console.log(res.join("\n"));
