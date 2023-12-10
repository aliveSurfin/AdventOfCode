import { Day } from "../../day";
import assert from "assert";


class Day9 extends Day {
  constructor() {
    super(__dirname);
    this.histories = this.listOfStrings.map(e => e.split(" ").map(e=>parseInt(e))).map((line)=> {
      let history = [line]
      while(true){
        history.push([])
        let all0 = true
        for(let x=1; x<history[history.length-2].length; x++){
          let newVal = history[history.length-2][x] - history[history.length-2][x-1]
          if(newVal != 0){
            all0 =false
          }
          history[history.length-1].push(newVal)
        }
        if(all0){
          break
        }
      }
      return history
    })
  }

  histories : number[][][] = []

  printHistory(a : number[][]) {
    a.forEach((e,i)=>{
      console.log(new Array(i+1).fill("").join("  ")+  e.map(f=> f.toString().length ==2 ? f.toString() : ` ${f}`).join("  "))
    })
  }

  override solveP1(): void {
    this.p1 = this.histories.map((history)=>{
      history[history.length-1].push(0)
      for (let x=history.length-2; x>=0; x--) {
        history[x].push(history[x][history[x].length-1]+ history[x+1][history[x+1].length-1])
      }
      return history[0][history[0].length-1]
    }).reduce(this.sum)
    assert(this.p1 == 1972648895)
  }

  override solveP2(): void {
    this.p2 = this.histories.map((history)=>{
      history[history.length-1].unshift(0)
      for (let x=history.length-2; x>=0; x--) {
        history[x].unshift(history[x][0] - history[x+1][0])
      }
      return history[0][0]
    }).reduce(this.sum)
    assert(this.p2 == 919)
  }
}

new Day9().solve();