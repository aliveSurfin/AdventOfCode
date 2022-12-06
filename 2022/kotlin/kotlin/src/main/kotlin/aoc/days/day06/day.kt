package aoc.days.day06

import aoc.days.day0.DayBaseClass
import aoc.utils.ReadInput

class Day(testInput: Boolean = false) : DayBaseClass(testInput) {

    @Override
    override fun readInput() {
        this.input = ReadInput.toString(this.path)
    }

    fun findIndexOfUniqueString(length: Int, stringList: List<String>): Int {
        stringList.forEachIndexed { index, c ->
            if (index >= length - 1 && stringList.subList(index - length + 1, index + 1).toHashSet().size == length) {
                return index + 1
            }
        }
        return -1
    }

    @Override
    override fun solve() {
        val chunked = (this.input as String).chunked(1)
        this.p1 = findIndexOfUniqueString(4, chunked)
        this.p2 = findIndexOfUniqueString(14, chunked)
    }
}

fun main() {
    Day()
}