

function draw(canvas, orbs) {
    setInterval(function () {
        var context = canvas.getContext("2d");
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        console.log(orbs.planets.length);

        for (let i = 0; i < orbs.planets.length; i++) {
            context.beginPath();
            context.fillStyle = orbs.planets[i].colour;
            context.strokeStyle = "black";
            context.arc(orbs.planets[i].x, orbs.planets[i].y, orbs.planets[i].z*20, 0, 2 * Math.PI, false);
            context.fill();
        }
        orbs.cycle();
    }, 1000, 200);

}
class orbits {
    constructor(p1, p2, p3, p4) {
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.p4 = p4;
        this.planets = new Array();
        this.planets.push(p1, p2, p3, p4);
    }
    cycle() {
        this.applyVelocity();
        this.updateVelocity();
    }
    applyVelocity() {
        for (let x = 0; x < this.planets.length; x++) {
            this.planets[x].applyVel();
        }
    }
    updateVelocity() {
        for (let x = 0; x < this.planets.length; x++) {
            for (let y = 0; y < this.planets.length; y++) {
                if (x == y) {
                    continue;
                }
                this.planets[x].calcAllVel(this.planets[y]);
            }
        }
    }

}
class planet {
    constructor(x, y, z, col) {
        this.x = (window.innerWidth / 2) + x;
        this.y = (window.innerHeight / 2) + y;
        this.z = z;
        this.xvel = 0;
        this.yvel = 0;
        this.zvel = 0;
        this.colour = col;
    }

    calcAllVel(p) {
        this.xvel += this.calcVel(this.x, p.x);
        this.yvel += this.calcVel(this.y, p.y);
        this.zvel += this.calcVel(this.z, p.z);
    }

    calcVel(a, b) {
        if (a < b) {
            return 1;
        } else if (a > b) {
            return -1;
        }
        return 0;
    }

    applyVel() {
        this.x += this.xvel;
        this.y += this.yvel;
        this.z += this.zvel;
    }

}
