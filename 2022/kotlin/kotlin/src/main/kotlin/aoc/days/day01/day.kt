package aoc.days.day01

import aoc.days.day0.DayBaseClass
import aoc.utils.ReadInput

class Day (testInput: Boolean = false): DayBaseClass(testInput) {

    @Override
    override fun readInput(){
        this.input = ReadInput.toString(this.path)
    }

    @Override
    override fun solve() {
        val sums  = (this.input as String).split("\r\n\r\n")
            .map { it.split("\r\n").sumOf { it.toInt() }}.toMutableList()
        sums.sort()
        this.p1 = sums.takeLast(1).sum()
        this.p2 = sums.takeLast(3).sum()
    }
}
fun main(){
    Day()
}