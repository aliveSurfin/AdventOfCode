import { Day } from "../../day";
import assert from "assert";

class Day6 extends Day {

  constructor() {
    super(__dirname);
  }

  times: number[] = []
  distances: number[] = []

  solveRace(time: number, distance: number) {
    let lowerLimit = 0
    let upperLimit = 0

    for (let i = 1; i < time; i++) {
      if (i * (time - i) > distance) {
        lowerLimit = i
        break;
      }
    }

    for (let i = time - 1; i--; i > lowerLimit) {
      if (i * (time - i) > distance) {
        upperLimit = i
        break;
      }
    }
    return upperLimit - lowerLimit + 1

  }

  override solveP1(): void {
    this.times = this.listOfStrings[0].split(":")[1].trim().split(/\s+/).map(e => parseInt(e))
    this.distances = this.listOfStrings[1].split(":")[1].trim().split(/\s+/).map(e => parseInt(e))

    let possible = this.times.map((t, i) => {
      return (this.solveRace(t, this.distances[i]))
    })

    this.p1 = possible.reduce(this.multiply)
    assert(this.p1 == 1312850)
  }



  override solveP2(): void {
    let time = parseInt(this.times.map(e => `${e}`).join(''))
    let distance = parseInt(this.distances.map(e => `${e}`).join(''))
    this.p2 = this.solveRace(time, distance)
    assert(this.p2 == 36749103)
  }
}

new Day6().solve();
