import { Day } from "../../day";

//@ts-ignore
import assert from "assert";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

//@ts-ignore
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class Day07 extends Day {
  constructor() {
    super(__dirname, false);
  }

  equations: { result: number, operands: number[] }[] = [];


  generateCombinations(operands: number[], operators: string[]): (number | string)[][] {
    if (operands.length < 2) return [];
  
    const results: (number | string)[][] = [];
    const generate = (current: (number | string)[], index: number) => {
      if (index === operands.length) {
        results.push([...current]);
        return;
      }
  
      for (const operator of operators) {
        current.push(operator);
        current.push(operands[index]);
        generate(current, index + 1);
        current.pop();
        current.pop();
      }
    };
  
    generate([operands[0]], 1);
    return results;
  }

  printCombinations(combinations: (number | string)[][]): void {
    combinations.forEach(comb => {
      console.log(comb.join(' '));
    });
  }

  parseInput(input: string[]): { result: number, operands: number[] }[] {
    return input.map(line => {
      const [result, operands] = line.split(': ');
      return {
        result: parseInt(result),
        operands: operands.split(' ').map(Number)
      };
    });
  }

  override solveP1(): void {
    this.equations = this.parseInput(this.listOfStrings);
    this.p1 = this.doEquations(["*", "+"]);
  }

  override solveP2(): void {
    this.p2 = this.doEquations(["*", "+", "||"]);
  }

  doEquations(operators: string[], debug = false): number {
    let count =0;
    this.equations.forEach(eq => {
      if(debug){
        console.log('Equation', eq);
      }
      const combinations = this.generateCombinations(eq.operands, operators);
      let found = false;
      for (const current of combinations) {
        let result = current[0] as number;
        let mergeCombs = [];
        let curResult = result;
  
        for (let j = 1; j < current.length; j += 2) {
          if (current[j] === '+') {
            if(debug){
              console.log('Adding', current[j+1]);
            }
            curResult += current[j+1] as number;
            mergeCombs.push(curResult);
            if(debug){
              console.log('Result of addition', curResult);
            }
          } else if (current[j] === '*') {
            if(debug){
            console.log('Multiplying', current[j+1]);
            }
            curResult *= current[j+1] as number;
            mergeCombs.push(curResult);
            if(debug){
            console.log('Result of multiplication', curResult);
            }
          } else if (current[j] === '||') {
            const concatenated = parseInt('' + curResult + current[j+1]);
            if(debug){
            console.log('Concatenating', curResult, 'and', current[j+1], 'to get', concatenated);
            }
            curResult = concatenated;
            mergeCombs.push(concatenated);
          }
        }
        if(debug){
          console.log('Result', curResult);
        }
        if (curResult === eq.result) {
          if(debug){
            console.log('Found it', current);
          }
          count += curResult
          found = true;
          break;
        }
        
      }
    });
    return count;
  }
}

new Day07().solve();
