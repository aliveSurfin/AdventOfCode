import { Day } from "../../day";
import assert from "assert";

type Point = {
  x: number;
  y: number;
};

class Day11 extends Day {
  printGrid() {
    console.log(
      "  " +
        this.cols
          .map((e) => {
            return e == true ? " " : "v";
          })
          .join(" ")
    );
    for (let y = 0; y < this.rows.length; y++) {
      console.log(`${this.rows[y] ? " " : ">"} ${this.grid[y].join(" ")}`);
    }
  }

  constructor() {
    super(__dirname);

    this.grid = this.listOfStrings.map((e) => e.split(""));
    this.cols = new Array(this.grid[0].length).fill(true);
    this.rows = new Array(this.grid.length).fill(true);

    this.grid.forEach((row, y) => {
      row.forEach((item, x) => {
        if (item == "#") {
          this.cols[x] = false;
          this.rows[y] = false;
          this.planets.push({ x, y });
        }
      });
    });
  }
  cols: boolean[] = [];
  rows: boolean[] = [];
  grid: string[][] = [];
  planets: Point[] = [];

  override solveP1(): void {
    let dists: { [name: string]: number } = {};
    let dists2: { [name: string]: number } = {};
    for (let a = 0; a < this.planets.length; a++) {
      let planetA = this.planets[a];
      for (let b = 0; b < this.planets.length; b++) {
        let planetB = this.planets[b];
        let id = `${Math.min(a + 1, b + 1)} ${Math.max(a + 1, b + 1)}`;

        if (a != b && dists[id] == null) {
          let expanded = 0;
          let other = 0;
          let curX = planetA.x;
          let curY = planetA.y;
          while (true) {
            if (curX == planetB.x && curY == planetB.y) {
              break;
            }
            let xInc = curX < planetB.x ? +1 : -1;
            let yInc = curY < planetB.y ? +1 : -1;
            let manPosY =
              Math.abs(curY + yInc - planetB.y) + Math.abs(curX - planetB.x);
            let manPosX =
              Math.abs(curX + xInc - planetB.x) + Math.abs(curY - planetB.y);

            if (manPosX < manPosY) {
              curX += xInc;
              if (this.rows[curY] || this.cols[curX]) {
                expanded++;
              } else {
                other++;
              }
            } else {
              curY += yInc;
              if (this.rows[curY] || this.cols[curX]) {
                expanded++;
              } else {
                other++;
              }
            }
          }
          dists[id] = expanded * 2 + other;
          dists2[id] = expanded * 1000000 + other;
        }
      }
    }
    this.p1 = Object.values(dists).reduce(this.sum);
    this.p2 = Object.values(dists2).reduce(this.sum);
    assert(this.p1 == 10490062);
    assert(this.p2 == 382979724122);
  }

  override solveP2(): void {}
}

new Day11().solve();
