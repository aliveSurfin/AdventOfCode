let readfile = require('../utils/readfile');

let data = readfile()

let sub = []
data.forEach((e) => {
    sub.push(e.split(''))
})

let opening = {
    '[': ']',
    '(': ')',
    '{': '}',
    '<': '>'
}
let score = 0;
let scores = []
sub.forEach((i) => {
        let stack = []
        let valid = true
        i.forEach((e) => {

            if (opening[e]) {
                stack.push(e)
            } else {
                if (opening[stack[stack.length - 1]] == e) {
                    stack.pop()
                } else {
                    switch (e) {
                        case ')':
                            score += 3
                            break;
                        case '}':
                            score += 1197
                            break;
                        case '>':
                            score += 25137
                            break;
                        case ']':
                            score += 57
                            break;
                    }
                    stack.pop()
                    valid = false
                }
            }
        })
        if (valid) {
            let fix = stack.reverse().map((e => { return opening[e] }))
            let points = { ')': 1, ']': 2, '}': 3, '>': 4 }
            let count = 0
            fix.forEach((x) => {
                count *= 5;
                count += points[x]

            })
            scores.push(count)
        }
    })
    //console.log(sub);
scores.sort(function(a, b) {
    return a - b;
});

console.log("p1 :", score);
console.log("p2 :", scores[Math.floor(scores.length / 2)]);