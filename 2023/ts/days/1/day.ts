import { Day } from "../../day";
class Day1 extends Day {


    constructor(){
        super(__dirname)
    }


    replaceAllWordsDigits(inputString: string){

        let words =["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
        let digits = Array.from({length: 9}, (_, i) => i + 1).map((e)=> `${e}`)
        for (let x=0; x<digits.length; x++) {
            inputString = inputString.split(words[x]).join(digits[x])
        }
        return inputString
    }
    
    
    sum(acc: any,val: any){ return acc+val;}

    override solveP1(): void {

        this.p1 = this.listOfStrings.map((e) => {
            return parseInt(`${e.match(/\d/)}${e.split("").reverse().join("").match(/\d/)}`)
        }).reduce(this.sum)
        console.log("p1: ", this.p1)
    }

    
//55725
    override solveP2(): void {
        let regex = /(\d|one|two|three|four|five|six|seven|eight|nine)/g
        let reverseRegex =  /(\d|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin)/g
        this.p2 = this.listOfStrings.map((e) => {
            let matches = e.match(regex)
            let first = this.replaceAllWordsDigits(`${matches!![0]}`)
            let last = this.replaceAllWordsDigits(e.split("").reverse().join("").match(reverseRegex)!![0].split("").reverse().join(""))
            return parseInt(`${first}${last}`)
        }).reduce(this.sum)

        console.log("p2: ", this.p2)
    }
}


new Day1().solve()