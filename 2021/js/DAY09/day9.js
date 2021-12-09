let readfile = require('../utils/readfile');

let data = readfile()
let grid = []
data.forEach((e) => {
    grid.push(e.split('').map((f) => { return parseInt(f) }))
})

let basins = []
let sum = 0;
for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
        if (x > 0) {
            if (grid[y][x - 1] <= grid[y][x]) {
                continue;
            }
        }
        if (x < grid[0].length - 1) {
            if (grid[y][x + 1] <= grid[y][x]) {
                continue;
            }
        }
        if (y > 0) {
            if (grid[y - 1][x] <= grid[y][x]) {
                continue;
            }
        }
        if (y < grid.length - 1) {
            if (grid[y + 1][x] <= grid[y][x]) {
                continue;
            }
        }

        let visited = {}

        function recur(yi, xi, count = 0) {
            let valid = false;
            try {
                if (grid[yi][xi] != 9 && !visited[`${yi}|${xi}`]) {
                    valid = true
                    count++;
                    visited[`${yi}|${xi}`] = 1
                } else {
                    valid = false
                    return count
                }
            } catch {
                return count
            }
            if (xi > 0) {
                count += recur(yi, xi - 1)
            }
            if (xi < grid[0].length - 1) {
                count += recur(yi, xi + 1)
            }
            if (yi > 0) {

                count += recur(yi - 1, xi)
            }
            if (yi < grid.length - 1) {
                count += recur(yi + 1, xi)

            }
            return count;

        }
        let basinSize = recur(y, x)
        basins.push(basinSize)
        sum += (grid[y][x] + 1)
    }
}
console.log("p1 :", sum);
basins.sort(function(a, b) {
    return b - a;
});
console.log("p2 :", basins[0] * basins[1] * basins[2]);