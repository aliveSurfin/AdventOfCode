let readfile = require('../utils/readfile');

let data = readfile()
let template = data.shift().split('')

let pairMap = {}
data.forEach((e) => {
    let test = e.split(' -> ')
    pairMap[test[0]] = test[1]
})

let pairCounts = {}
template.forEach((e, i) => {
    if (i != template.length - 1) {
        if (pairCounts[`${e}${template[i + 1]}`]) {
            pairCounts[`${e}${template[i + 1]}`] += 1
        } else {
            pairCounts[`${e}${template[i + 1]}`] = 1
        }

    }
})
template.pop()
    //we fishin boys
function count(part) {
    let charCounts = {}
    Object.entries(pairCounts).forEach(([key, val]) => {
        if (charCounts[key.split('')[1]]) {
            charCounts[key.split('')[1]] += val
        } else {
            charCounts[key.split('')[1]] = val
        }
    })
    let sorted = Object.values(charCounts).sort((a, b) => {
        return a - b
    })
    console.log(part, sorted[sorted.length - 1] - sorted[0])
}
let steps = 40;
for (let x = 0; x < steps; x++) {
    if (x == 10) {
        count("p1: ")
    }
    let newPairCounts = {}
    Object.entries(pairCounts).forEach(([key, val]) => {
        let newpair1 = key.split('')[0] + pairMap[key]
        let newpair2 = pairMap[key] + key.split('')[1]
        if (newPairCounts[newpair1]) {
            newPairCounts[newpair1] += val
        } else {
            newPairCounts[newpair1] = val
        }

        if (newPairCounts[newpair2]) {
            newPairCounts[newpair2] += val
        } else {
            newPairCounts[newpair2] = val
        }

    });
    pairCounts = newPairCounts
}
count("p2: ")