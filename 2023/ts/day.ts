import * as fs from 'fs';

export class Day {

    input: String
    // testInput: String
    listOfStrings: string[] = []
    listOfNumbers: number[] = []

    readFile(day : String, useTestInput = false) : String{

        let path = useTestInput ? `./${day}/test.txt`: `./${day}/input.txt`;
        return fs.readFileSync(path,'utf8')
        // console.log(this.input)
    }

    createListOfStrings() {
    }
    constructor(day: String, useTestInput = false){
        this.input = this.readFile(day, useTestInput)
        console.log(`Using test input? ${useTestInput? "Yes" : "No"}`)
        console.log("input: ", this.input)
        this.listOfStrings = this.input.split("\n")
        this.listOfNumbers = this.listOfStrings.map((e) => { return parseInt(e)})
        console.log(this)
    }
}