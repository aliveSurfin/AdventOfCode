package aoc.days.day0

import aoc.utils.ReadInput
open class DayBaseClass(var testInput: Boolean = false) {
    var path : String = ""
    var input : Any = ""
    var p1 : Any = 0;
    var p2 : Any = 0;
    init {
        this.path = getPackage()?.split(".")?.joinToString("\\").toString() + "\\" +
                (if (testInput) "test.txt" else "input.txt")
        this.readInput()
        this.solve()
        println("Input \n ${this.input}")
        println("Part 1: ${this.p1}")
        println("Part 2: ${this.p2}")

    }
    open fun solve(){

    }

    open fun readInput(){
        this.input = ReadInput.toStringList(this.path)
    }
    private fun getPackage() : String? {
        return this.javaClass.`package`?.name
    }
}
fun main(){
    DayBaseClass()
}