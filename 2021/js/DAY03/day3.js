let readfile = require('../utils/readfile');

let data = readfile()


let onecounts = new Array(data[0].length).fill(0)
console.log(+false);
console.log(+true);
data.forEach((e) => {
        e = e.split('')
        e.forEach((f, i) => {
            onecounts[i] += parseInt(e[i])
        })
    })
    //var b = parseInt( a, 2 );
let gamma = new Array(data[0].length).fill(0)
let epsilon = new Array(data[0].length).fill(0)
onecounts.forEach((e, i) => {
    if (e > data.length / 2) {
        gamma[i] = 1;
        epsilon[i] = 0;
    } else {
        gamma[i] = 0;
        epsilon[i] = 1;
    }
})
gamma = gamma.join('')
epsilon = epsilon.join('')


console.log(parseInt(gamma, 2) * parseInt(epsilon, 2));

//o2 mc
//co2 lc

let o2 = []
let co2 = []
    //if x > .length/2 
    //  
console.log(onecounts);
onecounts.forEach((e, i) => {
    if (e > data.length / 2) {
        onecounts[i] = 1;
    } else {
        onecounts[i] = 0;
    }
})
data.forEach((e) => {
    let split = e.split('').map((z) => {
        return parseInt(z)
    })
    if (split[0] == onecounts[0]) {
        //o2
        o2.push(e)
    } else {
        co2.push(e)
    }

})

//console.log(o2);
//console.log(co2);
let curpos = 1;
let tempCounts = new Array(data[0].length).fill(0)
for (let x = 0; x < o2.length; x++) {
    o2[x].split('').forEach((e, i) => {
        tempCounts[i] += parseInt(e)
    })
}
while (o2.length > 1) {
    let save = tempCounts[curpos] == o2.length / 2 ? 1 : tempCounts[curpos] > o2.length / 2 ? 1 : 0
    o2 = o2.filter((e) => {
        if (parseInt(e.charAt(curpos)) == save) {
            return true;
        }
        e.split('').forEach((f, i) => {
            tempCounts[i] += parseInt(f) * -1
        })
        return false;
    })
    curpos++;
}

curpos = 1;
tempCounts = new Array(data[0].length).fill(0)
for (let x = 0; x < co2.length; x++) {
    co2[x].split('').forEach((e, i) => {
        tempCounts[i] += parseInt(e)
    })
}
while (co2.length > 1) {

    let save = tempCounts[curpos] == co2.length / 2 ? 0 : tempCounts[curpos] > co2.length / 2 ? 0 : 1
    co2 = co2.filter((e) => {
        if (parseInt(e.charAt(curpos)) == save) {
            return true;
        }
        e.split('').forEach((f, i) => {
            tempCounts[i] += parseInt(f) * -1
        })
        return false;
    })
    curpos++;
}


console.log(parseInt(co2[0], 2) * parseInt(o2[0], 2));