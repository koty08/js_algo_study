const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const input = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);

const [n, k] = input[0].split(" ");

const people = Array.from({ length: n }, (_, i) => i + 1);
const res = [];

while (people.length) {
  for (let i = 0; i < k; i++) {
    people.push(people.shift());
  }

  res.push(people.pop());
}

console.log(`<${res.join(", ")}>`);
