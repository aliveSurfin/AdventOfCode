import { Day } from "../../day";

//@ts-ignore
import assert from "assert";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

//@ts-ignore
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class Day04 extends Day {
  constructor() {
    super(__dirname, false);
  }

  grid: string[][] = [];

  override solveP1(): void {
    this.grid = this.listOfStrings.map((line) => line.split(''));

    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[y].length; x++) {
        if (this.grid[y][x] === 'X') {
          this.p1 += this.lookForXMASinEveryDirectionFromXCharLocation(x, y);
        }
      }
    }
    assert(this.p1 == 2639)
  }

  override solveP2(): void {
    for (let y = 1; y < this.grid.length-1; y++) {
      for (let x = 1; x < this.grid[y].length-1; x++) {
        if (this.grid[y][x] === 'A') {
          this.p2 += this.lookForXMASCrossInEveryDirectionFromACharLocation(x, y);
        }
      }
    }
    assert(this.p2 == 2005)
  }


  lookForXMASinEveryDirectionFromXCharLocation(x: number, y: number): number {
    let directions = [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
      [1, 1],
      [-1, 1],
      [1, -1],
      [-1, -1]
    ];

    let count = 0;
    for (let direction of directions) {
      let xDir = direction[0];
      let yDir = direction[1];

      let x1 = x + xDir;
      let y1 = y + yDir;
      let x2 = x1 + xDir;
      let y2 = y1 + yDir;
      let x3 = x2 + xDir;
      let y3 = y2 + yDir;

      //check that the 3 elements are within the grid
      if ( x3 >= 0 && x3 < this.grid[0].length && y3 >= 0 && y3 < this.grid.length &&
        this.grid[y1][x1] === 'M' && this.grid[y2][x2] === 'A' && this.grid[y3][x3] === 'S'
      ) {
        count++;
      }
    }
    return count
  }

  lookForXMASCrossInEveryDirectionFromACharLocation(x: number, y: number): number {
    let count = 0;

    let corners = [
      [x - 1, y - 1],
      [x + 1, y - 1],
      [x - 1, y + 1],
      [x + 1, y + 1]
    ];

    for (let corner of corners) {
      if (corner[0] < 0 || corner[0] >= this.grid[0].length || corner[1] < 0 || corner[1] >= this.grid.length) {
        return 0;
      }
    }

    const checks = [
      [0, 3],
      [1, 2],
      [2, 1],
      [3, 0]
  ];
  
  for (const [mIndex, sIndex] of checks) {
    if (this.grid[corners[mIndex][1]][corners[mIndex][0]] === 'M' && this.grid[corners[sIndex][1]][corners[sIndex][0]] === 'S') {
        count++;
    }
  }

    return count == 2 ? 1 : 0;
  }

}
  
new Day04().solve();
