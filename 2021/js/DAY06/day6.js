let readfile = require('../utils/readfile');

let data = readfile(false, "./input.txt")

data = data[0].split(',').map((e) => {
    return parseInt(e)
})
let states = Array(9).fill(0)
data.forEach((e) => {
    states[e]++;
})
for (let x = 0; x < 256; x++) {
    let zero = states[0]
    let nstates = Array(9).fill(0)
    for (let y = 0; y < states.length - 1; y++) {
        nstates[y] = states[y + 1]
    }
    states = nstates
    states[6] += zero
    states[8] += zero
}
console.log(states);
let sum = 0;
states.forEach((e) => {
    sum += e
})
console.log(sum);