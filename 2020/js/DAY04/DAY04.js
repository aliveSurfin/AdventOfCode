const fs = require('fs')

function readFile(path) {
    var text = fs.readFileSync(path, 'utf8')
    return text;
}

function findKeys(a, keys) {

    valid = true;
    for (let x = 0; x < keys.length; x++) {
        if (!(keys[x] in a)) {
            return false
        }
    }
    return true;
}
function validkeys(key, value) {
    let validpassport = true;
    switch (key) {
        case "byr":
            if (value.length != 4) {
                validpassport = false;
            }
            value = parseInt(value);
            if (value < 1920 || value > 2002) {
                validpassport = false;;
            }
            break;
        case "iyr":
            if (value.length != 4) {
                validpassport = false;
            }
            value = parseInt(value);
            if (value < 2010 || value > 2020) {
                validpassport = false;;
            }
            break;
        case "eyr":
            if (value.length != 4) {
                validpassport = false;
            }
            value = parseInt(value);
            if (value < 2020 || value > 2030) {
                validpassport = false;;
            }
            break;
        case "hgt":
            if (value.includes("cm")) {
                let a = value.split("cm")
                a = parseInt(a[0])
                if (a < 150 || a > 193) {
                    validpassport = false;;
                }

            } else if (value.includes("in")) {
                let a = value.split("in")
                a = parseInt(a[0])
                if (a < 59 || a > 76) {
                    validpassport = false;;
                }
            } else {
                validpassport = false;
            }
            break;
        case "hcl":
            if (value[0] != '#' || value.length != 7) {
                validpassport = false;
            } else {
                var regex = new RegExp("^[a-z0-9\s]+$");
                if (regex.test(value.split('#'[0]))) {
                    validpassport = false;
                }
            }
            break;
        case "ecl":
            let ecls = "amb blu brn gry grn hzl oth".split(" ");
            let valid = false;
            for (let x = 0; x < ecls.length; x++) {
                if (ecls[x] == value) {
                    valid = true;
                }
            }
            if (valid == false) {
                validpassport = valid;
            }
            break;
        case "pid":
            let reg = new RegExp('^[0-9]+$');
            if (reg.test(value)) {
                if (value.length != 9) {
                    validpassport = false;
                }
            } else {
                validpassport = false;
            }
            break;
        default:
            validpassport = false;;
            break;
    }
    return validpassport
}
function main() {
    let test = readFile("input.txt");
    let keys = "byr,iyr,eyr,hgt,hcl,ecl,pid".split(",");
    var split = test.split('\n\n');
    let passports = [];
    for (let x = 0; x < split.length; x++) {
        let a = split[x].replace(/\n/g, ' ');
        let b = a.split(" ");
        let obj = {}
        for (let y = 0; y < b.length; y++) {
            let temp = b[y].split(":");
            obj[[temp[0]]] = temp[1];
        }
        passports.push(obj);
    }
    let pc = 0;
    let vpc = 0;
    for (let x = 0; x < passports.length; x++) {
        if (findKeys(passports[x], keys)) {
            pc++;
            let validpc = 0;
            for (var key of Object.keys(passports[x])) {
                if (validkeys(key, passports[x][key])) {
                    validpc++;
                }
            }

            if (validpc == 7) {
                vpc++;
            }
        }
    }
    console.log(pc);
    console.log(vpc)
}
main();