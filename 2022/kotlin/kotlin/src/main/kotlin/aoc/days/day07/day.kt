package aoc.days.day07

import aoc.days.day0.DayBaseClass
import aoc.utils.ReadInput


class Day(testInput: Boolean = false) : DayBaseClass(testInput) {
    var files: MutableMap<String, aoc_file> = mutableMapOf()

    open inner class aoc_file(var name: String, var size: Int = 0) {

        open fun size(): Int {
            return this.size
        }
    }

    inner class aoc_dir(name: String) : aoc_file(name) {
        var children: MutableList<String> = mutableListOf()

        @Override
        override fun size(): Int {
            return children.sumOf { files[it]!!.size() }
        }

    }

    @Override
    override fun readInput() {
        this.input = ReadInput.toStringList(this.path)
    }

    @Override
    override fun solve() {
        this.files = mutableMapOf()
        var currentDir = "/"
        this.files["/"] = aoc_dir("/")
        var inputSeq = (this.input as List<String>)
        inputSeq = inputSeq.drop(1) // don't need to cd into /
        while (inputSeq.isNotEmpty()) {
            val command = inputSeq.first().trim().split(" ")
            if (command.size == 3) { // $ cd <x>
                if (command[2] == "..") {
                    currentDir = currentDir.split("/").dropLast(1).joinToString("/")
                } else {
                    currentDir = currentDir + "/" + command[2];
                }
                inputSeq = inputSeq.drop(1)
            }

            if (command.size == 2) { // $ ls
                inputSeq = inputSeq.drop(1)
                val curChildren: MutableMap<String, aoc_file> = mutableMapOf()
                while (inputSeq.isNotEmpty() && inputSeq.first()[0] != '$') {
                    val file = inputSeq.first().trim().split(" ")
                    if (file[0] == "dir") {
                        val cur = aoc_dir(currentDir + "/" + file[1])
                        curChildren[cur.name] = cur
                    } else {
                        val cur = aoc_file(currentDir + "/" + file[1], file[0].toInt())
                        curChildren[cur.name] = cur
                    }
                    inputSeq = inputSeq.drop(1)
                }

                (this.files[currentDir] as aoc_dir).children = curChildren.keys.toMutableList()
                this.files = (this.files + curChildren) as MutableMap<String, aoc_file>
            }
        }

        val totalSize = files["/"]!!.size()

        this.p1 = files.keys.filter { files[it] is aoc_dir }.filter { (files[it] as aoc_dir).size() <= 100000 }
            .sumOf { (files[it] as aoc_dir).size() }

        this.p2 = files.keys.filter { files[it] is aoc_dir }
            .filter { (files[it] as aoc_dir).size() >= 30000000 - (70000000 - totalSize) }
            .map { files[it]!!.size() }.sortedDescending().takeLast(1).first()


    }
}

fun main() {
    Day()
}