const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const input = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);

const commands = input.slice(1);

const queue = [];
const res = [];
let f = 0;
let b = 0;

for (c of commands) {
  const [command, val] = c.split(" ");

  switch (command) {
    case "push":
      queue[b++] = Number(val);
      break;
    case "pop":
      res.push(f !== b ? queue[f++] : -1);
      break;
    case "size":
      res.push(b - f);
      break;
    case "empty":
      res.push(f === b ? 1 : 0);
      break;
    case "front":
      res.push(f !== b ? queue[f] : -1);
      break;
    case "back":
      res.push(f !== b ? queue[b - 1] : -1);
  }
}

console.log(res.join("\n"));
