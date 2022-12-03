package aoc.days.day03

import aoc.days.day0.DayBaseClass
import aoc.utils.ReadInput

class Day (testInput: Boolean = false): DayBaseClass(testInput) {

    fun getPriority(s: Char) :Int{
        if (s == s.uppercaseChar()){
            return s.code - 38
        }
        return s.code - 96
    }
    @Override
    override fun readInput(){
        this.input = ReadInput.toStringList(this.path)
    }
    //Part 1: 7785
    //Part 2: 2633
    fun part2(){
        this.p2 = mutableListOf<Int>()
        var x =0
        val arr = (this.input as List<String>)
        if(arr.size% 3 !=0){
            throw Error("Input size is not multiple of 3")
        }
        while (x < arr.size){
            val set1 = arr[x].toHashSet()
            val set2 = arr[x+1].toHashSet()
            val set3 = arr[x+2].toHashSet()

            set1.retainAll(set2)
            set1.retainAll(set3)
            (this.p2 as MutableList<Int>).add(set1.toList().map { getPriority(it) }.sum())
            x+=3
        }
        this.p2 = (this.p2 as MutableList<Int>).sum()
    }

    fun part1(){
        this.p1 = mutableListOf<Int>()

        this.p1 = (this.input as List<String>).map { it.chunked(it.length/2) }.sumOf{
            val set1 = it[0].toHashSet()
            val set2 = it[1].toHashSet()
            set1.retainAll(set2)
            (set1.toList().map { getPriority(it) }.sum())
        }
    }
    @Override
    override fun solve() {

        part1()
        part2()
    }
}


fun main(){
    Day()
}