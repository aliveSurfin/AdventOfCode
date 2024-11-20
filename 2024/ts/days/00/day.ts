import { Day } from "../../day";
import assert from "assert";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class Day0 extends Day {
  constructor() {
    super(__dirname);
  }


  override solveP1(): void {
  
  }

  override solveP2(): void {


  }
}

new Day0().solve();
