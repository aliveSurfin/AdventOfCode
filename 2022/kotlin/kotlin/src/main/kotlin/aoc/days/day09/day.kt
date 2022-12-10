package aoc.days.day09

import aoc.days.day0.DayBaseClass
import aoc.utils.ReadInput
import kotlin.math.abs
import kotlin.math.max

class Day(testInput: Boolean = false) : DayBaseClass(testInput) {
    data class Command(val dir: Char, val num: Int) {
        constructor(inp: String) : this(inp.split(' ')[0].single(), inp.split(' ')[1].toInt())
    }

    data class Point(var x: Int, var y: Int) {

        override fun toString(): String {
            return "${x}:${y}"
        }
        fun dist(other: Point): Int {
            if (this.x == other.x || this.y== other.y) {
                return abs(x - other.x) + abs(y - other.y)
            }
//                println("dist")
//            println(this)
//            println(other)
            return max(abs(this.x-other.x),abs(this.y-other.y))
        }


        fun move(dir: Char) {
            when (dir) {
                'U' -> y -= 1
                'D' -> y += 1
                'R' -> x += 1;
                'L' -> x -= 1;
            }
        }

        fun moveTo(other: Point, dir: Char) {
//            println("move")
//            println(this)
//            println(other)
            if (this.x == other.x) {
                this.y = (this.y + other.y) / 2
                return
            }
            if (this.y == other.y) {
                this.x = (this.x + other.x) / 2
                return
            }

//            ....2.
//            ......
//            ...1..
//            ......

//            ...2..
//            .1....
//            ......
//            ......


            if(this.y> other.y && this.x<other.x){ // up to right
                if(this.y-other.y > other.x - this.x){
                    this.x = other.x
                    this.y = other.y +1;
                }else{
                    this.x = other.x-1;
                    this.y = other.y;
                }

            }
//            ..2...
//            ......
//            ...1..
//            ......

//            .2....
//            ...1..
//            ......
//            ......

            if(this.y> other.y && this.x > other.x){ // up to left
                if(this.y-other.y > this.x - other.x) {
                    this.x = other.x
                    this.y = other.y + 1;
                }else{
                    this.y = other.y
                    this.x = other.x +1;
                }
            }
//            ..1...
//            ......
//            ...2..
//            ......

//            .1....
//            ...2..
//            ......
//            ......
            if(this.y< other.y && this.x< other.x){ // down right
                if(other.y-this.y > other.x-this.x){
                    this.x = other.x
                    this.y = other.y-1
                }else{
                    this.x = other.x -1;
                    this.y = other.y;
                }

            }
//            ....1.
//            ......
//            ...2..
//            ......

//            .....1
//            ...2..
//            ......
//            ......
            if(this.y< other.y && this.x > other.x){ // down left
                if(other.y-this.y > this.x-other.x) {
                    this.x = other.x
                    this.y = other.y - 1
                }else{
                    this.x = other.x + 1;
                    this.y = other.y
                }
            }
        }
    }

    @Override
    override fun readInput() {
        this.input = ReadInput.toStringList(this.path)
    }


    fun solvep1(){
        val commands = (this.input as List<String>).map { Command(it) }
        val tail = Point(4, 4)
        val head = Point(4, 4)
        val tailMap = mutableListOf<Point>(tail.copy())
        commands.forEach {
            println(it)
            repeat(it.num) { i ->
                for (y in 0..10) {
                    for (x in 1..10) {
                        if (Point(x, y) == head) {
                            print('H')
                        } else if (Point(x, y) == tail) {
                            print('T')
                        } else if (Point(x, y) == Point(4, 4)) {
                            print('s')
                        } else {
                            print('.')
                        }

                    }
                    println()
                }
                println()
                head.move(it.dir)
                for (y in 0..10) {
                    for (x in 1..10) {
                        if (Point(x, y) == head) {
                            print('H')
                        } else if (Point(x, y) == tail) {
                            print('T')
                        } else if (Point(x, y) == Point(4, 4)) {
                            print('s')
                        } else {
                            print('.')
                        }

                    }
                    println()
                }
                println("distance ${head.dist(tail)}")
                if (head.dist(tail) > 1) {
                    tail.moveTo(head, it.dir)
                    if(!tailMap.contains(tail.copy())){
                        tailMap.add(tail.copy())
                    }
//                    println("tail map")
                    println(tailMap)
                }
            }
        }
        this.p1 = tailMap.size
    }

    fun solvep2(){
        val commands = (this.input as List<String>).map { Command(it) }
        val start = 20;
        val size = 50;
        val items = MutableList(10) {Point(start,start)}
        val tailMap = mutableSetOf<String>(items[0].toString())
        commands.forEach {
            println(it)

            repeat(it.num) { index ->

                items[0].move(it.dir)
                for (i in 1..9){
                    if (items[i].dist(items[i-1]) > 1){
                        items[i].moveTo(items[i-1],it.dir)
                        if(i==9){
                            if(!tailMap.contains(items[i].toString())){
                                tailMap.add(items[i].toString())
                            }
                        }
                    }
                }
            }
            for (y in 0..size) {
                for (x in 1..size) {
                    val itemIndex = items.indexOfFirst { it == Point(x,y) }
                    if(itemIndex!=-1){
                        print(itemIndex)
                    }else{
                        if(Point(x,y)==Point(start,start)){
                            print('s')
                        }else{
                            print('.')
                        }
                    }


                }
                println()
            }
            println()
        }
        this.p2 = tailMap.size
    }
    @Override
    override fun solve() {
        //solvep1()
        solvep2()

    }
}

fun main() {
    Day()
}