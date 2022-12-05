package aoc.days.day05

import aoc.days.day0.DayBaseClass
import aoc.utils.ReadInput

class Day (testInput: Boolean = false): DayBaseClass(testInput) {
    @Override
    override fun readInput(){
        this.input = ReadInput.toStringList(this.path)
    }

    fun part1and2(part: Int) : String{
        val inputTyped = this.input as List<String>
        val endOfBoxes = inputTyped.indexOf("")
        val numCols = inputTyped.subList(endOfBoxes-1,endOfBoxes)[0].split("   ").size
        var boxColumns :MutableList<MutableList<Char>> = MutableList(numCols){ mutableListOf() }
        val boxesInput = inputTyped.subList(0,endOfBoxes-1)
        val commandInput = inputTyped.subList(endOfBoxes+1, inputTyped.size)

        boxesInput.reversed().forEach {
            val arr = it.chunked(4)
            for(i in arr.indices){
                if(!arr[i].contains("[")) continue
                boxColumns[i].add(arr[i][1])
            }
        }
        commandInput.forEach {
            val command = it.split(" ")
            val amount = command[1].toInt()
            val indexFrom = command[3].toInt()-1
            val indexTo = command[5].toInt()-1
            val boxesToMove = boxColumns[indexFrom].takeLast(amount)
            boxColumns[indexFrom] = boxColumns[indexFrom].dropLast(amount).toMutableList()
            if (part == 1){
                boxesToMove.reversed().forEach {boxColumns[indexTo].add(it) }

            }else{
                boxColumns[indexTo].addAll(boxesToMove)
            }
        }
        return String(boxColumns.map { it.takeLast(1)[0] }.toCharArray())
    }
    @Override
    override fun solve() {
        this.p1 = part1and2(1)
        this.p2 = part1and2(2)
    }
}
fun main(){
    Day()
}