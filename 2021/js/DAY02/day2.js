let readfile = require('../utils/readfile');

let data = readfile()
let x = 0;
let y = 0;
let aim = 0;
data.forEach((e) => {
    let inst = e.split(' ')
    inst[1] = parseInt(inst[1])
    switch (inst[0]) {
        case "forward":
            x += inst[1];
            y += inst[1] * aim;
            break;
        case "down":
            aim += inst[1];
            break;
        case "up":
            aim -= inst[1]
            break;
    }
})

console.log(x * y);