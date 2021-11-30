const fs = require('fs');


function readfile(int = false, path = "./input.txt") {
    try {
        const data = fs.readFileSync(path, 'utf8').split('\n').filter(Boolean) // we do not like empty lines 
        return int ? data.map((e) => { return parseInt(e) }) : data
    } catch (err) {
        console.error(err, path)
    }
}

module.exports = readfile;