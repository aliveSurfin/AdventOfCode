import { Day } from "../../day";

//@ts-ignore
import assert from "assert";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

//@ts-ignore
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



class Day06 extends Day {
  constructor() {
    super(__dirname, false);
  }

  directions = [
    [0, 1], // right
    [1, 0], // down
    [0, -1], // left
    [-1, 0] // up
  ];

  currentDirection = 3;
  grid: string[][] = [];
  startPos: [number, number] = null;

  changeDirection() {
    this.currentDirection = (this.currentDirection + 1) % 4;
  }

  override solveP1(): void {
    this.initializeGrid();
    this.printGrid();

    let pos = this.startPos;
    let visited = {};
    let visitedOrder = [];

    while (true) {
      visited[`${pos[0]}-${pos[1]}`] = true;
      visitedOrder.push([pos[0], pos[1]]);
      this.grid[pos[0]][pos[1]] = 'X';

      let nextPos: [number, number] = [
        pos[0] + this.directions[this.currentDirection][0],
        pos[1] + this.directions[this.currentDirection][1]
      ];

      if (this.isOutOfBounds(nextPos)){
        break;
      }
      if (this.isObstacle(nextPos)) {
        this.changeDirection();
        this.printGrid(nextPos);
      }else {
        pos = nextPos;
      }
    }

    this.p1 = Object.keys(visited).length;
    assert(this.p1 == 4778)
    this.printGrid();
  }

  initializeGrid() {
    this.grid = this.listOfStrings.map((line, i) => {
      if (line.indexOf("^") !== -1) {
        this.startPos = [i, line.indexOf("^")];
      }
      return line.split('');
    });
  }

  isOutOfBounds(pos: [number, number]): boolean {
    return pos[0] < 0 || pos[0] >= this.grid.length || pos[1] < 0 || pos[1] >= this.grid[0].length;
  }

  isObstacle(pos: [number, number]): boolean {
    return this.grid[pos[0]][pos[1]] == '#' || this.grid[pos[0]][pos[1]] == '0';
  }

  printGrid(pos: [number, number] = null) {
    return
    if (pos) {
      this.grid.forEach((row, i) => {
        console.log(row.map((c, j) => j === pos[1] && i === pos[0] ? '*' : c).join(''));
      });
    } else {
      console.log(this.grid.map(row => row.join('')).join('\n'));
    }
  }

  override solveP2(): void {

    // loop over every position in the original grid and add all those positions to a list that are not an obstacle or starting position
    let positions = [];
    this.initializeGrid();
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[0].length; j++) {
        if (this.grid[i][j] !== '#' && this.grid[i][j] !== '^') {
          positions.push([i, j]);
        }
      }
    }

    // loop over all those positions, re initialize the grid and make that an obstacle

    let count =0;
    //positions = [[6,3]]

    positions.forEach((newObstacle) => {

      this.initializeGrid();
      this.grid[newObstacle[0]][newObstacle[1]] = '0';

      this.printGrid();
      
      let pos = this.startPos;
      this.currentDirection = 3;
      let visited = {};
      let visitedOrder = [];

      while (true) {
        //count how many times we visit this position
        
        visited[`${pos[0]}-${pos[1]}`] = visited[`${pos[0]}-${pos[1]}`] ? visited[`${pos[0]}-${pos[1]}`] + 1 : 1;
        
        
        if (visited[`${pos[0]}-${pos[1]}`] > 3) {
          this.p2++;
          break;
        }

        visitedOrder.push([pos[0], pos[1]]);
        this.grid[pos[0]][pos[1]] = 'X';

        let nextPos: [number, number] = [
          pos[0] + this.directions[this.currentDirection][0],
          pos[1] + this.directions[this.currentDirection][1]
        ];

        
        
        //check if out of bounds or if we have visited this position before
        //check if we have visited this position before
        if (this.isOutOfBounds(nextPos)){
          break;
        }
        if (this.isObstacle(nextPos)) {
          this.changeDirection();
          this.printGrid(nextPos);
        }else {
          pos = nextPos;
          
        }
      }
      this.printGrid();

    });
    assert(this.p2 == 1618)
  }
}

new Day06().solve();