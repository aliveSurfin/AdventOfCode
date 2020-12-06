const fs = require('fs')

function readFile(path) {
    var text = fs.readFileSync(path, 'utf8')
    return text;
}

function toArray(d, del) {
    return d.split(del);
}
function countChars(s, c) {
    let cnt = 0;
    for (let x = 0; x < s.length; x++) {
        if (s[x] == c) {
            cnt++;
        }
    }
    return cnt;
}
function fast() {
    let file = readFile("input.txt")
    let curindex = 0;
    let curunq = "";
    let curall = "";
    for (let x = 0; x < file.length; x++) {
        curall += file[x];
        curunq += curunq.includes(file[x]) ? "" : file[x];
        if (file[x] + file[x + 1] == '\n\n') {
            //console.log(curall);
            curall = ""
        }
    }
}
function slow() {
    let test = toArray(readFile("input.txt"), "\n\n");
    let groupcount = 0;
    let p1count = 0;
    for (let a = 0; a < test.length; a++) {
        let flat = test[a].replace(/\n/g, '');
        let unq = "";
        for (let i = 0; i < flat.length; i++) {
            if (!unq.includes(flat[i])) {
                unq += flat[i];
            }
        }
        let peoplecount = countChars(test[a], '\n') + 1;
        let count = 0;
        for (let x = 0; x < unq.length; x++) {
            if (countChars(flat, unq[x]) == peoplecount) {
                count++;
            }
        }
        groupcount += count;
        p1count += unq.length;
    }
    console.log('p1', p1count);
    console.log("p2", groupcount);
}
function main() {
    slow();
}
main();