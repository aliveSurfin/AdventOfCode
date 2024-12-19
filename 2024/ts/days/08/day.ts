import { Day } from "../../day";
//@ts-ignore
import assert from "assert";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

//@ts-ignore
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class Day08 extends Day {
  constructor() {
    super(__dirname, false);
  }

  override solveP1(): void {
    const antennas = this.getAntennas();
    const antinodes = this.calculateAntinodes(antennas);
        //this.printGridWithAntinodes(antinodes);

    const uniqueAntinodes = this.getUniqueAntinodes(antinodes);
    this.p1 = uniqueAntinodes.length;
    assert(this.p1 === 228);
  }

  override solveP2(): void {
    const antennas = this.getAntennas();
    const antinodes = this.calculateAllAntinodes(antennas);
        //this.printGridWithAntinodes(antinodes);
    const uniqueAntinodes = this.getUniqueAntinodes(antinodes);

    this.p2 = uniqueAntinodes.length;
    assert(this.p2 === 766);
  }

  private getAntennas(): { x: number, y: number, frequency: string }[] {
    const antennas: { x: number, y: number, frequency: string }[] = [];
    for (let y = 0; y < this.listOfStrings.length; y++) {
      for (let x = 0; x < this.listOfStrings[y].length; x++) {
        const char = this.listOfStrings[y][x];
        if (char !== '.') {
          antennas.push({ x, y, frequency: char });
        }
      }
    }
    return antennas;
  }

  private calculateAntinodes(antennas: { x: number, y: number, frequency: string }[]): { x: number, y: number }[] {
    const antinodes: { x: number, y: number }[] = [];
    for (let i = 0; i < antennas.length; i++) {
      for (let j = i + 1; j < antennas.length; j++) {
        if (antennas[i].frequency !== antennas[j].frequency) continue;

        const distanceX = antennas[j].x - antennas[i].x;
        const distanceY = antennas[j].y - antennas[i].y;

        const antinode1 = { x: antennas[i].x - distanceX, y: antennas[i].y - distanceY };
        const antinode2 = { x: antennas[j].x + distanceX, y: antennas[j].y + distanceY };

        if (this.isInsideGrid(antinode1)) {
          antinodes.push(antinode1);
        }
        if (this.isInsideGrid(antinode2)) {
          antinodes.push(antinode2);
        }
      }
    }
    return antinodes;
  }

  private calculateAllAntinodes(antennas: { x: number, y: number, frequency: string }[]): { x: number, y: number }[] {
    const antinodes: { x: number, y: number }[] = [];
    for (let i = 0; i < antennas.length; i++) {
      for (let j = i + 1; j < antennas.length; j++) {
        if (antennas[i].frequency !== antennas[j].frequency) continue;

        const distanceX = antennas[j].x - antennas[i].x;
        const distanceY = antennas[j].y - antennas[i].y;

        for (let k = -1; k <= 1; k += 2) {
          let x = antennas[i].x;
          let y = antennas[i].y;
          while (this.isInsideGrid({ x, y })) {
            antinodes.push({ x, y });
            x += k * distanceX;
            y += k * distanceY;
          }
        }
      }
    }
    return antinodes;
  }

  private isInsideGrid(point: { x: number, y: number }): boolean {
    return point.x >= 0 && point.x < this.listOfStrings[0].length && point.y >= 0 && point.y < this.listOfStrings.length;
  }

  private printGridWithAntinodes(antinodes: { x: number, y: number }[]): void {
    const grid = this.listOfStrings.map(row => row.split(''));
    for (const antinode of antinodes) {
      grid[antinode.y][antinode.x] = '#';
    }
    const output = grid.map(row => row.join('')).join('\n');
    console.log(output);
  }

  private getUniqueAntinodes(antinodes: { x: number, y: number }[]): { x: number, y: number }[] {
    const uniqueAntinodes = new Map<string, { x: number, y: number }>();
    for (const antinode of antinodes) {
      const key = `${antinode.x},${antinode.y}`;
      if (!uniqueAntinodes.has(key)) {
        uniqueAntinodes.set(key, antinode);
      }
    }
    return Array.from(uniqueAntinodes.values());
  }
}

new Day08().solve();