import { Day } from "../../day";

//@ts-ignore
import assert from "assert";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

//@ts-ignore
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class Day10 extends Day {
  constructor() {
    super(__dirname, false);
  }

  grid: number[][] = [];
  trailHeads: [number, number][] = [];

  /** Input
   * 
...0...
...1...
...2...
6543456
7.....7
8.....8
9.....9
   */

  getAdjacent(x: number, y: number): [number, number][] {

    let elevation = this.grid[y][x];
    let adjacent: [number, number][] = [];

    if (x > 0) {
      adjacent.push([x - 1, y]);
    }
    if (x < this.grid[y].length - 1) {
      adjacent.push([x + 1, y]);
    }
    if (y > 0) {
      adjacent.push([x, y - 1]);
    }
    if (y < this.grid.length - 1) {
      adjacent.push([x, y + 1]);
    }

    return adjacent.filter(
      ([adjX, adjY]) => elevation + 1 === this.grid[adjY][adjX]);
  }

  findTrails(x: number, y: number, 
    visited: Set<string> = new Set<string>()
  ): number {
    let count = 0;
    let adjacent = this.getAdjacent(x, y);

    for (let [adjX, adjY] of adjacent) {
      let key = `${adjX},${adjY}`;
      if (!visited.has(key)) {
        visited.add(key);
        if (this.grid[adjY][adjX] === 9) {
          count++;
        }
        count += this.findTrails(adjX, adjY, visited);
      }
    }

    return count;
  }

  findAllDistinctTrails(x: number, y: number,
    allPaths: Set<string>, 
    visited: Set<string> = new Set<string>(), 
    path: [number, number][] = [],
    ): void {
    let adjacent = this.getAdjacent(x, y);

    for (let [adjX, adjY] of adjacent) {
      let key = `${adjX},${adjY}`;
      if (!visited.has(key) && this.grid[adjY][adjX] >= this.grid[y][x]) {
        visited.add(key);
        path.push([adjX, adjY]);
        if (this.grid[adjY][adjX] === 9) {
          allPaths.add(path.toString());
        } else {
          this.findAllDistinctTrails(adjX, adjY, allPaths, visited, path);
        }
        path.pop();
        visited.delete(key); 
      }
    }
  }


  solveP1(): void {
    this.grid = this.listOfStrings.map((line) => line.split("").map((cell) => parseInt(cell)));

    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[y].length; x++) {
        if (this.grid[y][x] == 0) {
          this.trailHeads.push([x, y]);
        }
      }
    }

    this.trailHeads.forEach((trailHead) => {
      let allPaths = new Set<string>();
      this.p1 += this.findTrails(trailHead[0], trailHead[1]);
      this.findAllDistinctTrails(trailHead[0], trailHead[1], allPaths);
      this.p2 += Array.from(allPaths).length;
    });

    assert(this.p1 == 674)
  }

  solveP2(): void {;
    assert(this.p2 == 1372)
  }
}

new Day10().solve();
