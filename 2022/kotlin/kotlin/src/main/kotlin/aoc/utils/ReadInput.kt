package aoc.utils

import java.io.File
import java.nio.file.Paths

class ReadInput {
    companion object {
        fun createPath(day: String, testInput: Boolean = false): String {
            return Paths.get("").toAbsolutePath().toString() +
                    "\\src\\main\\kotlin\\aoc\\days\\day" +
                    day + "\\" + (if (testInput) "test" else "input") + ".txt"

        }

        fun toIntList(day: String, testInput: Boolean = false): List<Int> {
            return File(createPath(day, testInput)).readLines().map { it.toInt() }
        }

        fun toStringList(day: String, testInput: Boolean = false): List<String> {
            println(createPath(day, testInput))
            return File(createPath(day, testInput)).readLines()
        }
    }
}