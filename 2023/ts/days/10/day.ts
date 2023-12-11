import { Day } from "../../day";
import assert from "assert";

type point = {
  x: number;
  y: number;
  distance: number;
};
class Day10 extends Day {
  constructor() {
    super(__dirname);

    this.grid = this.listOfStrings.map((e, y) => {
      let posStart = e.indexOf("S");
      if (posStart != -1) {
        this.startPos = { x: posStart, y, distance: 0 };
      }
      return e.split("");
    });
  }

  grid: string[][] = [];
  startPos: point = { x: 0, y: 0, distance: 0 };
  paths: {[id: string] : point} = {}
  maxDistance : number = 0

  canMoveTo(cur: point, next: point) {
    let nextChar = this.grid[next.y][next.x];
    if(nextChar == null){
      return false
    }
    // is next north
    if (cur.y > next.y) {
      return ["|", "7", "F"].includes(nextChar);
    }
    // is next south
    if (cur.y < next.y) {
      return ["|", "L", "J"].includes(nextChar);
    }
    // is next east
    if (cur.x < next.x) {
      return ["-", "J", "7"].includes(nextChar)
    }
    // is next west
    if (cur.x > next.x) {
      return ["-", "L", "F"].includes(nextChar);
    }
    return false
  }

  findNext(pos: point, previous: point[]) {
    let curPiece = this.grid[pos.y][pos.x];
    if(curPiece == null){
      return
    }
    previous.push(pos);
    let posNexts: point[] = [];
    switch (curPiece) {
      case "S": {
        posNexts.push({ x: pos.x, y: pos.y - 1, distance: pos.distance + 1 });
        posNexts.push({ x: pos.x, y: pos.y + 1, distance: pos.distance + 1 });
        posNexts.push({ x: pos.x - 1, y: pos.y, distance: pos.distance + 1 });
        posNexts.push({ x: pos.x + 1, y: pos.y, distance: pos.distance + 1 });
        break;
      }
      case "|": {
        posNexts.push({ x: pos.x, y: pos.y - 1, distance: pos.distance + 1 });
        posNexts.push({ x: pos.x, y: pos.y + 1, distance: pos.distance + 1 });
        break;
      }

      case "-": {
        posNexts.push({ x: pos.x - 1, y: pos.y, distance: pos.distance + 1 });
        posNexts.push({ x: pos.x + 1, y: pos.y, distance: pos.distance + 1 });
        break;
      }

      case "L": {
        posNexts.push({ x: pos.x + 1, y: pos.y, distance: pos.distance + 1 });
        posNexts.push({ x: pos.x, y: pos.y - 1, distance: pos.distance + 1 });
        break;
      }

      case "J": {
        posNexts.push({ x: pos.x - 1, y: pos.y, distance: pos.distance + 1 });
        posNexts.push({ x: pos.x, y: pos.y - 1, distance: pos.distance + 1 });
        break;
      }

      case "7": {
        posNexts.push({ x: pos.x, y: pos.y + 1, distance: pos.distance + 1 });
        posNexts.push({ x: pos.x - 1, y: pos.y, distance: pos.distance + 1 });
        break;
      }

      case "F": {
        posNexts.push({ x: pos.x + 1, y: pos.y, distance: pos.distance + 1 });
        posNexts.push({ x: pos.x, y: pos.y + 1, distance: pos.distance + 1 });
        break;
      }
    }

    posNexts = posNexts.filter((cur) => {
      let prevFiltered = previous.filter((prev) => { return prev.x == cur.x && cur.y == prev.y })
      return prevFiltered.length == 0
    });

    posNexts = posNexts.filter((cur) => {
      let moveable = this.canMoveTo(pos,cur)
      return moveable
    })
    this.paths[`${pos.x}-${pos.y}`] = pos
    this.maxDistance = Math.max(pos.distance,this.maxDistance)

    return{posNexts, previous}
  }
  override solveP1(): void {
    //@ts-ignore
    let cur :{posNexts:point[], previous: point[]}[] = [ this.findNext(this.startPos, [])]
    let newCur :{posNexts:point[], previous: point[]}[]  = []
    let count =0
    let lastMaxDistance = this.maxDistance
    while(cur.length>0){
      for(let i=0; i<cur.length; i++) {
        if(cur[i] == undefined) {
          continue
        }
        for(let j=0; j<cur[i].posNexts.length; j++){
          if(cur[i].posNexts[j] == undefined){
            continue
          }
          
          lastMaxDistance = this.maxDistance
          //@ts-ignore
          newCur.push(this.findNext(cur[i].posNexts[j],cur[i].previous))
          if(this.maxDistance == lastMaxDistance) {
            count++
          }
          if(count> 20000){
            break
          }
        }
      }
      cur = newCur
      if(count > 20000) { // confidence that this is the value
        break
      }
    }
    this.p1 = this.maxDistance
    assert(this.p1 == 6831)
  }

  override solveP2(): void {}
}

new Day10().solve();
