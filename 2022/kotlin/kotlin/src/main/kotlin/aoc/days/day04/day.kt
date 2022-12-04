package aoc.days.day04

import aoc.days.day0.DayBaseClass
import aoc.utils.ReadInput
import java.util.stream.IntStream
//Part 1: 477
//Part 2: 830
class Assignment(a: String){
    private var start : Int = 0
    private var end : Int = 0
    private var range = listOf<Int>();
    fun contains(other :Assignment) :Boolean{
        if(this.start<=other.start && this.end>=other.end){
            return true
        }
        return false
    }
    fun overlaps(other: Assignment): Boolean{
        val a = range.toHashSet()
        a.retainAll(other.range.toHashSet())
        return a.isNotEmpty()
    }
    init {
        val b = a.split("-").map { it.toInt() }
        start = b[0]
        end = b[1]
        this.range = IntStream.rangeClosed(start, end)
            .boxed().toList()
    }
}
class Day (testInput: Boolean = false): DayBaseClass(testInput) {
    private var assignmentPairs = listOf<List<Assignment>>()
    @Override
    override fun readInput(){
        this.input = ReadInput.toStringList(this.path)
    }

    @Override
    override fun solve() {
        this.assignmentPairs = (this.input as MutableList<String>).map{it.split(",").map { Assignment(it) }}
        this.p1 = this.assignmentPairs.map { if(it[0].contains(it[1]) || it[1].contains(it[0])) 1 else 0 }.sum()
        this.p2 = this.assignmentPairs.map { if(it[0].overlaps(it[1]) || it[1].overlaps(it[0])) 1 else 0 }.sum()
    }
}
fun main(){
    Day()
}