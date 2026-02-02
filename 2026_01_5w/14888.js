const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const [_, a, b] = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);

const nums = a.split(" ").map(Number);
const opers = b.split(" ").map(Number);
const operLen = opers.reduce((p, c) => p + c, 0);

const perm = [];
const operperms = [];

function dfs(depth) {
  if (depth === operLen) {
    return operperms.push(perm.join(" "));
  }

  for (let i = 0; i < 4; i++) {
    if (opers[i] === 0) continue;
    opers[i]--;
    perm.push(i);
    dfs(depth + 1);
    opers[i]++;
    perm.pop();
  }
}

dfs(0);

const results = operperms.map((p) => {
  let res = 0;
  const opers = p.split(" ").map(Number);

  for (let i = 0; i < opers.length; i++) {
    const loperand = i === 0 ? nums[i] : res;

    switch (opers[i]) {
      case 0:
        res = loperand + nums[i + 1];
        break;
      case 1:
        res = loperand - nums[i + 1];
        break;
      case 2:
        res = loperand * nums[i + 1];
        break;
      case 3:
        if (loperand < 0 && nums[i + 1] > 0) res = Math.ceil(loperand / nums[i + 1]);
        else res = Math.floor(loperand / nums[i + 1]);
    }
  }

  return res;
});

console.log(`${Math.max(...results)}\n${Math.min(...results)}`);
