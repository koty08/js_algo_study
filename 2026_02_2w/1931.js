const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const [_, ...meetings] = fs
  .readFileSync(filePath, "utf-8")
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((e) => e.split(" ").map(Number));

meetings.sort(([s1, e1], [s2, e2]) => {
  if (e1 !== e2) {
    return e1 - e2;
  }
  return s1 - s2;
});

let res = 0;
let last_end_time = 0;

for (const [start, end] of meetings) {
  if (start >= last_end_time) {
    res++;
    last_end_time = end;
  }
}

console.log(res);
