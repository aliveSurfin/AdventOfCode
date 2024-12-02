import { Day } from "../../day";

//@ts-ignore
import assert from "assert";

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { log } from "console";

//@ts-ignore
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class Day02 extends Day {
  grid: any[];
  constructor() {
    super(__dirname, false);
    this.grid= [];
  }


  override solveP1(): void {
    this.grid = this.listOfStrings.map((e)=> e.split(' ').map((f)=> parseInt(f)))

    this.grid.forEach((report)=>{
      let reportSafe = this.calculateSafe(report);

      if(!reportSafe) {
        for(let i=0; i< report.length; i++) {
          let copy = report.slice()
          copy.splice(i, 1)
          if(this.calculateSafe(copy)){
            this.p2++;
            break;
          }
        }
      }else {
        this.p1++;
        this.p2++;
      }
    })

    assert(this.p1 == 524)
    assert(this.p2 == 569)
  }
  
  override solveP2(): void {

  }

  calculateSafe(report) {
    let tooLarge = false;
    let hasNegative = false;
    let hasPositive = false;
    let hasSame = false;
    
    report.forEach((level, i)=> {
      if(i != 0){
        let diff = report[i-1] - level

        if(diff == 0) {
          hasSame = true;
        }
        if(diff < 0 ) {
          hasNegative = true;
        }
        if(diff > 0 ) {
          hasPositive = true;
        }
        if(Math.abs(diff) > 3){
          tooLarge = true
        }
      }
    })

    if(hasSame || tooLarge || hasNegative==hasPositive) {
      return false
    }else {
      return true;
    }
  }

 
}

new Day02().solve();
