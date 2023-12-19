import { Day } from "../../day";
import assert from "assert";

class Day13 extends Day {
  constructor() {
    super(__dirname, true);
  }
  
  grid: string[][] = []
  rows: string[] = []
  cols: string[] = []

  // isPerfectReflection(xRange: number[], yRange:[]){

  // }
  override solveP1(): void {
    this.grid = this.listOfStrings.map(e=>e.split(""))
    this.rows = [...this.listOfStrings]
    this.cols = this.input.split("\n")
    console.log(this.grid)
    console.log(this.rows)
    console.log(this.cols)

    let potentialRows :number[] = []
    let potentialCols :number[] = []

    /**
     * # * a * #
     * * # b # *
     * # * c * #
     * * # d # *
     */

    for(let x=1; x<this.grid[0].length; x++){
      let colPerfect = true
      for(let y=1; y<this.grid.length && colPerfect; x++){
        if(this.grid[y])
        let offset = 0
        for(let curX = x; x>=0; x--) {
          offset++
          if(this.grid[y][curX] == this.grid[y][x+offset]){

          }
        }
      }
    }
    // this.grid.forEach((row, y)=>{
    //   row.forEach((item, x)=>{
        
    //     let isPerfect = false

    //     //
    //   })
    // })
  }

  override solveP2(): void {}
}

new Day13().solve();

