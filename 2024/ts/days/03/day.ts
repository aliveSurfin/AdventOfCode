import { Day } from "../../day";

//@ts-ignore
import assert from "assert";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

//@ts-ignore
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
enum Command {
  DO,
  DONT,
  MUL
}
class Day03 extends Day {
  constructor() {
    super(__dirname, false);
  }
  mulRegex = /mul\((\d+),(\d+)\)/;
  doRegex = /do\(\)/;
  dontRegex = /don't\(\)/;

  enabled = true
  

  checkForCommand(a, p1 = false) {
    const mulMatch = a.match(this.mulRegex);
    const doMatch = a.match(this.doRegex);
    const dontMatch = a.match(this.dontRegex);
  
    if (this.enabled || p1) {
      const dontStart = dontMatch ? a.indexOf(dontMatch[0]) : null;
      const mulStart = mulMatch ? a.indexOf(mulMatch[0]) : null;
  
      if (dontStart !== null && dontStart < mulStart && !p1) {
        const endIndex = dontStart + dontMatch[0].length - 1;
        return {
          match: mulMatch[0],
          start: dontStart,
          end: endIndex,
          operation: Command.DONT
        };
      } 
      
      if (mulStart !== null) {
        const endIndex = mulStart + mulMatch[0].length - 1;
        const [x, y] = [parseInt(mulMatch[1], 10), parseInt(mulMatch[2], 10)];
        return {
          match: mulMatch[0],
          start: mulStart,
          end: endIndex,
          x,
          y,
          operation: Command.MUL
        };
      }
  
      return null;
    }
  
    if (doMatch) {
      const doStart = a.indexOf(doMatch[0]);
      const endIndex = doStart + doMatch[0].length - 1;
      return {
        match: doMatch[0],
        start: doStart,
        end: endIndex,
        operation: Command.DO
      };
    }
  
    return null;
  }
  


  override solveP1(): void {
    for(let pointer=0; pointer<this.input.length;){
      let found = this.checkForCommand(this.input.substring(pointer), true)

      if(found != null) {
        this.p1 += found.x*found.y;
        pointer = found.end+1 + pointer;
      } else {
        break;
      }
    }
    assert(this.p1 == 171183089)
  }

  override solveP2(): void {
    for(let pointer=0; pointer<this.input.length;){
      let found = this.checkForCommand(this.input.substring(pointer))

      if(found != null) {
        switch(found.operation) {
          case Command.DO: this.enabled = true;
            break;
          case Command.DONT: this.enabled = false;
            break;
          case Command.MUL: this.p2 += found.x*found.y;
            break;
          default:
            return;
        }
        pointer = found.end+1 + pointer;

      }else {
        break;
      }
    }

    assert(this.p2 == 63866497)
  }
}

new Day03().solve();
