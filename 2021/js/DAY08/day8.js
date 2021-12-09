//WARNING // READING THIS FILE WILL GIVE YOU HEMORRHOIDS

let readfile = require('../utils/readfile');
// 0:      1:      2:      3:      4:
// aaaa    ....    aaaa    aaaa    ....
// b    c  .    c  .    c  .    c  b    c
// b    c  .    c  .    c  .    c  b    c
// ....    ....    dddd    dddd    dddd
// e    f  .    f  e    .  .    f  .    f
// e    f  .    f  e    .  .    f  .    f
// gggg    ....    gggg    gggg    ....

//  5:      6:      7:      8:      9:
// aaaa    aaaa    aaaa    aaaa    aaaa
// b    .  b    .  .    c  b    c  b    c
// b    .  b    .  .    c  b    c  b    c
// dddd    dddd    ....    dddd    dddd
// .    f  e    f  .    f  e    f  .    f
// .    f  e    f  .    f  e    f  .    f
// gggg    gggg    ....    gggg    gggg

//0 6
//1 2
//2 5
//3 5
//4 4
//5 5
//6 6
//7 3
//8 7
//9 6
let data = readfile(false)
let count = 0;
let p1 = 0;
data.forEach((e) => {
    //

    let numbers = []
    for (let x = 0; x < 7; x++) {
        numbers.push('-')
    }
    // 0000
    // 1  2
    // 1  2
    // 3333
    // 4  5
    // 4  5
    // 6666
    let test = e.split('|')
    let signals = test[0].split(' ')
    let output = test[1].trim().split(' ')
    let numberMap = {}
    signals.forEach((f, i) => {
        switch (f.length) {
            case 2:
                numberMap[1] = f.split('');
                break;
            case 3:
                numberMap[7] = f.split('');
                break;
            case 4:
                numberMap[4] = f.split('');
                break;
            case 7:
                numberMap[8] = f.split('');
                break;
            default:
                break;
        }
    })
    output.forEach((f, i) => {
        switch (f.length) {
            case 2:
                p1++;
                break;
            case 3:
                p1++;
                break;
            case 4:
                p1++;
                break;
            case 7:
                p1++;
                break;
            default:
                break;
        }
    })


    numbers[0] = numberMap[7].filter(x => !numberMap[1].includes(x))[0];


    let len5 = []
    signals.forEach((f) => {
        //
        //
        if (f.length == 5) {
            len5.push(f.split(''))
        }
    })

    //len5 is 3 2 or 5
    let len5map = {}

    len5.forEach((f) => {

        f.forEach((g) => {
            if (len5map[g]) {
                len5map[g] += 1;
            } else {
                len5map[g] = 1
            }
        })
    })

    Object.keys(len5map).forEach(function(key) {
        //left hand side are both 1 
        // we can differentiate between using 4
        if (len5map[key] == 1) {
            if (numberMap[4].includes(key)) {
                numbers[1] = key
            } else {
                numbers[4] = key;
            }
        }

    });


    //find middle and bottom
    numberMap[8].forEach((f) => {
        if (!numberMap[7].includes(f) && numbers[1] != f && numbers[4] != f) {
            if (numberMap[4].includes(f)) {
                numbers[3] = f
            } else {
                numbers[6] = f
            }
        }
    })

    // finding out position 4 allows us to figure out some things
    // len 6 without pos 4 is 9
    //  // this also means that len 6 with pos 4 is 6 or 0 
    //  //  // depending if it has pos 3

    signals.forEach((f) => {
        if (f.length == 6) {
            if (f.includes(numbers[4])) {
                //6 or 0
                if (f.includes(numbers[3])) {
                    numberMap[6] = f.split('')
                } else {
                    numberMap[0] = f.split('')
                }

            } else {
                numberMap[9] = f.split('')
            }
        }

    })

    // diff between 8 and 6 is pos 2
    numberMap[8].forEach((f) => {
        if (!numberMap[6].includes(f)) {
            numbers[2] = f;
        }
    })


    //now we just need to find 2 3 and 5
    // we can purely differentiate this by the left side
    // 3 has neither 1 or 4
    // 5 has only 1
    // 2 has only 4
    signals.forEach((f) => {
        if (f.length == 5) {
            if (!f.includes(numbers[1]) && !f.includes(numbers[4])) {
                numberMap[3] = f.split('')
            } else
            if (f.includes(numbers[1]) && !f.includes(numbers[4])) {
                numberMap[5] = f.split('')
            } else
            if (!f.includes(numbers[1]) && f.includes(numbers[4])) {
                numberMap[2] = f.split('')
            }
        }
    })

    //reverse this bish
    let revNumberMap = {}
    Object.keys(numberMap).forEach(function(key) {
        revNumberMap[numberMap[key].sort((a, b) => a.localeCompare(b)).join('')] = key
    })

    //map each output to it's number // add to string
    let outputcomb = ""
    output.forEach((f) => {

        outputcomb += revNumberMap[f.split('').sort((a, b) => a.localeCompare(b)).join('')]


    })
    count += parseInt(outputcomb)
})
console.log("p1: ", p1);
console.log("p2: ", count);