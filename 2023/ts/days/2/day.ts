import { Day } from "../../day";
import * as assert from 'assert'

class Day2 extends Day {
  constructor() {
    super(__dirname);
  }

  override solveP1(): void {
      let possible = 0;
      let maxes = {'red': 12, 'blue': 14, 'green':13}


      this.listOfStrings.forEach((e)=>{
        let cubes : string[][] = e.split(": ")[1].split(/,|;/).map(z => z.trim().split(' '))
        let id = parseInt(e.split(": ")[0].split("Game")[1].trim())

        let thisPossible = true;
        for(let x=0; x<cubes.length; x++){
          // @ts-ignore
          if(parseInt(cubes[x][0]) > maxes[cubes[x][1]]){
            thisPossible = false
            break
          }
        }
        if(thisPossible){
          possible+= id
        }
      })
      this.p1 = possible;
      assert(this.p1 == 2617)
  }


  override solveP2(): void {

    let sum =0;
    this.listOfStrings.forEach((e)=>{
      let cubesSplit : string[] = e.split(": ")[1].split(/,|;/)
      let cubes = cubesSplit.map(z => z.trim().split(' '))
      let lowestGreen = 0;
      let lowestBlue = 0;
      let lowestRed =0;

      for(let x=0; x<cubes.length; x++){
        let cubeName = cubes[x][1]
        let cubeNumber = parseInt(cubes[x][0])
        if(cubeName == 'red' && cubeNumber > lowestRed) {
          lowestRed = cubeNumber
        }

        if(cubeName == 'green' && cubeNumber > lowestGreen){
          lowestGreen = cubeNumber
        }
        
        if(cubeName == 'blue' && cubeNumber > lowestBlue){
          lowestBlue = cubeNumber
        }
      }

      let power = lowestBlue * lowestGreen * lowestRed
      sum += power
    })
    
    this.p2 = sum
    assert(this.p2 == 59795)
  }
}

new Day2().solve();

