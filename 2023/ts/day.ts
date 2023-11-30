import * as fs from 'fs';
import { DAYS_PATH } from './consts';

export class Day {

    input: String
    // testInput: String
    listOfStrings: string[] = []
    listOfNumbers: number[] = []

    readFile(day : String, useTestInput = false) : String{

        let path = useTestInput ? `${day}/test.txt`: `${day}/input.txt`;
        return fs.readFileSync(path,'utf8')
    }

    constructor(day: String, useTestInput = false){
        this.input = this.readFile(day, useTestInput)
        console.log(`Using test input? ${useTestInput? "Yes" : "No"}`)
        this.listOfStrings = this.input.split("\n")
        this.listOfNumbers = this.listOfStrings.map((e) => { return parseInt(e)})
        console.log(this)
    }
}