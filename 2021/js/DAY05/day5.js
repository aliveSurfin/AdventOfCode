let readfile = require('../utils/readfile');


let data = readfile(false, "./input.txt")

let grid = {}
data.forEach((e) => {
    let test = e.split(' -> ')
    test = test.map((f) => {
        let a = f.split(',').map((g) => { return parseInt(g) })
        return { x: a[0], y: a[1] }
    })
    if (test[0].y == test[1].y) {
        for (let x = Math.min(test[0].x, test[1].x); x <= Math.max(test[0].x, test[1].x); x++) {
            if (grid[`${x}|${test[0].y}`]) {
                grid[`${x}|${test[0].y}`]++
            } else {
                grid[`${x}|${test[0].y}`] = 1;
            }
        }
    } else if (test[0].x == test[1].x) {
        for (let y = Math.min(test[0].y, test[1].y); y <= Math.max(test[0].y, test[1].y); y++) {
            if (grid[`${test[0].x}|${y}`]) {
                grid[`${test[0].x}|${y}`]++
            } else {
                grid[`${test[0].x}|${y}`] = 1;
            }
        }
    } else {
        let x1 = test[0].x
        let x2 = test[1].x
        let y1 = test[0].y
        let y2 = test[1].y
        let xinc = x1 < x2 ? 1 : -1
        let yinc = y1 < y2 ? 1 : -1

        let checkfuncbuilder = (inc) => {
            return inc == -1 ?
                (incer, check) => {
                    return incer >= check
                } :
                (incer, check) => {
                    return incer <= check
                }
        }
        let xcheck = checkfuncbuilder(xinc)
        let y = y1
        for (let x = x1; xcheck(x, x2); x += xinc) {
            if (grid[`${x}|${y}`]) {
                grid[`${x}|${y}`]++

            } else {
                grid[`${x}|${y}`] = 1;
            }
            y += yinc;
        }

    }

})
let count = 0;
Object.keys(grid).forEach(function(key) {
    if (grid[key] > 1) {
        count++
    }
});
console.log(count);