import { Day } from "../../day";

//@ts-ignore
import assert from "assert";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

//@ts-ignore
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class Day11 extends Day {
  constructor() {
    super(__dirname, false);
  }


  override solveP1(): void {
    this.listOfNumbers = this.input.split(" ").map((x) => parseInt(x));
    let blinks = 25;

    /**
     * If the stone is engraved with the number 0, 
     * it is replaced by a stone engraved with the number 1.
     * 
     * If the stone is engraved with a number that has an even number of digits, 
     * it is replaced by two stones. The left half of the digits are 
     * engraved on the new left stone, and the right half of the digits are 
     * engraved on the new right stone. (The new numbers don't keep extra leading 
     * zeroes: 1000 would become stones 10 and 0.)
     * 
     * If none of the other rules apply, 
     * the stone is replaced by a new stone; 
     * the old stone's number multiplied by 2024 is engraved on the new stone.
     */
    
    //ROBOT MAGIC
    for (let i=0; i<blinks; i++) { 
      let newListOfNumbers = [];
      for (let j=0; j<this.listOfNumbers.length; j++) {
        let num = this.listOfNumbers[j];
        if (num === 0) {
          newListOfNumbers.push(1);
        } else {
          let numStr = num.toString();
          if (numStr.length % 2 === 0) {
            let half = numStr.length / 2;
            let left = numStr.substring(0, half);
            let right = numStr.substring(half);
            newListOfNumbers.push(parseInt(left));
            newListOfNumbers.push(parseInt(right));
          } else {
            newListOfNumbers.push(num * 2024);
          }
        }
      }
      this.listOfNumbers = newListOfNumbers;
    }
    this.p1 = this.listOfNumbers.length;
    assert(this.p1 === 217812);
  
  }

  // override solveP2(): void {


  // }
}

new Day11().solve();
