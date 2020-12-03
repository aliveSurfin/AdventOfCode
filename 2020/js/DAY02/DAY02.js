const fs = require('fs')
function readFile(path) {
    var text = fs.readFileSync(path, 'utf8')
    return text;
}
function toArray(d, del) {
    return d.split(del);
}
function count(s, c) {
    let cnt = 0;
    for (let x = 0; x < s.length; x++) {
        if (s[x] == c) {
            cnt++;
        }
    }
    return cnt;
}
function main() {
    let validcount = 0;
    let validcountpart2 = 0;
    let test = toArray(readFile("test.txt"), "\n");
    let a = [];
    for (let x = 0; x < test.length; x++) {
        let c = test[x].split(":");
        let c1 = c[0].split(" ")[0];
        let c2 = c[0].split(" ")[1];
        c2.replace(":", " ");
        c2.replace(" ", " ");
        let d = c[1].replace(" ", "")
        let w = count(d, c2);

        let lower = parseInt(c1.split("-")[0])
        let higher = parseInt(c1.split("-")[1])
        if (w <= higher && w >= lower) {
            validcount++;
        }
        if (d[lower - 1] == c2 ^ d[higher - 1] == c2) {
            validcountpart2++;

        }

    }
    console.log("part1", validcount);
    console.log("part2", validcountpart2)
}
main();