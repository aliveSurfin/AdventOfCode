let readfile = require('../utils/readfile');

let data = readfile()
let grid = []
console.log(data);

function getNeighbourArray(x, y, width, height) {
    let returnArray = []
    if (x > 0) {
        returnArray.push([x - 1, y]) // left 
        if (y > 0) {
            returnArray.push([x - 1, y - 1]) // up left
        }
        if (y < height - 1) {
            returnArray.push([x - 1, y + 1]) // down left
        }

    }

    if (x < width - 1) {
        returnArray.push([x + 1, y]) // right
        if (y > 0) {
            returnArray.push([x + 1, y - 1]) // up right
        }
        if (y < height - 1) {
            returnArray.push([x + 1, y + 1]) // down right
        }
    }
    if (y > 0) {
        returnArray.push([x, y - 1]) // up 
    }
    if (y < height - 1) {
        returnArray.push([x, y + 1]) // down
    }

    return returnArray
}
data.forEach((e) => {
    grid.push(e.split('').map((f) => { return parseInt(f) }))
})
console.log(grid);

console.log(getNeighbourArray(0, 0, grid[0].length, grid.length));

function count(arr) {
    return Object.values(arr).reduce(function(accumulator, current) {
        return accumulator + current;
    });
}

let lowest = Number.MAX_SAFE_INTEGER

function recurDown(pos, visited = {}) {
    if (visited[`${pos.y}|${pos.x}`]) {
        return
    }
    visited[`${pos.y}|${pos.x}`] = grid[pos.y][pos.x];
    if (pos.x == grid[0].length - 1 && pos.y == grid.length - 1) {
        let c = count(visited)
        if (c < lowest) {
            lowest = c
        }
        return
    }
    getNeighbourArray(pos.x, pos.y, grid[0].length, grid.length).forEach((e) => {
        console.log(e);
        recurDown({ x: e[1], y: e[0] }, visited)
    })
}

recurDown({ x: 0, y: 0 })

console.log(lowest);