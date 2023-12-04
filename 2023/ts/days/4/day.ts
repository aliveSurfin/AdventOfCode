import { Day } from "../../day";
import assert from "assert";

class Day4 extends Day {
  constructor() {
    super(__dirname);
  }

  cards :any = {}
  override solveP1(): void {
    let sum =0
    this.listOfStrings.forEach((card) => {
      let parts = card.split(": ")
      let numbers = parts[1].split(" | ")

      
      let winning = new Set(numbers[0].trim().split(/\s+/).map(n=>parseInt(n)))
      let yours = new Set(numbers[1].trim().split(/\s+/).map(n=>parseInt(n)))
      let intersect = new Set([...yours].filter(i => winning.has(i)));
      let points = Math.floor(Math.pow(2, ([...intersect].length)-1))

      this.cards[parts[0].split(/\s+/)[1]] = {copies: 1, children: [...intersect]}
      sum += points
    })
    this.p1 = sum

    assert(this.p1 == 27845)
  }

  override solveP2(): void {
    Object.keys(this.cards).forEach((e) =>{
      let matchingNumbers = this.cards[e].children.length
      for(let x = parseInt(e)+1; x< (parseInt(e)+1+matchingNumbers); x++){
        this.cards[x].copies += this.cards[e].copies
      }
    })

    //@ts-ignore
    this.p2 = Object.values(this.cards).map((c) => {return c.copies}).reduce(this.sum)

    assert(this.p2 == 9496801)
  }
}

new Day4().solve();
