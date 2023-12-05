import { lstat } from "fs";
import { Day } from "../../day";
import assert from "assert";
import { exit } from "process";

type DSR = {
  destination: number;
  source: number;
  range: number;
};
class Day5 extends Day {
  constructor() {
    super(__dirname);
  }

  createMap(dsr: [number, number, number]): DSR[] {
    let destination = dsr[0];
    let source = dsr[1];
    let range = dsr[2];

    //@ts-ignore
    return { destination, source, range };
  }
  //@ts-ignore
  mergeAllMaps(maps) {
    //@ts-ignore
    maps = maps.split(":\n")[1].split("\n").map((e) => e.split(" ").map((e) => parseInt(e)));

    let allMaps: DSR[] = [];
    //@ts-ignore
    maps.forEach((e) => {
      //@ts-ignore
      allMaps.push(this.createMap(e));
    });

    return allMaps;
  }

  getFromMap(maps: DSR[], sourceNo: number) {
    for (let x = 0; x < maps.length; x++) {
      let curMap = maps[x];
      if (
        sourceNo >= curMap.source &&
        sourceNo <= curMap.source + curMap.range - 1
      ) {
        return curMap.destination + (sourceNo - curMap.source);
      }
    }
    return sourceNo;
  }

  getBackwardsFromMap(maps: DSR[], destinationNo: number | null) {
    if(destinationNo == null){
      return null
    }
    // console.log(maps, destinationNo)
    for (let x = 0; x < maps.length; x++) {
      let curMap = maps[x];
      if (
        destinationNo >= curMap.destination &&
        destinationNo <= curMap.destination + curMap.range - 1
      ) {
        return curMap.source + (destinationNo - curMap.destination);
      }
    }
    return destinationNo

  }
  override solveP1(): void {
    let split = this.input.split("\n\n");
    let seeds = split[0]
      .split(": ")[1]
      .split(" ")
      .map((e) => parseInt(e));
    let seedToSoil = this.mergeAllMaps(split[1]);
    let soilToFertilizer = this.mergeAllMaps(split[2]);
    let fertilizerToWater = this.mergeAllMaps(split[3]);
    let waterToLight = this.mergeAllMaps(split[4]);
    let lightToTemperature = this.mergeAllMaps(split[5]);
    let temperatureToHumidity = this.mergeAllMaps(split[6]);
    let humidityToLocation = this.mergeAllMaps(split[7]);

    let locations = seeds.map((seed) => {
      let soil = this.getFromMap(seedToSoil, seed);
      let fertilizer = this.getFromMap(soilToFertilizer, soil);
      let water = this.getFromMap(fertilizerToWater, fertilizer);
      let light = this.getFromMap(waterToLight, water);
      let temperature = this.getFromMap(lightToTemperature, light);
      let humdity = this.getFromMap(temperatureToHumidity, temperature);
      let location = this.getFromMap(humidityToLocation, humdity);
      console.log(
        seed,
        soil,
        fertilizer,
        water,
        light,
        temperature,
        humdity,
        location
      );
      return location;
    });

    this.p1 = Math.min(...locations);
    // assert(this.p1 == 322500873);
  }


  seedInRange(seedMap: any[], seedNo: number){
    // console.log("seedMap", seedMap)
    for(let x=0; x<seedMap.length; x++){
      if(seedNo <= seedMap[x].end && seedNo >= seedMap[x].start){
        console.log("hit")
        return true
      }
    }
    return false
  }
  override solveP2(): void {
    let split = this.input.split("\n\n");
    let seeds = split[0]
      .split(": ")[1]
      .split(" ")
      .map((e) => parseInt(e));

    //@ts-ignore
    let seedMap = []

    for(let x=0; x<seeds.length; x+=2){
      //@ts-ignore
      seedMap.push({start: seeds[x], end: seeds[x] + (seeds[x+1]-1)})
    }
    console.log(seedMap)
    let seedToSoil = this.mergeAllMaps(split[1]);
    let soilToFertilizer = this.mergeAllMaps(split[2]);
    let fertilizerToWater = this.mergeAllMaps(split[3]);
    let waterToLight = this.mergeAllMaps(split[4]);
    let lightToTemperature = this.mergeAllMaps(split[5]);
    let temperatureToHumidity = this.mergeAllMaps(split[6]);
    let humidityToLocation = this.mergeAllMaps(split[7]);

    let all = {
      seeds,
      seedToSoil,
      soilToFertilizer,
      fertilizerToWater,
      waterToLight,
      lightToTemperature,
      temperatureToHumidity,
      humidityToLocation,
    };

    // console.log(all)


    let location = 43096871 -1
    let a = true
    while(true){
      location++
      console.log("location: ", location)
      let humdity = this.getBackwardsFromMap(humidityToLocation, location)
      if(humdity == null){
        console.log(humdity)
        continue
      }
      let temperature = this.getBackwardsFromMap(temperatureToHumidity, humdity)
      if(temperature == null){
        continue
      }
      let light = this.getBackwardsFromMap(lightToTemperature, temperature)
      if(light == null){
        continue
      }
      let water = this.getBackwardsFromMap(waterToLight, light)
      if(water == null){
        continue
      }
      let fertilizer = this.getBackwardsFromMap(fertilizerToWater, water)
      if(fertilizer == null){
        continue
      }
      let soil = this.getBackwardsFromMap(soilToFertilizer, fertilizer)
      if(soil == null){
        continue
      }
      let seed = this.getBackwardsFromMap(seedToSoil, soil)

      if(seed != null && this.seedInRange(seedMap, seed)){
        let all = {seed, soil, fertilizer, water, light, temperature, humdity, location}
        console.log(all)
        console.log(seed)
        console.log(location)

        
      break;
      }
      // break;
      
    }
  }
}

new Day5().solve();
