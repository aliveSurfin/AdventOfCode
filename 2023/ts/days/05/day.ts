import { Day } from "../../day";
import assert from "assert";

type DSR = {
  destination: number;
  source: number;
  range: number;
};

class Day5 extends Day {

    seedToSoil: DSR[] = []
    soilToFertilizer: DSR[] = []
    fertilizerToWater: DSR[] = []
    waterToLight: DSR[] = []
    lightToTemperature: DSR[] = []
    temperatureToHumidity: DSR[] = []
    humidityToLocation: DSR[] = []
    seeds: number[] = []
  constructor() {
    super(__dirname);
  }

  createMap(dsr: number[]): DSR {
    let destination = dsr[0];
    let source = dsr[1];
    let range = dsr[2];

    return { destination, source, range } as unknown as DSR
  }

  makeAllMaps(maps: string) : DSR[] {
    return maps.split(":\n")[1].split("\n").map((e) => e.split(" ").map((e) => parseInt(e))).map((e) => {
      return this.createMap(e)
    });
  }

  getFromMaps(maps: DSR[], sourceNo: number) {
    for (let x = 0; x < maps.length; x++) {
      let curMap = maps[x];
      if (sourceNo >= curMap.source && sourceNo <= curMap.source + curMap.range - 1)
      {
        return curMap.destination + (sourceNo - curMap.source);
      }
    }
    return sourceNo;
  }

  getBackwardsFromMap(maps: DSR[], destinationNo: number) {
    for (let x = 0; x < maps.length; x++) {
      let curMap = maps[x];
      if (destinationNo >= curMap.destination && destinationNo <= curMap.destination + curMap.range - 1)
      {
        return curMap.source + (destinationNo - curMap.destination);
      }
    }
    return destinationNo;
  }

  seedInRange(seedMap: any[], seedNo: number) {
    for (let x = 0; x < seedMap.length; x++) {
      if (seedNo <= seedMap[x].end && seedNo >= seedMap[x].start) {
        return true;
      }
    }
    return false;
  }

  override solveP1(): void {
    let split = this.input.split("\n\n");
    this.seeds = split[0].split(": ")[1].split(" ").map((e) => parseInt(e));
    this.seedToSoil = this.makeAllMaps(split[1]);
    this.soilToFertilizer = this.makeAllMaps(split[2]);
    this.fertilizerToWater = this.makeAllMaps(split[3]);
    this.waterToLight = this.makeAllMaps(split[4]);
    this.lightToTemperature = this.makeAllMaps(split[5]);
    this.temperatureToHumidity = this.makeAllMaps(split[6]);
    this.humidityToLocation = this.makeAllMaps(split[7]);

    let locations = this.seeds.map((seed) => {
      let soil = this.getFromMaps(this.seedToSoil, seed);
      let fertilizer = this.getFromMaps(this.soilToFertilizer, soil);
      let water = this.getFromMaps(this.fertilizerToWater, fertilizer);
      let light = this.getFromMaps(this.waterToLight, water);
      let temperature = this.getFromMaps(this.lightToTemperature, light);
      let humdity = this.getFromMaps(this.temperatureToHumidity, temperature);
      let location = this.getFromMaps(this.humidityToLocation, humdity);
      return location;
    });

    this.p1 = Math.min(...locations);
    assert(this.p1 == 322500873);
  }

  

  override solveP2(): void {
    
    let seedMap : {start: number, end: number}[] = []

    for (let x = 0; x < this.seeds.length; x += 2) {
      seedMap.push({ start: this.seeds[x], end: this.seeds[x] + (this.seeds[x + 1] - 1) });
    }

    let location = -1
    while (true) {
      location++;
      let humdity = this.getBackwardsFromMap(this.humidityToLocation, location);
      let temperature = this.getBackwardsFromMap(this.temperatureToHumidity,humdity);
      let light = this.getBackwardsFromMap(this.lightToTemperature, temperature);
      let water = this.getBackwardsFromMap(this.waterToLight, light);
      let fertilizer = this.getBackwardsFromMap(this.fertilizerToWater, water);
      let soil = this.getBackwardsFromMap(this.soilToFertilizer, fertilizer);
      let seed = this.getBackwardsFromMap(this.seedToSoil, soil);

      if (this.seedInRange(seedMap, seed)) {
        this.p2 = location;

        break;
      }
    }
    assert(this.p2 == 108956227);
  }
}

new Day5().solve();
