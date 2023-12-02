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

    constructor(day: string, useTestInput = false){
        console.log(`\nDay ${day.split("/").at(-1)}`)
        this.useTestInput = useTestInput
        this.input = this.readFile(day)
        this.listOfStrings = this.input.split("\n")
        this.listOfNumbers = this.listOfStrings.map((e) => { return parseInt(e)})
    }

    assert(condition : boolean) {
        if(!condition) {
            throw new Error(`Expected condition ${condition} to be true`)
        }
    }


    solveP1(){
        console.log("p1 not solved")
    }

    solveP2(){
        console.log("p2 not solved")
    }


    solve(){
        this.solveP1()
        this.solveP2()

        console.log("p1: ", this.p1);
        console.log("p2: ", this.p2);
    }
}