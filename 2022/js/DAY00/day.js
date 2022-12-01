let readfile = require('../utils/readfile');

let data = readfile({ int: true, split: true })

data.forEach((e) => {
    //console.log(e);
})