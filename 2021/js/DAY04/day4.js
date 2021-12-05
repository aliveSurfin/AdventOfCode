let readfile = require('../utils/readfile');

let data = readfile(false, './input.txt')
let numbers = data.shift().split(',')
let boards = [];
while (data.length) {
    let board = []
    for (let i = 0; i < 5; i++) {

        let temp = data.shift().split(' ').filter((e) => {
                return e != ''
            }).map((e) => { return parseInt(e) })
            // console.log(temp);
        board.push(temp)
    }
    boards.push(board)
}

function countBoard(board) {
    let sum = 0;
    board.forEach((e) => {
        e.forEach((f) => {
            if (typeof f == 'number') {
                sum += f
            }
        })
    })
    return sum;
}
let boardswon = [...Array(boards.length).keys()]
let firsthit = null;
numbers.forEach((e) => {
    e = parseInt(e)
    boards.forEach((board, i) => {
        board.forEach((row, j) => {
            let count = 0;
            let hit = false;
            boards[i][j] = row.map((f, k) => {
                if (f === e) {
                    count++;
                    hit = k
                    return true
                }
                if (f === true) {
                    count++;
                    return true
                }

                return f
            })

            let c = 0;

            if (hit !== false) {
                for (let y = 0; y < 5; y++) {
                    if (boards[i][y][hit] === true) {
                        c++;
                    } else {
                        break;
                    }
                }
            }
            //console.log(boardswon);
            if (count == 5 || c == 5) {
                boardswon = boardswon.filter((a) => {
                    return a !== i
                })
                if (firsthit == null) {
                    console.log("p1");
                    firsthit = true
                    console.log(countBoard(board) * e);
                }
                if (boardswon.length == 0) {
                    console.log("p2");
                    console.log(countBoard(board) * e);
                    process.exit()
                }
            }

        })

    })


})