import { exit } from "process";
import { Day } from "../../day";
import assert from "assert";

class Day3 extends Day {
  constructor() {
    super(__dirname);
  }

  isSymbol(a: string) {
    return false;
  }
  override solveP1(): void {
    let sum = 0;
    this.listOfStrings.forEach((line, y) => {
      let xPos = 0;

      while (true) {
        let match = line.substring(xPos, line.length).match(/\d+/);
        if (match == null) {
          break;
        }
        let num = match[0];
        let possibleSymbols: string[] = [];
        xPos += match.index!!;
        for (let x = xPos; x < xPos + num.length; x++) {
          //n
          try {
            possibleSymbols.push(this.listOfStrings[y - 1].charAt(x));
          } catch {}
          //nw
          try {
            possibleSymbols.push(this.listOfStrings[y - 1].charAt(x - 1));
          } catch {}
          //w
          try {
            possibleSymbols.push(this.listOfStrings[y].charAt(x - 1));
          } catch {}
          //sw
          try {
            possibleSymbols.push(this.listOfStrings[y + 1].charAt(x - 1));
          } catch {}
          //s
          try {
            possibleSymbols.push(this.listOfStrings[y + 1].charAt(x));
          } catch {}
          //se
          try {
            possibleSymbols.push(this.listOfStrings[y + 1].charAt(x + 1));
          } catch {}
          //e
          try {
            possibleSymbols.push(this.listOfStrings[y].charAt(x + 1));
          } catch {}
          //ne
          try {
            possibleSymbols.push(this.listOfStrings[y - 1].charAt(x + 1));
          } catch {}
        }
        let symbolsFiltered = possibleSymbols.filter(
          (z) => z.match(/(\*|\=|\+|\-|\&|\)|\(|\%|\#|\\|\/|\@|\$)/) != null
        );
        if (symbolsFiltered.length > 0) {
          sum += parseInt(num);
        }
        xPos += num.length + 1;
      }
    });
    this.p1 = sum;
    assert(this.p1 == 540131);
  }

  override solveP2(): void {
    let sum = 0;
    let gears = {};
    this.listOfStrings.forEach((line, y) => {
      let xPos = 0;

      while (true) {
        let match = line.substring(xPos, line.length).match(/\d+/);
        if (match == null) {
          break;
        }
        let num = match[0];
        let possibleSymbols: { x: number; y: number; sym: string }[] = [];
        xPos += match.index!!;
        for (let x = xPos; x < xPos + num.length; x++) {
          //n
          try {
            possibleSymbols.push({
              x: x,
              y: y - 1,
              sym: this.listOfStrings[y - 1].charAt(x),
            });
          } catch {}
          //nw
          try {
            possibleSymbols.push({
              x: x - 1,
              y: y - 1,
              sym: this.listOfStrings[y - 1].charAt(x - 1),
            });
          } catch {}
          //w
          try {
            possibleSymbols.push({
              x: x - 1,
              y: y,
              sym: this.listOfStrings[y].charAt(x - 1),
            });
          } catch {}
          //sw
          try {
            possibleSymbols.push({
              x: x - 1,
              y: y + 1,
              sym: this.listOfStrings[y + 1].charAt(x - 1),
            });
          } catch {}
          //s
          try {
            possibleSymbols.push({
              x: x,
              y: y + 1,
              sym: this.listOfStrings[y + 1].charAt(x),
            });
          } catch {}
          //se
          try {
            possibleSymbols.push({
              x: x + 1,
              y: y + 1,
              sym: this.listOfStrings[y + 1].charAt(x + 1),
            });
          } catch {}
          //e
          try {
            possibleSymbols.push({
              x: x + 1,
              y: y,
              sym: this.listOfStrings[y].charAt(x + 1),
            });
          } catch {}
          //ne
          try {
            possibleSymbols.push({
              x: x + 1,
              y: y - 1,
              sym: this.listOfStrings[y - 1].charAt(x + 1),
            });
          } catch {}
        }
        xPos += num.length + 1;

        let symbolsFiltered = possibleSymbols.filter((z) => z.sym == "*");
        symbolsFiltered.forEach((g) => {
          let gearKey = `${g.x}+${g.y}`;
          //@ts-ignore
          if (gears[gearKey] == null) {
            //@ts-ignore
            gears[gearKey] = [];
          }
          //@ts-ignore
          if (gears[gearKey].includes(parseInt(num))) {
          } else {
            //@ts-ignore
            gears[gearKey].push(parseInt(num));
          }
        });
      }
    });
    Object.keys(gears).forEach((key) => {
      //@ts-ignore
      let parts: number[] = gears[key];
      if (parts.length == 2) {
        sum += parts[0] * parts[1];
      }
    });

    this.p2 = sum;
    assert(this.p2 == 86879020);
  }
}

new Day3().solve();
