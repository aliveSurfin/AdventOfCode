import { Day } from "../../day";
import assert from "assert";

type Nodes = {
  [name: string] :{
    L: string,
    R: string
  }
}
class Day8 extends Day {
  constructor() {
    super(__dirname);
    this.listOfStrings = this.listOfStrings.filter(e => e!='')

    this.instructions = this.listOfStrings[0].split("")
    this.listOfStrings.shift()
    this.listOfStrings.forEach((e)=>{
      let split = e.split(" = ")
      let l = split[1].split(", ")[0].split("")
      l.shift()
      let r = split[1].split(", ")[1].split("")
      r.pop()
      let node = {L: l.join(""), R: r.join("")}
      this.nodes[split[0]] = node
      // this.nodes[split[0]] = {L: l, R: r}
    })
  }

  nodes: Nodes = {}
  instructions: string[] = []

  findPath(currentNode: string, finalNode:string, checkLastChar : boolean = false){

    let hops = 0
    while(currentNode!=finalNode){
      let node = this.nodes[currentNode]
     
      let curInstruct = this.instructions[hops%this.instructions.length]
      //@ts-ignore
      let next = node[curInstruct]
      hops++
      currentNode = next
      if(checkLastChar && next[2] == finalNode){
        break
      }
      if(next == finalNode){
        break
      }
    }
    return hops
  }

  override solveP1(): void {
    this.p1 = this.findPath('AAA', 'ZZZ')
    assert(this.p1 == 14681)
  }

  override solveP2(): void {
    let beginningWithA = Object.keys(this.nodes).filter(e => e[2].toUpperCase() =='A')
    let hopsForAllBeginning =beginningWithA.map((e)=>{
      return this.findPath(e, 'Z', true)
    })

   let lcm = 1
   for(let x=0; x<hopsForAllBeginning.length; x++){
    lcm = this.lcm2(hopsForAllBeginning[x], lcm)
   }
  
   this.p2 = lcm
   assert(this.p2 == 14321394058031)
  }
}

new Day8().solve();