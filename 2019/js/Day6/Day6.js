var part1 = 0;
var part2 = 2147000000;
class orbit {
    constructor(a, b, c) {
        this.parent = c;
        this.name = a;
        this.orbits = b;
        this.suborbits = new Array();
    }
    find(label) {
        if (this.name == label) {
            return true;
        }
        for (let x = 0; x < this.suborbits.length; x++) {
            if (this.suborbits[x].find(label)) {
                return true;
            }
        }
        return false;
    }
    getOrbits(label) {
        if (this.name == label) {
            return this.orbits;
        }
        for (let x = 0; x < this.suborbits.length; x++) {
            if (this.suborbits[x].find(label)) {
                return this.suborbits.at(x).getOrbits(label);
            }
        }
        return false;
    }
    insert(parent, child, orbits) {
        orbits++;
        if (name == parent) {
            part1 += orbits;
            this.suborbits.push(new orbit(child, orbits, parent));
        }
        for (let x = 0; x < this.suborbits.length; x++) {
            this.suborbits[x].insert(parent, child, orbits);
        }

    }

}
function part2f(o) {
    if (o.find("YOU") && o.find("SAN")) {
        var b = (o.getOrbits("YOU") + o.getOrbits("SAN")) - (o.orbits * 2);
        if (b < part2) {
            part2 = b;
        }
        for (let x = 0; x < o.suborbits.length; x++) {
            part2(o.suborbits[x]);
        }
    }
}
function calculateAndDisplay(input) {
    input = input.split("\n");
    orbits = new orbit("COM", 0, "");
    var newInput = input;
    var i =0;
    do {
        for (let x = 0; x < input.length; x++) {

            // console.log(input[x].substring(0, pos), input.length, " ", newInput.length);
            var comp = input[x].trim().split(")");
            if (orbits.find(comp[0]) && !orbits.find(comp[1])) {
                orbits.insert(comp[0], comp[1], orbits.orbits)
                console.log("inserted", input[x])
                i++;
            }
        }

    } while (i < input.length);
    console.log("DOING PART 2");
    part2f(orbits);
    console.log(part1);
    console.log(part2);

}
