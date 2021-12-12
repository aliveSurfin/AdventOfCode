let readfile = require('../utils/readfile');

let data = readfile()

let paths = {}
    // path 
    // key name
    // value , [prevs] , [forwards]


data.forEach((e) => {
    let test = e.split('-')
    if (paths[test[0]]) {
        paths[test[0]].forwards.push(test[1])
    } else {
        paths[test[0]] = {
            prevs: [],
            forwards: [test[1]]
        }
    }
    if (paths[test[1]]) {
        paths[test[1]].prevs.push(test[0])
    } else {
        paths[test[1]] = {
            prevs: [test[0]],
            forwards: []
        }
    }
})

function isLowerCase(c) {
    return c == c.toLowerCase()
}
let finalPathsP1 = {}

function recurp1(node, visited = []) {
    if ((isLowerCase(node) && visited.includes(node))) {
        return
    }
    if (node == "end") {
        visited.push(node)
        let join = visited.join(',')
        if (!finalPathsP1[join]) {
            finalPathsP1[join] = true
        }
        return
    }
    visited.push(node)
    let possible = paths[node].prevs.concat(paths[node].forwards)
    possible.forEach((e) => {
        if (e != "start") {
            recurp1(e, [...visited])
        }
    })
}


function countArray(array, object) {
    let count = 0;
    for (let x = 0; x < array.length; x++) {
        if (array[x] == object) {
            count++;
            if (count == 2) {
                return count
            }
        }
    }
    return count
}

let finalPathsP2 = {}

function recurp2(node, visited = [], twoVisit = null) {
    if (isLowerCase(node)) {
        let c = countArray(visited, node)
        if (c >= 2) {
            return
        } else if (c == 1) {
            if (twoVisit == null) {
                twoVisit = node
            } else {
                return
            }
        }
    }
    if (node == "end") {
        visited.push(node)
        let join = visited.join(',')
        if (!finalPathsP2[join]) {
            finalPathsP2[join] = true
        }
        return
    }
    visited.push(node)
    let possible = paths[node].prevs.concat(paths[node].forwards)
    possible.forEach((e) => {
        if (e != "start") {
            recurp2(e, [...visited], twoVisit)
        }
    })
}

recurp1("start")
console.log("p1 :", Object.entries(finalPathsP1).length);
recurp2("start")
console.log("p2 :", Object.entries(finalPathsP2).length);