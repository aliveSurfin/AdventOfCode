package aoc.days.day02

import aoc.days.day0.DayBaseClass
import aoc.utils.ReadInput

class Day(testInput: Boolean = false) : DayBaseClass(testInput) {
    // A = Rock, B = Paper, C = Scissors
    // X = Rock, Y = Paper, Z = Scissors
    private fun scores(a: String): Int? = mapOf("X" to 1, "Y" to 2, "Z" to 3)[a]
    private fun winnerMap(a: String): Int? =
        mapOf(
            "AX" to 3, "AY" to 6, "AZ" to 0,
            "BX" to 0, "BY" to 3, "BZ" to 6,
            "CX" to 6, "CY" to 0, "CZ" to 3,
        )[a]

    private fun isWinner(lhs: String, rhs: String): Int {
        return winnerMap(lhs + rhs)!!.plus(scores(rhs)!!)
    }

    @Override
    override fun readInput() {
        this.input = ReadInput.toString(this.path)
    }

    fun part2() {
        this.p2 = (this.input as List<List<String>>).map {
            val result = if (it[1] == "X") 0 else if (it[1] == "Y") 3 else 6
            val xResult = winnerMap(it[0] + "X")
            val yResult = winnerMap(it[0] + "Y")
            val zResult = winnerMap(it[0] + "Z")
            when (result) {
                xResult -> 1 + result
                yResult -> 2 + result
                zResult -> 3 + result
                else -> {
                    throw NotImplementedError("X Y Z no result")
                }
            }

        }.sum()
    }

    fun part1() {

        this.p1 = (this.input as List<List<String>>).sumOf { isWinner(it[0], it[1]) }
    }

    @Override
    override fun solve() {
        this.input = this.input.toString().replace("\r", "").split("\n").map { it.split(" ") }
        part1()
        part2()
    }
}

fun main() {
    Day()
}