package aoc.days.day12

import aoc.days.day0.DayBaseClass
import aoc.utils.ReadInput
import kotlin.math.abs

class Day (testInput: Boolean = false): DayBaseClass(testInput) {

    class Pathfinder(val grid: MutableList<MutableList<Char>>, var start: Point, var end : Point){

        val open = mutableListOf<Point>()
        val closed = mutableListOf<Point>()

        fun getNeighbours(point: Point) : List<Point>{
            var neighbours = mutableListOf<Point>()

            if(point.x >0){
                neighbours.add(Point(point.x-1, point.y,grid[point.y][point.x-1], point))
            }

            if (point.x < grid[0].size-1){
                neighbours.add(Point(point.x+1, point.y,grid[point.y][point.x+1], point))
            }

            if(point.y>0){
                neighbours.add(Point(point.x, point.y-1,grid[point.y-1][point.x], point))
            }

            if(point.y < grid.size-1){
                neighbours.add(Point(point.x, point.y+1, grid[point.y+1][point.x], point))
            }
            neighbours = neighbours.filter {
                point.canMoveTo(it)
            }.toMutableList()
            return neighbours
        }

        class Point(var x : Int, var y : Int, val weight : Char,var parent : Point? = null, var g: Int =0, var h : Int =0 ) : Comparable<Point>{
            fun f() = g+h
            override fun compareTo(other: Point): Int {
                return this.f().compareTo(other.f())
            }

            override fun equals(other: Any?): Boolean {
                if (other !is Point){
                    return false
                }
                if (this.x == other.x && this.y == other.y){
                    return true
                }
                return false
            }

            fun canMoveTo(other: Point): Boolean {
                if (other.weight == 'E'){
                    return this.weight == 'z'
                }
                return (other.weight.code - this.weight.code) <=1
            }
        }

        fun generatePath(point: Point): MutableList<Point> {
            var path = mutableListOf<Point>()
            var cur = point
            while (cur != start){
                path.add(cur)
                if(cur.parent == null){
                    break
                }
                cur = cur.parent!!
            }
            return path
        }

        fun dist(point: Point) : Int{
            return abs(point.x - end.x) + abs(point.y - end.y)
        }

        fun find(): MutableList<Point> {

            open.add(start)
            while (open.size>0){
                open.sort()
                var cur = open.removeFirst()
                //println(grid.joinToString("\n"))
                //println("current: ${cur.x} ${cur.y}")
                var neighbours = getNeighbours(cur)
                neighbours.forEach {
                    if (it == end){
                        return generatePath(it)
                    }
                    it.g = cur.g +1
                    it.h = dist(it)

                    if(open.contains(it)){
                        var predicateInOpen = open[open.indexOf(it)]
                        if(predicateInOpen.f() >= it.f()){
                            open[open.indexOf(it)] = it
                        }
                    }else if (closed.contains(it)){
                        var predicateInOpen = closed[closed.indexOf(it)]
                        if(predicateInOpen.f() >= it.f()){
                            open.add(it)
                        }
                    }else{
                        open.add(it)
                    }
                }
                closed.add(cur)
            }
            return mutableListOf()
        }
    }

    @Override
    override fun readInput(){
        this.input = ReadInput.toStringList(this.path)
    }
    fun direction(point: Pathfinder.Point) : Char{ // DEBUGGING
        if(point.parent == null ){
            return '/'
        }
        val parent = point.parent!!

        if (point.x < parent.x && parent.y == point.y){ // left
            return '<'
        }
        if (point.x > parent.x && parent.y == point.y){
            return '>'
        }

        if(point.y > parent.y && parent.x == point.x){
            return 'v'
        }

        if(point.y < parent.y && parent.x == point.x){
            return '^'
        }

        return '?'


    }
    @Override
    override fun solve() {
        var grid = (this.input as List<String>).map { e-> e.chunked(1).map { f-> f.single() } } as MutableList<MutableList<Char>>
        var start = Pathfinder.Point(0,0,'a')
        var end = Pathfinder.Point(0,0,'a')
        var possibleStarts = mutableListOf<Pathfinder.Point>()
        grid.forEachIndexed { index, chars ->
            if(chars.contains('E')) {
                end.x = chars.indexOf('E')
                end.y = index
            }
            chars.forEachIndexed { indexX, c ->
                if (c == 'a'){
                    possibleStarts.add(Pathfinder.Point(indexX,index,'a'))
                }
            }
        }



        val pf = Pathfinder(grid, start, end)
        var path = pf.find()
        this.p1 = path.size

        var startsSizes = possibleStarts.map {
            var curPf = Pathfinder(grid,it,end)
            curPf.find().size
        }
        this.p2= startsSizes.sorted().filter { it != 0 }.first()

    }
}
fun main(){
    Day()
}