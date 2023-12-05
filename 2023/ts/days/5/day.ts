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

  getBackwardsFromMap(maps: DSR[], destinationNo: number) {
    for (let x = 0; x < maps.length; x++) {
      let curMap = maps[x];
      if (
        destinationNo >= curMap.destination &&
        destinationNo <= curMap.destination + curMap.range - 1
      ) {
        return curMap.source + (destinationNo - curMap.destination);
      }
    }
    return destinationNo;
  }
  override solveP1(): void {
    let split = this.input.split("\n\n");
    let seeds = split[0]
      .split(": ")[1]
      .split(" ")
      .map((e) => parseInt(e));
    this.seedToSoil = this.mergeAllMaps(split[1]);
    this.soilToFertilizer = this.mergeAllMaps(split[2]);
    this.fertilizerToWater = this.mergeAllMaps(split[3]);
    this.waterToLight = this.mergeAllMaps(split[4]);
    this.lightToTemperature = this.mergeAllMaps(split[5]);
    this.temperatureToHumidity = this.mergeAllMaps(split[6]);
    this.humidityToLocation = this.mergeAllMaps(split[7]);

    let locations = seeds.map((seed) => {
      let soil = this.getFromMap(this.seedToSoil, seed);
      let fertilizer = this.getFromMap(this.soilToFertilizer, soil);
      let water = this.getFromMap(this.fertilizerToWater, fertilizer);
      let light = this.getFromMap(this.waterToLight, water);
      let temperature = this.getFromMap(this.lightToTemperature, light);
      let humdity = this.getFromMap(this.temperatureToHumidity, temperature);
      let location = this.getFromMap(this.humidityToLocation, humdity);
      return location;
    });

    this.p1 = Math.min(...locations);
    assert(this.p1 == 322500873);
  }

  seedInRange(seedMap: any[], seedNo: number) {
    for (let x = 0; x < seedMap.length; x++) {
      if (seedNo <= seedMap[x].end && seedNo >= seedMap[x].start) {
        return true;
      }
    }
    return false;
  }

  override solveP2(): void {
    let split = this.input.split("\n\n");
    let seeds = split[0]
      .split(": ")[1]
      .split(" ")
      .map((e) => parseInt(e));

    //@ts-ignore
    let seedMap = [];

    for (let x = 0; x < seeds.length; x += 2) {
      //@ts-ignore
      seedMap.push({ start: seeds[x], end: seeds[x] + (seeds[x + 1] - 1) });
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
