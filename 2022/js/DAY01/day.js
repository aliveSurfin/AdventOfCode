let readfile = require('../utils/readfile');

let data = readfile({ split: false })

// data.forEach((e) => {
//     console.log(e);
// })

console.log()
let sums = data.split('\n\n')
    .map((e) => { return e.split('\n').map((f) => { return parseInt(f) }).reduce((a, b) => a + b) }).sort((a, b) => (a - b))
console.log("P1", sums.slice(-1).reduce((a, b) => a + b))
console.log("P2", sums.slice(-3).reduce((a, b) => a + b))

// console.log(sums)