package aoc.days.day02

import aoc.days.day0.DayBaseClass
import aoc.utils.ReadInput

//Part 1: 12772
//Part 2: 11618
// A = Rock, B = Paper, C = Scissors
// X = Rock, Y = Paper, Z = Scissors

class Day(testInput: Boolean = false) : DayBaseClass(testInput) {

    private fun scores(a: Char): Int = a.code - 87
    private fun winnerMap(lhs: Char, rhs: Char): Int {
        return when (rhs.code - lhs.code) {
            23 -> 3
            22, 25 -> 0
            21, 24 -> 6
            else -> {
                throw NotImplementedError("")
            }
        }
    }

    @Override
    override fun readInput() {
        this.input = ReadInput.toString(this.path)
    }

    fun part2() {
        this.p2 = (this.input as List<List<Char>>).sumOf {
            val result = (it[1].code - 88) * 3
            val xResult = winnerMap(it[0], 'X')
            val yResult = winnerMap(it[0], 'Y')
            val zResult = winnerMap(it[0], 'Z')
            when (result) {
                xResult -> 1 + result
                yResult -> 2 + result
                zResult -> 3 + result
                else -> {
                    throw NotImplementedError("X Y Z no result")
                }
            }
        }
    }

    fun part1() {
        this.p1 = (this.input as List<List<Char>>).sumOf { winnerMap(it[0], it[1]).plus(scores(it[1])) }
    }

    @Override
    override fun solve() {
        this.input = this.input.toString().replace("\r", "").split("\n").map { it.split(" ").map { it.single() } }
        part1()
        part2()
    }
}

fun main() {
    Day()


}