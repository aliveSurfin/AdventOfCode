package aoc.utils

import java.io.File
import java.nio.file.Paths

class ReadInput {
    companion object {
        fun createPath(path: String): String {
            return Paths.get("").toAbsolutePath().toString() +
                    "\\src\\main\\kotlin\\" + path;

        }

        fun toIntList(path: String): List<Int> {
            return File(createPath(path)).readLines().map { it.toInt() }
        }

        fun toStringList(path: String): List<String> {
            println(createPath(path))
            return File(createPath(path)).readLines()
        }
    }
}