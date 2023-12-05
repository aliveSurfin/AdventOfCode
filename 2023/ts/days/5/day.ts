import { lstat } from "fs";
import { Day } from "../../day";
import assert from "assert";

class Day5 extends Day {
  constructor() {
    super(__dirname);
  }


  createMap(dsr: [number, number, number]){

    let destination = dsr[0]
    let source = dsr[1]
    let range = dsr[2]
    console.log("creating map of length ", range)

    //@ts-ignore
    let dList = Array(destination+range - destination).fill().map((_, idx) => destination + idx)
    //@ts-ignore
    let sList = Array(source+range - source).fill().map((_, idx) => source + idx)

    let obj = {}
    dList.forEach((e,i)=>{
      //@ts-ignore
      obj[sList[i]] = e
    })
    // console.log(obj)
    return obj
  }
//@ts-ignore
  mergeAllMaps(maps){
    //@ts-ignore
    maps = maps.split(":\n")[1].split("\n").map(e=> e.split(" ").map(e => parseInt(e)))

    
    let finalMap = {}
    //@ts-ignore
    maps.forEach((e)=>{
      //@ts-ignore
      finalMap = {...finalMap,...this.createMap(e)}
    })

    return finalMap
  }


  getFromMap(map : any, sourceNo: number){
    if(map[sourceNo.toString()] == null){
      return sourceNo
    }
    return map[sourceNo.toString()]
  }
  override solveP1(): void {
  let split = this.input.split("\n\n")
  let seeds = split[0].split(": ")[1].split(" ").map(e => parseInt(e))
  let seedToSoil = this.mergeAllMaps(split[1])
  let soilToFertilizer = this.mergeAllMaps(split[2])
  let fertilizerToWater = this.mergeAllMaps(split[3])
  let waterToLight = this.mergeAllMaps(split[4])
  let lightToTemperature = this.mergeAllMaps(split[5])
  let temperatureToHumidity = this.mergeAllMaps(split[6])
  let humidityToLocation = this.mergeAllMaps(split[7])



  let all = {seeds,seedToSoil,soilToFertilizer,fertilizerToWater,waterToLight,lightToTemperature,temperatureToHumidity,humidityToLocation}

  // console.log(all)


  let locations = seeds.map((seed)=>{
    let soil = this.getFromMap(seedToSoil, seed)
    let fertilizer = this.getFromMap(soilToFertilizer, soil)
    let water = this.getFromMap(fertilizerToWater, fertilizer)
    let light = this.getFromMap(waterToLight, water)
    let temperature = this.getFromMap(lightToTemperature, light)
    let humdity = this.getFromMap(temperatureToHumidity, temperature)
    let location = this.getFromMap(humidityToLocation, humdity)
    console.log(seed, soil, fertilizer, water, light, temperature, humdity, location)
    return location
  })

  console.log(Math.min(...locations))


  }

  override solveP2(): void {
  }
}

new Day5().solve();
