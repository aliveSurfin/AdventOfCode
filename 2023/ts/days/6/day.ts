import { Day } from "../../day";
import assert from "assert";

class Day6 extends Day {

  constructor() {
    super(__dirname);
  }

  times: number[] = []
  distances: number[] = []

  solveRace(time: number, distance: number){
    let curPossible = 0
      let range = this.arrayRange(1, time - 1, 1)
      range.forEach((r) => {
        if ((r * (time - r)) > distance) {
          curPossible++
        }
      })
      return curPossible
  }

  override solveP1(): void {
    this.times = this.listOfStrings[0].split(":")[1].trim().split(/\s+/).map(e => parseInt(e))
    this.distances = this.listOfStrings[1].split(":")[1].trim().split(/\s+/).map(e => parseInt(e))
    let possible: number[] = []
    this.times.forEach((t, i) => {
      possible.push(this.solveRace(t, this.distances[i]))
    })
    this.p1 = possible.reduce(this.multiply)
  }



  override solveP2(): void {
    let time = parseInt( this.times.map(e=> `${e}`).join(''))
    let distance= parseInt( this.distances.map(e=> `${e}`).join(''))
    this.p2 = this.solveRace(time, distance)
  }
}

new Day6().solve();
