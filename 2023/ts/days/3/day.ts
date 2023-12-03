import { exit } from "process";
import { Day } from "../../day";
import assert from "assert";

class Day3 extends Day {
  constructor() {
    super(__dirname);
  }

  isSymbol(a: string){
    return false
  }
  override solveP1(): void {

    let sum = 0;
    this.listOfStrings.forEach((e, y)=>{
      //console.log(e)
      let parts = e.split(/(\.|\*|\=|\+|\-|\&|\)|\(|\%|\#|\\|\/|\@|\$)/).filter(c => c.match(/\d/) != null)
      console.log("parts", parts)
      parts.forEach((f)=>{
        if(f.match(/\d+/)){
          //let x = e.indexOf(f)
          // console.log(f)
          
          let possibleSymbols :string[] = []
          for (let x=e.indexOf(f); x<(e.indexOf(f)+f.length); x++){
            //n
            try{
              possibleSymbols.push(this.listOfStrings[y-1].charAt(x))
            } catch{}
            //nw
            try{
              possibleSymbols.push(this.listOfStrings[y-1].charAt(x-1))
            } catch{}
            //w
            try{
              possibleSymbols.push(this.listOfStrings[y].charAt(x-1))
            } catch{}
            //sw
            try{
              possibleSymbols.push(this.listOfStrings[y+1].charAt(x-1))
            } catch{}
            //s
            try{
              possibleSymbols.push(this.listOfStrings[y+1].charAt(x))
            } catch{}
            //se
            try{
              possibleSymbols.push(this.listOfStrings[y+1].charAt(x+1))
            } catch{}
            //e
            try{
              possibleSymbols.push(this.listOfStrings[y].charAt(x+1))
            } catch{}
            //ne
            try{
              possibleSymbols.push(this.listOfStrings[y-1].charAt(x+1))
            } catch{}
          }
          if(possibleSymbols.filter((e)=> {return (e != '.') && e.match(/\d/) == null}).length != 0){
            //console.log(possibleSymbols.filter((e)=> {return (e != '.') && e.match(/\d/) == null}));
            // console.log()
            // console.log("hit")
            // console.log(possibleSymbols)
            sum+= parseInt(f)
            if(isNaN(sum)){
              console.log(f)
              exit()
            }
          }else {
            // console.log("hit")
          }
          
          // console.log(possibleSymbols)
        }
      })
    })
    this.p1 = sum
    // assert(this.p1 == 2617)
  }


  override solveP2(): void {

  }
}

new Day3().solve();

