package aoc.days.day01

import aoc.days.day0.DayBaseClass
import aoc.utils.ReadInput

class Day : DayBaseClass() {

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