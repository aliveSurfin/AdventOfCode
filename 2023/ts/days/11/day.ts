import { Day } from "../../day";
import assert from "assert";

type Point = {
  x: number;
  y: number;
  parent: Point | null;
  char: string;
};

class Day11 extends Day {
  clone(point: Point) {
    return {
      x: point.x,
      y: point.y,
      parent: point.parent,
      char: point.char,
    };
  }
  constructor() {
    super(__dirname, true);

    this.grid = this.listOfStrings.map((e) => e.split(""));

    let cols: boolean[] = new Array(this.grid[0].length).fill(false);
    let rows: boolean[] = new Array(this.grid.length).fill(false);

    this.grid.forEach((row, y) => {
      row.forEach((item, x) => {
        if (item == "#") {
          cols[x] = true;
          rows[y] = true;
        }
      });
    });
    let added = 0;
    rows.forEach((hasPlanet, i) => {
      if (!hasPlanet) {
        this.grid[i] = new Array(this.grid[i].length).fill("*");
      }
    });
    added = 0;
    cols.forEach((hasPlanet, i) => {
      if (!hasPlanet) {
        for (let y = 0; y < this.grid.length; y++) {
          this.grid[y][i] = "*";
        }
      }
    });
  }

  grid: string[][] = [];

  safeAddToList(
    point: Point,
    deltaX: number,
    deltaY: number
  ): Point | null {
    let x = point.x + deltaX;
    let y = point.y + deltaY;
    try {
      let char = this.grid[y][x];
      if (char == undefined) {
        return null;
      }
      return {
        x: x,
        y: y,
        parent: point,
        char,
      };
    } catch {
      return null;
    }
  }

  manhattan(planetA: Point, planetB: Point) {
    let dist =
      Math.abs(planetA.x - planetB.x) + Math.abs(planetA.y - planetB.y);
    return dist;
  }

  pathfind(start: Point, end: Point) {
    let closed: { [id: string]: Point } = {};
    let open: Point[] = [];
    open.push(start);
    let found: Point | null = null;
    let iterations = 0;
    while (open.length > 0) {
      open = open.sort((a, b) => {
        let manA = this.manhattan(a, end);
        let manB = this.manhattan(b, end);

        if (manA < manB) {
          return -1;
        }

        if (manA > manB) {
          return 1;
        }
        return 0;
      });
      //@ts-ignore
      let cur: Point = open.shift();
      closed[`${cur.x}-${cur.y}`] = cur;
      if (cur.x == end.x && cur.y == end.y) {
        found = cur;
        break;
      }
      let adj: Point[] = [];
      let directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ];
      directions.forEach((e) => {
        let dirSafe = this.safeAddToList(cur, e[0], e[1]);
        if (dirSafe != null) {
          adj.push(dirSafe);
        }
      });
      adj.forEach((e) => {
        if (closed[`${cur.x}-${cur.y}`] != null) {
          open.push(e);
        }
      });
    }

    return found;
  }
  override solveP1(): void {
    let planets: Point[] = [];
    this.grid.forEach((row, y) => {
      row.forEach((item, x) => {
        if (item == "#") {
          planets.push({ x, y, parent: null, char: "#" });
        }
      });
    });
    let dists: { [name: string]: number } = {};
    let dists2: { [name: string]: number } = {};
    planets.forEach((planetA, a) => {
      console.log(a)
      planets.forEach((planetB, b) => {
        let id = `${Math.min(a + 1, b + 1)} ${Math.max(a + 1, b + 1)}`
        if (
          a != b &&
          dists[id] !== null
        ) {
          let found = this.pathfind(planetA, planetB);
          let expanded = 0
          let other = 0
          while (found!= null && found.parent != null) { // removing either side works
            if(found.char=="*"){
              expanded++
            }else{
              other ++
            }
            found = found.parent;
          }
          dists[id] = (expanded * 2) + other
          dists2[id] = (expanded* 10) + other
        }
      });
    });
    console.log()
    this.p1 = Object.values(dists).reduce(this.sum);
    this.p2 = Object.values(dists2).reduce(this.sum);
  }

  override solveP2(): void {}
}

new Day11().solve();
