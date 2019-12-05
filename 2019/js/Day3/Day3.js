function map(value, min, max, size) {
    return (((value - min) / (max - min)) * (size));
}
class point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class vector {
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
    }
}
function intersect(v1, v2) {
    var p; // point;
    if (v1.p1.x != v1.p2.x) {
        // v1 is horizontal
        if (v2.p1.x == v2.p2.x) {
            // v2 is vertical
            if (between(v1.p1.y, v2.p1.y, v2.p2.y)) {
                if (between(v2.p1.x, v1.p1.x, v1.p2.x)) {
                    // r = point{x: v2.p1.x, y: v1.p1.y}
                    p = new point(v2.p1.x, v1.p1.y);
                    return p;
                    // return r, v1.distance - distance(v1.p2, r) + v2.distance - distance(v2.p2, r), nil
                }
            }
        }
    } else {
        // v1 is vertical
        if (v2.p1.x != v2.p2.x) {
            // v2 is horizontal
            if (between(v2.p1.y, v1.p1.y, v1.p2.y)) {
                if (between(v1.p1.x, v2.p1.x, v2.p2.x)) {
                    // r = point{y: v2.p1.y, x: v1.p1.x}
                    p = new point(v2.p1.y, v1.p1.x);
                    // return r, v1.distance - distance(v1.p2, r) + v2.distance - distance(v2.p2, r), nil
                }
            }
        }
    }

    // return r, 0, errors.New("no intersection")
    return "NO";
}
function between(p, a, b) {
    return ((p <= b && p >= a) || (p >= b && p <= a));
}
function distance(p1, p2) {
    return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
}

function calculateAndDisplay(commands1, commands2) {

    commands1 = commands1.split(",");
    commands2 = commands2.split(",");
    commands1.unshift("R0");
    commands2.unshift("R0");
    var canvas = document.getElementById("myCanvas");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    var curx = document.getElementById("myCanvas").width;
    var startx = curx;
    var cury = document.getElementById("myCanvas").height;
    var starty = cury;

    var ctx = canvas.getContext("2d");
    curx /= 2;
    cury /= 2;

    var maxw = 0;
    var minw = 0;
    var maxh = 0;
    var minh = 0;
    var points1 = new Array();
    var points2 = new Array();
    curx = 0;
    cury = 0
    for (let a = 0; a < commands1.length; a++) { // parse commands 1
        var curvalue = parseInt(commands1[a].substr(1));

        if (commands1[a][0] == 'L') {
            var x = curx - curvalue;
            points1.push(new point(x, cury));
            curx = x;
        } else if (commands1[a][0] == 'R') {
            var x = curx + curvalue;
            points1.push(new point(x, cury));
            curx = x;
        } else if (commands1[a][0] == 'U') {
            var y = cury + curvalue;
            points1.push(new point(curx, y));
            cury = y;
        } else if (commands1[a][0] == 'D') {
            var y = cury - curvalue;
            points1.push(new point(curx, y));
            cury = y;
        }
    }
    curx = 0;
    cury = 0
    for (let a = 0; a < commands2.length; a++) { // parse commands 2
        var curvalue = parseInt(commands2[a].substr(1));
        if (commands2[a][0] == 'L') {
            var x = curx - curvalue;
            points2.push(new point(x, cury));
            curx = x;
        } else if (commands2[a][0] == 'R') {
            var x = curx + curvalue;
            points2.push(new point(x, cury));
            curx = x;
        } else if (commands2[a][0] == 'U') {
            var y = cury + curvalue;
            points2.push(new point(curx, y));
            cury = y;
        } else if (commands2[a][0] == 'D') {
            var y = cury - curvalue;
            points2.push(new point(curx, y));
            cury = y;
        }
    }
    for (let a = 0; a < points1.length; a++) { // get max of points1
        if (commands1[a][0] == 'L' || commands1[a][0] == 'R') {
            if (maxw < points1[a].x) {
                maxw = points1[a].x;
            }
            if (minw > points1[a].x) {
                minw = points1[a].x;
            }
        } else {
            if (maxh < points1[a].y) {
                maxh = points1[a].y;
            }
            if (minh > points1[a].y) {
                minh = points1[a].y;
            }
        }

    }
    for (let a = 0; a < points2.length; a++) { // get max of points2
        if (commands1[a][0] == 'L' || commands1[a][0] == 'R') {
            if (maxw < points2[a].x) {
                maxw = points2[a].x;
            }
            if (minw > points2[a].x) {
                minw = points2[a].x;
            }
        } else {
            if (maxh < points2[a].y) {
                maxh = points2[a].y;
            }
            if (minh > points2[a].y) {
                minh = points2[a].y;
            }
        }

    }
    curx = startx / 2;
    cury = starty / 2;
    ctx.beginPath();
    ctx.strokeStyle = "#FF0000";
    ctx.moveTo(map(0, minw, maxw, startx), map(0, minh, maxh, starty));
    for (let a = 0; a < points1.length; a++) {
        var x = map(points1[a].x, minw, maxw, startx);
        var y = map(points1[a].y, minh, maxh, starty);
        ctx.lineTo(x, y);
    }
    ctx.stroke();

    ctx.strokeStyle = "#00FF00";
    ctx.beginPath();
    ctx.moveTo(map(0, minw, maxw, startx), map(0, minh, maxh, starty));
    for (let a = 0; a < points2.length; a++) {
        var x = map(points2[a].x, minw, maxw, startx);
        var y = map(points2[a].y, minh, maxh, starty);
        ctx.lineTo(x, y);
    }
    ctx.stroke();
    var closestDist = 2147000000;
    var closestPoint;
    var startPoint = new point(map(0, minw, maxw, startx), map(0, minh, maxh, starty));
    for (let a = 0; a < points1.length - 1; a++) {
        for (let b = 0; b < points2.length - 1; b++) {
            var points1vector = new vector(points1[a], points1[a + 1]);
            var points2vector = new vector(points2[b], points2[b + 1]);
            if (intersect(points1vector, points2vector) != "NO") {

                ctx.strokeStyle = "#FFFF00";
                var iPoint = intersect(points1vector, points2vector);
                console.log(distance(iPoint, new point(0, 0)));
                if (closestDist > distance(iPoint, new point(0, 0)) && distance(iPoint, new point(0, 0)) != 0) {
                    closestDist = distance(iPoint, new point(0, 0));
                    closestPoint = iPoint;
                }

                ctx.beginPath();
                ctx.arc(map(iPoint.x, minw, maxw, startx), map(iPoint.y, minh, maxh, starty), startx * .01, 0, 2 * Math.PI)
                ctx.stroke();
            }
        }
    }
    ctx.strokeStyle = "#0000FF";
    ctx.beginPath();
    ctx.arc(map(0, minw, maxw, startx), map(0, minh, maxh, starty)
        , startx * .01, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.strokeStyle = "#000000";
    ctx.beginPath();
    ctx.arc(map(closestPoint.x, minw, maxw, startx), map(closestPoint.y, minh, maxh, starty), startx * .01, 0, 2 * Math.PI)
    ctx.stroke();
    console.log(closestDist);
    console.log(closestPoint);

}