let readfile = require('../utils/readfile');

let data = readfile()
let lowest = null
data = data[0].split(',').map((e) => {
    if (lowest == null) {
        lowest = parseInt(e)
    } else {
        if (parseInt(e) > lowest) {
            lowest = parseInt(e)
        }
    }
    return parseInt(e)
})
let lowestcrab = null;
let lowestval = null;
for (let e = 0; e <= lowest; e++) {
    let sum = 0;
    data.forEach((f) => {
        for (let x = 1; x <= Math.abs(e - f); x++) {
            sum += (x)
        }
    })
    if (lowestcrab == null) {
        lowestcrab = e
        lowestval = sum
    } else {
        if (lowestval > sum) {
            lowestval = sum
            lowestcrab = e
        }
    }
}

console.log(lowestcrab, lowestval);