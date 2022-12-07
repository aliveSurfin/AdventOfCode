package aoc.utils

import java.io.File
import java.nio.file.Paths

class ReadInput {
    companion object {
        fun createPath(path: String): String {
            return Paths.get("").toAbsolutePath().toString() +
                    "${File.separator}src${File.separator}main${File.separator}kotlin${File.separator}" + path;

        }

        fun toIntList(path: String): List<Int> {
            return File(createPath(path)).readLines().map { it.toInt() }
        }

        fun toStringList(path: String): List<String> {
            return File(createPath(path)).readLines()
        }

        fun toString(path: String): String{
            return File(createPath(path)).readText()
        }
    }
}