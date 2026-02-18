const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const input = fs.readFileSync(filePath, "utf-8").toString().trim();

const first_minus = input.search("-");

const front = input.slice(0, first_minus === -1 ? input.length : first_minus);
const back = input.slice(first_minus);

let res = 0;
res += front.split("+").reduce((acc, cur) => (acc += Number(cur)), 0);
if (first_minus !== -1) res += back.split(/\+|-/).reduce((acc, cur) => (acc -= Number(cur)), 0);

console.log(res);
