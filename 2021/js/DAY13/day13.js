let readfile = require('../utils/readfile');

let data = readfile()
let inst = []
for (let y = data.length - 1; y >= 0; y--) {
    if (data[y].includes('fold')) {
        inst.push(data[y])
        data.pop()
    } else {
        break;
    }

}
inst = inst.reverse()
let maxX = 0;
let maxY = 0;
data = data.map((e) => {
    let test = e.split(',').map(f => parseInt(f))
    let x = test[0]
    let y = test[1]
    if (x > maxX) {
        maxX = x
    }
    if (y > maxY) {
        maxY = y
    }
    return { x, y }
})
let grid = []
for (let y = 0; y <= maxY; y++) {
    let row = []
    for (let x = 0; x <= maxX; x++) {
        row.push('.')
    }
    grid.push(row)
}
data.forEach((e) => {
    grid[e.y][e.x] = '#'
})

inst.forEach((e, i) => {
    let a = e.split('fold along ')[1].split('=')
    let num = parseInt(a[1])
    if (a[0] == 'y') {
        console.log("y fold");
        let count = 0;
        for (let y = num; y < grid.length; y++) {
            count++;
            for (let x = 0; x < grid[0].length; x++) {
                if (grid[y][x] == '#') {
                    try {
                        grid[num - count + 1][x] = '#'
                    } catch {}
                }
            }
        }
        for (let i = 0; i < count; i++) {
            grid.pop()
        }
    } else {
        console.log("x fold");
        let count = 0;
        for (let y = 0; y < grid.length; y++) {
            count = 0;
            for (let x = num; x < grid[0].length; x++) {
                if (grid[y][x] == '#') {
                    try {
                        grid[y][num - count] = '#'
                    } catch {}
                }
                count++
            }
        }
        for (let y = 0; y < grid.length; y++) {
            for (let i = 0; i < count; i++) {
                grid[y].pop()
            }
        }
    }

})
let c = 0;
grid.forEach((e) => {
    console.log(e.join(' '));
    e.forEach((f) => {
        if (f == '#') {
            c++
        }
    })
})
console.log(c);