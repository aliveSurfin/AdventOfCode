import { Day } from "../../day";

//@ts-ignore
import assert from "assert";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

//@ts-ignore
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class Day05 extends Day {
  constructor() {
    super(__dirname, false);
  }

  orderingRules: { [key: string]: string[] } = {};
  updates: string[][] = [];

  incorrectlyOrdered: string[][] = [];

  sortFunction(a: string, b: string) {
    if (this.orderingRules[a]?.includes(b)) {
      return -1;
    }
    if (this.orderingRules[b]?.includes(a)) {
      return 1;
    }
    return 0;
  }

  override solveP1(): void {
    const lines = this.input.split("\n");
    const emptyLineIndex = lines.indexOf("");

    lines.slice(0, emptyLineIndex).forEach((line) => {
      const [rule, value] = line.split("|");
      if (rule in this.orderingRules) {
        this.orderingRules[rule].push(value);
      } else {
        this.orderingRules[rule] = [value];
      }

    });
    this.updates = lines.slice(emptyLineIndex + 1).map((line) => {
      return line.split(",")
    })

    this.updates.forEach((update) => {
      let i = 0
      let ok = true;
      while (i < update.length && ok) {
        let j = i + 1;
        while (j < update.length && ok) {
          let cur = update[i];
          let next = update[j];
          if (this.orderingRules[next]?.includes(cur)) {
            ok = false;
          }
          j++;
        }
        i++;
      }
      if (ok) {
        this.p1 += parseInt(update[Math.round((update.length - 1) / 2)])
      } else {
        this.incorrectlyOrdered.push(update);
      }
    });

    assert(this.p1 == 4766)
  }

  override solveP2(): void {
    this.incorrectlyOrdered.forEach((update) => {
      update.sort(this.sortFunction.bind(this));
      this.p2 += parseInt(update[Math.round((update.length - 1) / 2)])
    })

    assert(this.p2 == 6257)
  }
}

new Day05().solve();
