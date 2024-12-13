package aoc.days.day04

import aoc.days.day0.DayBaseClass
import aoc.utils.ReadInput

//Part 1: 477
//Part 2: 830
class Assignment(a: String) {
    private var start: Int = 0
    private var end: Int = 0
    fun contains(other: Assignment): Boolean {
        return (this.start <= other.start && this.end >= other.end)
    }

    fun overlaps(other: Assignment): Boolean {
        return ((this.start >= other.start && this.start <= other.end)
                || (this.end >= other.start && this.end <= other.end))
    }

    init {
        val b = a.split("-").map { it.toInt() }
        start = b[0]
        end = b[1]
    }
}

class Day(testInput: Boolean = false) : DayBaseClass(testInput) {
    private var assignmentPairs = listOf<List<Assignment>>()

    @Override
    override fun readInput() {
        this.input = ReadInput.toStringList(this.path)
    }

    @Override
    override fun solve() {
        this.assignmentPairs = (this.input as MutableList<String>).map { it.split(",").map { Assignment(it) } }
        this.p1 = this.assignmentPairs.map { if (it[0].contains(it[1]) || it[1].contains(it[0])) 1 else 0 }.sum()
        this.p2 = this.assignmentPairs.map { if (it[0].overlaps(it[1]) || it[1].overlaps(it[0])) 1 else 0 }.sum()
    }
}

fun main() {
    Day()
}