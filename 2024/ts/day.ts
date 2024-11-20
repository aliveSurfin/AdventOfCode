import * as fs from "fs";

export class Day {
  input: string;
  useTestInput: boolean = false;

  listOfStrings: string[] = [];
  listOfNumbers: number[] = [];

  p1: number | any = null;
  p2: number | any = null;

  readFile(day: string): string {
    let path = this.useTestInput ? `${day}/test.txt` : `${day}/input.txt`;
    return fs.readFileSync(path, "utf8");
  }

  sum(acc: any, val: any) {
    return acc + val;
  }

  multiply(acc: any, val: any) {
    return acc * val;
  }

  arrayRange(start: number, stop: number, step: number) {
    return Array.from(
      { length: (stop - start) / step + 1 },
      (value, index) => start + index * step
    );
  }

  gcd2(a: number, b: number): number {
    if (!b) return b === 0 ? a : NaN;
    return this.gcd2(b, a % b);
  }

  lcm2(a: number, b: number): number {
    return (a * b) / this.gcd2(a, b);
  }

  constructor(day: string, useTestInput = false) {
    console.log(`\nDay ${day.split("/").at(-1)}`);
    this.useTestInput = useTestInput;
    this.input = this.readFile(day);
    this.listOfStrings = this.input.split("\n");
    this.listOfNumbers = this.listOfStrings.map((e) => {
      return parseInt(e);
    });
  }

  solveP1() {
    console.log("p1 not solved");
  }

  solveP2() {
    console.log("p2 not solved");
  }

  solve() {
    
    const p1Start = performance.now();
    this.solveP1();
    const p1End = performance.now();
    
    const p2Start = performance.now();
    this.solveP2();
    const p2End = performance.now();
    
    const total = p1End - p1Start + p2End - p2Start;
    if (this.p1 != null) {
      console.log("p1: ", this.p1, `(${(p1End - p1Start).toFixed(4)} ms)`);
    }
    if (this.p2 != null) {
      console.log("p2: ", this.p2, `(${(p2End - p2Start).toFixed(4)} ms)`);
    }
    if (this.p1 != null && this.p2 != null) {
      console.log("total time taken: ", `${total.toFixed(4)} ms`);
    }    
  }
  
}
