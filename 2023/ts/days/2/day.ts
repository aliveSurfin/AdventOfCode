import { Day } from "../../day";
import assert from "assert";
class cube {
  num: number; type: string;
  constructor(inputString: string) {
    let split = inputString.trim().split(' ')
    this.num = parseInt(split[0])
    this.type = split[1]
  }
}

class Day2 extends Day {
  constructor() {
    super(__dirname);
  }

  override solveP1(): void {
    let maxes = { 'red': 12, 'blue': 14, 'green': 13 }
    
    this.p1 = this.listOfStrings.map((e) => {
      let cubes: cube[] = e.split(": ")[1].split(/,|;/).map(z => new cube(z))
      let id = parseInt(e.split(": ")[0].split("Game")[1].trim())

      let thisPossible = true;
      for (let x = 0; x < cubes.length; x++) {
        //@ts-ignore
        if (cubes[x].num > maxes[cubes[x].type]) {
          thisPossible = false; break
        }
      }
      return thisPossible ? id : 0
    }).reduce(this.sum)

    assert(this.p1 == 2617)
  }


  override solveP2(): void {
    this.p2 = this.listOfStrings.map((game) => {
      let maxGreen = 0;
      let maxBlue = 0;
      let maxRed = 0;
      game.split(": ")[1].split(/,|;/).map(cs => new cube((cs))).forEach((c) => {
        switch (c.type) {
          case 'red': {
            maxRed = Math.max(c.num, maxRed); break;
          }
          case 'blue': {
            maxBlue = Math.max(c.num, maxBlue); break;
          }
          case 'green': {
            maxGreen = Math.max(c.num, maxGreen); break;
          }
        }
      })
      return (maxBlue * maxGreen * maxRed)
    }).reduce(this.sum)

    assert(this.p2 == 59795)
  }
}

new Day2().solve();

