console.log(require('fs').readFileSync("./input.txt", 'utf8').split('\n').map((e) => parseInt(e)).reduce((prev, cur, ind, arr) => prev += (ind > 2) && (arr.slice(ind - 2, ind + 1).reduce((p, c) => p + c, 0) > arr.slice(ind - 3, ind).reduce((p, c) => p + c, 0)), 0))