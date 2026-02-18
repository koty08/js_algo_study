const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const [a, b, c] = fs.readFileSync(filePath, "utf-8").toString().split(" ").map(BigInt);

function powerMod(power) {
  if (power === 1n) return a % c;

  const divide = powerMod(power / 2n) % c;

  if (power % 2n) return (divide * divide * (a % c)) % c;
  else return (divide * divide) % c;
}

console.log(powerMod(b).toString());
