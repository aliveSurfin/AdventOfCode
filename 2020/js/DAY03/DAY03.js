const fs = require('fs')

function readFile(path) {
    var text = fs.readFileSync(path, 'utf8')
    return text;
}

function toArray(d, del) {
    return d.split(del);
}
function traverse(right, down, test) {
    let treecount = 0;
    let y = 0;
    let x = 0;
    while (y < test.length) {
        x = (x + right) % test[y].length;
        y += down;
        try {
            if (test[y][x] == '#') {
                treecount++;
            }
        } catch {
            break;
        }
    }
    console.log("tc", treecount);
    return treecount;
}
function main() {
    let test = toArray(readFile("input.txt"), "\n");
    let a = traverse(1, 1, test)
    let b = traverse(3, 1, test)
    let c = traverse(5, 1, test)
    let d = traverse(7, 1, test)
    let e = traverse(1, 2, test)

    console.log((a * b * c * d * e))

}
main();