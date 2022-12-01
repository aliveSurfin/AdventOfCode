const fs = require('fs');


function readfile({ int = true, path = "input.txt", split = true } = {}) {
    try {
        let data = fs.readFileSync(path, 'utf8')
        if (split) {
            data = data.split('\n')
            return int ? data.map((e) => { return parseInt(e) }) : data
        }
        return data
    } catch (err) {
        console.error(err, path)
    }
}

module.exports = readfile;