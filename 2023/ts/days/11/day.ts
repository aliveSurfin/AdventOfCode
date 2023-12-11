import { Day } from "../../day";
import assert from "assert";

type Point = {
  x: number;
  y: number;
  parent: Point | null;
  visited: boolean;
  char: string;
};

class Day11 extends Day {
  clone(point: Point) {
    return {
      x: point.x,
      y: point.y,
      parent: point.parent,
      visited: point.visited,
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
        // //console.log(item)
        if (item == "#") {
          cols[x] = true;
          rows[y] = true;
        }
      });
    });
    //console.log("cols", cols);
    //console.log("rows", rows);
    let added = 0;
    rows.forEach((hasPlanet, i) => {
      // if (!hasPlanet) {
      //   this.grid.splice(
      //     i + added+1,
      //     0,
      //     new Array(this.grid[0].length).fill("*")
      //   );
      // }
      if (!hasPlanet) {
        this.grid[i] = new Array(this.grid[i].length).fill("*");
      }
    });
    added = 0;
    //console.log("cols",cols)
    cols.forEach((hasPlanet, i) => {
      // if (!hasPlanet) {
      //   for (let y = 0; y < this.grid.length; y++) {
      //     this.grid[y].splice(i + added+1, 0, "*");
      //   }
      //   added++;
      // }
      if (!hasPlanet) {
        for (let y = 0; y < this.grid.length; y++) {
          this.grid[y][i] = "*";
        }
      }
    });
    //console.log(this.grid.map((e) => e.join("")).join("\n"));
  }

  grid: string[][] = [];

  safeAddToList(list: Point[], point: Point, deltaX: number, deltaY: number) {
    let x = point.x + deltaX;
    let y = point.y + deltaY;
    let newList = [...list];
    try {
      let char = this.grid[y][x];
      if (char == undefined) {
        return newList;
      }
      newList.push({
        x: x,
        y: y,
        parent: this.clone(point),
        char,
        visited: false,
      });
      return newList;
    } catch {
      return newList;
    }
  }

  manhattan(planetA: Point, planetB: Point) {
    let dist =
      Math.abs(planetA.x - planetB.x) + Math.abs(planetA.y - planetB.y);
    return dist;
  }

  pathfind(planetA: Point, planetB: Point) {
    let visited: Point[] = [];
    let queue: Point[] = [];
    let start = this.clone(planetA);
    start.visited = true;
    let end = this.clone(planetB);
    queue.push(start);
    let found: Point | null = null;
    let iterations = 0;
    while (queue.length > 0) {
      queue = queue.sort((a, b) => {
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
      let cur: Point = this.clone(queue.shift());
      visited.push(this.clone(cur));
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
        adj = this.safeAddToList(adj, cur, e[0], e[1]);
      });
      adj.forEach((e) => {
        if (!visited.map((f) => `${f.x}-${f.y}`).includes(`${e.x}-${e.y}`)) {
          queue.push(e);
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
          planets.push({ x, y, parent: null, visited: false, char: "#" });
        }
      });
    });
    let dists: { [name: string]: number } = {};
    let dists2: { [name: string]: number } = {};
    planets.forEach((planetA, a) => {
      
      planets.forEach((planetB, b) => {
        console.log(a,b)
        if (
          a != b &&
          dists[`${Math.min(a + 1, b + 1)} ${Math.max(a + 1, b + 1)}`] !== null
        ) {
          let found = this.pathfind(planetA, planetB);
          let path: Point[] = [];
          while (found != null) {
            path.push(found);
            found = found.parent;
          }
          path = path.filter((e) => !(e.x == planetA.x && e.y == planetA.y));
          dists[`${Math.min(a + 1, b + 1)} ${Math.max(a + 1, b + 1)}`] = path
            .map((e) => {
              return e.char == "*" ? 2 : 1;
            })
            .reduce(this.sum);
          dists2[`${Math.min(a + 1, b + 1)} ${Math.max(a + 1, b + 1)}`] = path
            .map((e) => {
              return e.char == "*" ? 10 : 1;
            })
            .reduce(this.sum);
        }
      });
    });


    this.p1 = Object.values(dists).reduce(this.sum)
    this.p2 = Object.values(dists2).reduce(this.sum)
  }

  override solveP2(): void {}
}

new Day11().solve();
