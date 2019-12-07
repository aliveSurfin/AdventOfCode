var treeStruct;
var treeData;
var part1 = 0;
var part2 = 2147000000;
class orbit {
    constructor(a, b, c) {
        this.name = a;
        this.parent = c;
        this.value = 10;
        this.orbits = b;
        this.children = new Array();

    }
    dfind(label) {
        if (this.name == label) {
            return true;
        }
        for (let x = 0; x < this.children.length; x++) {
            if (this.children[x].dfind(label)) {
                return true;
            }
        }
        return false;
    }
    getOrbits(label) {
        if (this.name == label) {
            return this.orbits;
        }
        for (let x = 0; x < this.children.length; x++) {
            if (this.children[x].dfind(label)) {
                return this.children[x].getOrbits(label);
            }
        }
        return false;
    }
    insert(parent, child, orbits) {
        orbits++;
        if (this.name == parent) {
            part1 += orbits;
            this.children.push(new orbit(child, orbits, parent));
        }
        for (let x = 0; x < this.children.length; x++) {
            this.children[x].insert(parent, child, orbits);
        }

    }

}
var part2parent;
function part2f(o) {
    if (o.dfind("YOU") && o.dfind("SAN")) {
        var b = (o.getOrbits("YOU") + o.getOrbits("SAN")) - (o.orbits * 2);
        if (b < part2) {
            part2 = b;
            part2parent = o.name;
        }
        for (let x = 0; x < o.children.length; x++) {
            part2f(o.children[x]);
        }
    }
}
function setPart2path(o) {
    if (o.dfind("YOU") && o.dfind("SAN")) {
        if (o.name == part2parent) {
            setPathRec(o, "YOU");
            setPathRec(o, "SAN");
        }
        for (let x = 0; x < o.children.length; x++) {
            setPart2path(o.children[x]);
        }
    }
}
function setPathRec(o, label) {
    if (o.dfind(label)) {
        o.value = 11; // set path value for tree vis
        for (let x = 0; x < o.children.length; x++) {
            if (o.children[x].dfind(label)) {
                setPathRec(o.children[x], label);
            }
        }
    }
}
function replacer(key, value) {
    if (key == "orbits") return undefined;
    else if (key == "children") {
        if (value.length == 0) {
            return undefined
        } else {
            return value;
        }
    }
    else return value;
}
function calculateAndDisplay(input) {


    input = input.split("\n");
    var orbitsmeme = new orbit("COM", 0, "basenode");
    var i = 0;
    do {
        for (let x = 0; x < input.length; x++) {
            // console.log(input[x].substring(0, pos), input.length, " ", newInput.length);
            var comp = input[x].trim().split(")");
            if (orbitsmeme.dfind(comp[0]) && !orbitsmeme.dfind(comp[1])) {
                orbitsmeme.insert(comp[0], comp[1], orbitsmeme.orbits);
                i++;
            }
        }

    } while (i < input.length);

    console.log("DOING PART 2");
    part2f(orbitsmeme);
    setPart2path(orbitsmeme);
    console.log(part1);
    console.log(part2 - 2);
    treeData = JSON.stringify(orbitsmeme, replacer);
    treeData = JSON.parse(treeData);
    console.log(treeData);
    var p1 = document.createElement("h1");
    p1.innerHTML = " Part 1 : " + part1;
    var p2 = document.createElement("h1");
    p2.innerHTML = " Part 2 : " + (part2 - 2);
    document.body.appendChild(p1);
    document.body.appendChild(p2);




    // var nodeStruct = new nodeStructure();
    // nodeStruct.children = JSON.stringify(orbitsmeme, replacer);
    // treeStruct = new tree_structure(nodeStruct);

}
