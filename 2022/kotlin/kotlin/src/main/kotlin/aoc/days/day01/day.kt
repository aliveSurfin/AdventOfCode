package aoc.days.day01

import aoc.days.day0.DayBaseClass
import aoc.utils.ReadInput

class Day (testInput: Boolean = false): DayBaseClass(testInput) {

    @Override
    override fun readInput(){
        this.input = ReadInput.toIntList(this.path)
    }

    @Override
    override fun solve() {
        val elves = mutableListOf<Int>()
        var current  =0
        (input as List<String>).forEach {
            if (it.equals("")){
                elves.add(current)
                current = 0
            }else {
                current += it.toInt()
            }
            }
        elves.sort()
        this.p1 = elves.takeLast(1).sum()
        this.p2 = elves.takeLast(3).sum()
        //Part 1: 71502
        //Part 2: 208191
    }
}
fun main(){
    Day()
}