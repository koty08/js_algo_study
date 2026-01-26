const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const input = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);

const commands = input.slice(1);
const n = 1000000;

const deq = new Array(n);
const res = [];

let size = 0;
let f = 0;
let r = 0;

for (c of commands) {
  const [command, val] = c.split(" ");

  switch (command) {
    case "1":
      if (size === 0) {
        f = 0;
        r = 0;
      } else {
        if (f === 0) f = n - 1;
        else f--;
      }
      deq[f] = val;
      size++;
      break;
    case "2":
      if (size === 0) {
        f = 0;
        r = 0;
      } else {
        if (r === n - 1) r = 0;
        else r++;
      }
      deq[r] = val;
      size++;
      break;
    case "3":
      if (size) {
        res.push(deq[f]);
        size--;
        if (f === n - 1) f = 0;
        else f++;
      } else res.push(-1);
      break;
    case "4":
      if (size) {
        res.push(deq[r]);
        size--;
        if (r === 0) r = n - 1;
        else r--;
      } else res.push(-1);
      break;
    case "5":
      res.push(size);
      break;
    case "6":
      res.push(size ? 0 : 1);
      break;
    case "7":
      res.push(size ? deq[f] : -1);
      break;
    case "8":
      res.push(size ? deq[r] : -1);
      break;
  }
}

console.log(res.join("\n"));
