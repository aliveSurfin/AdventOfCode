import * as fs from 'fs';

export class Day {

    input: string
    useTestInput : boolean = false

    listOfStrings: string[] = []
    listOfNumbers: number[] = []

    p1 : number | any  = null
    p2 : number | any  = null


    readFile(day : string) : string{

        let path = this.useTestInput ? `${day}/test.txt`: `${day}/input.txt`;
        return fs.readFileSync(path,'utf8')
    }

    sum(acc: any, val: any) {
        return acc + val;
      }

    multiply(acc:any, val:any) {
       return acc * val
    }

    arrayRange(start: number, stop: number, step: number){
        return Array.from(
          { length: (stop - start) / step + 1 },
          (value, index) => start + index * step
        );
      }

    constructor(day: string, useTestInput = false){
        console.log(`\nDay ${day.split("/").at(-1)}`)
        this.useTestInput = useTestInput
        this.input = this.readFile(day)
        this.listOfStrings = this.input.split("\n")
        this.listOfNumbers = this.listOfStrings.map((e) => { return parseInt(e)})
    }

    solveP1(){
        console.log("p1 not solved")
    }

    solveP2(){
        console.log("p2 not solved")
    }


    solve(){
        const start = performance.now();
        this.solveP1()
        this.solveP2()
        const end = performance.now();

        console.log("p1: ", this.p1);
        console.log("p2: ", this.p2);
        console.log("time taken: ", `${end - start} ms`)
    }
}