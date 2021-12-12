let readfile = require('../utils/readfile');

let data = readfile()


let grid = []
data.forEach((e) => {
    //console.log(e);
    grid.push(e.split('').map((f) => {
        return parseInt(f)
    }))

})

console.log(grid);
let flashed = {}
let flashcount = 0;

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

function flash(y, x, arr) {
    if (flashed[`${y}|${x}`]) {
        return
    }
    let neighbours = getNeighbourArray(x, y, arr[0].length, grid.length)
    flashed[`${y}|${x}`] = true
    flashcount++;

    neighbours.forEach((e) => {
        grid[e[1]][e[0]]++;
        if (grid[e[1]][e[0]] > 9) {
            flash(e[1], e[0], arr)
        }
    })
}
let i = 0;
while (true) {
    flashed = {}
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            grid[y][x]++

        }
    }
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            if (grid[y][x] > 9) {
                flash(y, x, grid, flashed)
            }

        }
    }

    Object.entries(flashed).forEach(([key, val]) => {
        let test = key.split('|').map((a) => { return parseInt(a) })
        grid[test[0]][test[1]] = 0
    });
    if (i == 99) {
        console.log("p1 :", flashcount)
    }
    if (Object.entries(flashed).length == 100) {
        console.log("p2 :", i + 1);
        break
    }
    i++
}