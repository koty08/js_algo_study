const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const [str, _, ...questions] = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);

const alpha_sum = Array.from({ length: 26 }, () => Array(str.length + 1).fill(0));

for (let i = 0; i < 26; i++) {
  for (let j = 0; j < str.length; j++) {
    if (str[j].charCodeAt() - 97 === i) alpha_sum[i][j + 1] = alpha_sum[i][j] + 1;
    else alpha_sum[i][j + 1] = alpha_sum[i][j];
  }
}

const res = [];

for (let q of questions) {
  const [charIdx, start, end] = q.split(" ").map((e) => (isNaN(e) ? e.charCodeAt() - 97 : Number(e)));

  res.push(alpha_sum[charIdx][end + 1] - alpha_sum[charIdx][start]);
}

console.log(res.join("\n"));
