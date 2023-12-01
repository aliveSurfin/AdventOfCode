import { Day } from "../../day";
class Day1 extends Day {
  constructor() {
    super(__dirname);
  }

  replaceAllWordsDigits(inputString: string) {
    let words = [
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
    ];
    let digits = Array.from({ length: 9 }, (_, i) => i + 1).map((e) => `${e}`);
    for (let x = 0; x < digits.length; x++) {
      inputString = inputString.split(words[x]).join(digits[x]);
    }
    return inputString;
  }

  sum(acc: any, val: any) {
    return acc + val;
  }
  reverse(s: string): string {
    return s.split("").reverse().join("");
  }

  override solveP1(): void {
    this.p1 = this.listOfStrings
      .map((e) => {
        return parseInt(`${e.match(/\d/)}${this.reverse(e).match(/\d/)}`);
      })
      .reduce(this.sum);
  }

  override solveP2(): void {
    let regex = /(\d|one|two|three|four|five|six|seven|eight|nine)/g;
    //hackyity hack d'hack
    let reverseRegex = /(\d|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin)/g;

    this.p2 = this.listOfStrings
      .map((e) => {
        let first = this.replaceAllWordsDigits(`${e.match(regex)!![0]}`);

        let last = this.replaceAllWordsDigits(
          this.reverse(this.reverse(e).match(reverseRegex)!![0]));

        return parseInt(`${first}${last}`);
      })
      .reduce(this.sum);

  }
}

new Day1().solve();
