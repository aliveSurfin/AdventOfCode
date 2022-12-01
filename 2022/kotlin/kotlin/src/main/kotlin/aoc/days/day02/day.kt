package aoc.days.day02

import aoc.days.day0.DayBaseClass
import aoc.utils.ReadInput

class Day (testInput: Boolean = false): DayBaseClass(testInput) {

    @Override
    override fun readInput(){
        this.input = ReadInput.toIntList(this.path)
    }

    @Override
    override fun solve() {

    }
}
fun main(){
    Day()
}