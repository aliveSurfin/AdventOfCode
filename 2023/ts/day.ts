import * as fs from 'fs';

export class Day {

    input: String
    useTestInput : boolean = false

    listOfStrings: string[] = []
    listOfNumbers: number[] = []

    p1 : number | null  = null
    p2 : number | null  = null


    readFile(day : String) : String{

        let path = this.useTestInput ? `${day}/test.txt`: `${day}/input.txt`;
        return fs.readFileSync(path,'utf8')
    }

    constructor(day: String, useTestInput = false){
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
        this.solveP1()
        this.solveP2()
    }
}