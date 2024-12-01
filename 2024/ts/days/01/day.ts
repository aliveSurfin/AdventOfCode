import { Day } from "../../day";

//@ts-ignore
import assert from "assert";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

//@ts-ignore
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class Day01 extends Day {
  lhs: any[];
  rhs: any[];
  countCache: {};
  constructor() {
    super(__dirname);
  }


  override solveP1(): void {
    this.lhs = []
    this.rhs = []
    this.countCache = {};
    this.listOfStrings.forEach((e)=> {
      this.lhs.push(e.split("   ")[0])
      this.rhs.push(e.split("   ")[1])
    })

    this.lhs.sort((a,b)=> a - b)
    this.rhs.sort((a,b)=> a - b)

    this.lhs.forEach((e, i) => {
      this.p1 += Math.abs(parseInt(e) - parseInt(this.rhs[i]))
    })

    
    assert(this.p1 == 1765812)
  
  }

  override solveP2(): void {
    this.lhs.forEach((l)=> {
      this.p2 += l * this.findCountInList(this.rhs, l)
    })


    assert(this.p2 == 20520794)

  }


  findCountInList(list: string[], target: string): number {
    if (target in this.countCache) {
      return this.countCache[target];
    }
  
    let count = 0;
    for (let i = 0; i < list.length; i++) {
      if (list[i] === target) {
        count += 1;
      }
      if (list[i] > target) {
        break;
      }
    }
  
    this.countCache[target] = count;
    return count;
  }
}



new Day01().solve();
