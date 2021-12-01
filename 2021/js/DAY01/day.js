let readfile = require('../utils/readfile');

let data = readfile(true)

//part1
let countp1 = 0;
data.forEach((e, i) => {
    if (i >= 1) {
        if (e > data[i - 1]) {
            countp1++
        }
    }
})

//part 2
let countp2 = 0;
let cur = null;
let prev;
data.forEach((e, i) => {
    if (i >= 2) {
        prev = cur;
        cur = 0;
        for (let x = i;
            (x >= 0) && (x > i - 3); x--) {
            cur += data[x]
        }
        if (prev != null && cur > prev) {
            countp2++;
        }
    }
})
console.log("part1: ", countp1);
console.log("part2: ", countp2);