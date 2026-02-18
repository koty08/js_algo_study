const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const n = Number(fs.readFileSync(filePath, "utf-8").toString().trim());

let rec_cnt = 0;

function rec(n) {
  if (n === 1 || n === 2) {
    rec_cnt++;
    return 1;
  } else return rec(n - 1) + rec(n - 2);
}

let dp_cnt = 0;

function dynamic() {
  for (let i = 3; i <= n; i++) {
    dp_cnt++;
  }
}

rec(n);
dynamic(n);

console.log(rec_cnt, dp_cnt);
