const fs = require('fs')

function readFile(path) {
    var text = fs.readFileSync(path, 'utf8')
    return text;
}

function toArray(d, del) {
    return d.split(del);
}
function main() {
    let test = toArray(readFile("input.txt"), "\n");
    let ids = [];
    let max = 0;
    let max2 = 0;
    let maxcur = 0;
    let wowee = "";
    for (let x = 0; x < test.length; x++) {
        let test2 = parseInt(test[x].split("L").join("0").split("R").join("1").split("B").join("0").split("F").join("1"));
            //replace("/R/g", "1").replace("/L/g", "0").replace("/F/g", "1").replace("/B/g", "0"));
        if(test2^maxcur!=test2){
            maxcur=test2;
            wowee = test[x];
        }
        let orig = 127;
        let upperRow = 127;
        let lowerRow = 0;
        let upperCol = 7;
        let lowerCol = 0;
        let finalrow = 0;
        let finalcol = 0;
        for (let y = 0; y < test[x].length; y++) {

            let value = test[x][y];
            switch (value) {

                case 'R':
                    upperCol = upperCol;
                    lowerCol = Math.floor(((upperCol + lowerCol) / 2) + 1)
                    break;
                case 'L':
                    upperCol = Math.floor((upperCol + lowerCol) / 2);
                    lowerCol = lowerCol;
                    break;
                case 'F':
                    upperRow = Math.floor((upperRow + lowerRow) / 2);
                    lowerRow = lowerRow;
                    break;
                case 'B':
                    upperRow = upperRow;
                    lowerRow = Math.floor(((upperRow + lowerRow) / 2) + 1)
                    break;
            }


            if (test[x].length - 1 != y) {
                if (test[x][y] == 'B' || test[x][y] == 'F') {
                    if (test[x][y + 1] == 'L' || test[x][y + 1] == 'R') {
                        if (upperRow - lowerRow <= 1) {
                            if (value == 'B') {
                                finalrow = upperRow;
                            } else {
                                finalrow = lowerRow;
                            }
                            let obj1 = { 'ur': upperRow, 'lr': lowerRow, 'uc': upperCol, 'lc': lowerCol, };
                            // console.log(obj1);
                        }
                    }
                }
            }
            if (y == test[x].length - 1) {
                if (value == 'R') {
                    finalcol = upperCol;
                } else {
                    finalcol = lowerCol
                }
                let obj1 = { 'ur': upperRow, 'lr': lowerRow, 'uc': upperCol, 'lc': lowerCol, };
                // console.log(obj1);
                let obj = { 'row': finalrow, 'col': finalcol, 'id': ((finalrow * 8) + finalcol), 'orig': test[x] }
                
                ids.push(obj);
                // console.log(obj);
                if (obj.id > max) {
                    max = obj.id;
                }
                if (obj.id == 901) {
                    console.log(obj);
                }

            }


            // let obj = { 'ur': upperRow, 'lr': lowerRow, 'uc': upperCol, 'lc': lowerCol, };
            // console.log(obj);
        }
    }
    console.log(max);
    console.log(wowee);
    let poss = [];
    for (let row = 1; row < 127; row++) {
        for (let col = 0; col < 8; col++) {
            let id = row * 8 + col;
            let found = true;
            for (let x = 0; x < ids.length; x++) {
                if (ids[x].id == id) {
                    found = false
                }
            }
            if (found) {
                poss.push(id);
            }
        }
    }
    for (let x = 0; x < poss.length; x++) {
        for (let y = 0; y < ids.length; y++) {
            if (ids[y].id - poss[x] == -1 || ids[y].id - poss[x] == 1) {
                console.log(poss[x]);
            }
        }
    }
}
main();