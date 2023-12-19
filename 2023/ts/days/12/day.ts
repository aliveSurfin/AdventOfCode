import { Day } from "../../day";
import assert from "assert";

class Day12 extends Day {
  constructor() {
    super(__dirname, true);
  }

  allPossibleCombinations(input:string[], length: number, curstr: string) {
    if(curstr.length == length) return [ curstr ];
    var ret :string[]= [];
    for(var i = 0; i < input.length; i++) {
        ret.push.apply(ret, this.allPossibleCombinations(input, length, curstr + input[i]));
    }
    return ret;
  }

  
  override solveP1(): void {
    let rows = this.listOfStrings.map((e=>e.split(" ")))
    // console.log(rows)
    let samenum =0
    this.p1 = rows.map((e,i)=>{
      let input = [".", "#"]
      let order = e[1].split(",").map((e)=>parseInt(e))
      let springs = e[0].split(/\.+/).filter((e=>e!=""))
      let rawSprings = springs.join(".")
      console.log("row", i, rawSprings)
      console.log("springs", springs)
      console.log("order", order)

      
      let possibleFits = []
      console.log()






    }).reduce(this.sum)

    console.log(samenum, rows.length)
  }

  override solveP2(): void {}
}

new Day12().solve();

