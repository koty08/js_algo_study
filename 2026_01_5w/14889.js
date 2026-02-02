const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "run/input.txt";
const [n, ...s] = fs.readFileSync(filePath, "utf-8").toString().trim().split(/\r?\n/);

const nums = Array.from({ length: n }, (_, i) => i + 1);
const ablities = s.map((e) => e.split(" ").map(Number));

const start_team = [];
let res = 10000000;

function calcAbilities(team) {
  let ret = 0;
  for (let i = 0; i < team.length; i++) {
    for (let j = 0; j < team.length; j++) {
      if (i === j) continue;
      ret += ablities[team[i] - 1][team[j] - 1];
    }
  }
  return ret;
}

function dfs(depth, start) {
  if (depth === n / 2) {
    const end_team = nums.filter((num) => !start_team.includes(num));
    const diff = Math.abs(calcAbilities(start_team) - calcAbilities(end_team));
    res = Math.min(res, diff);
    return;
  }

  for (let i = start; i < n; i++) {
    start_team.push(nums[i]);
    dfs(depth + 1, i + 1);
    start_team.pop();
  }
}

dfs(0, 0);
console.log(res);
