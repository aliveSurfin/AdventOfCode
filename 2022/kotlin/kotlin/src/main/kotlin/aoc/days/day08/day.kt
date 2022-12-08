package aoc.days.day08

import aoc.days.day0.DayBaseClass
import aoc.utils.ReadInput

class Day(testInput: Boolean = false) : DayBaseClass(testInput) {
    var grid: MutableList<MutableList<Int>> = mutableListOf()

    @Override
    override fun readInput() {
        this.input = ReadInput.toStringList(this.path)
    }
    fun printItem(item: Int){
        val RESET = "\u001B[0m"
        val RED = "\u001B[31m" // 9
        val BRIGHT_RED = "\u001b[31;1m" // 8
        val YELLOW = "\u001B[33m" // 7
        val BRIGHT_YELLOW = "\u001b[33;1m" // 6
        val GREEN = "\u001B[32m" // 5
        val BRIGHT_GREEN = "\u001b[32;1m" // 4
        val BRIGHT_WHITE = "\u001b[37;1m" // 3
        val WHITE = "\u001B[0m" // 2
        val BRIGHT_BLACK = "\u001b[30;1m" // 1
        val BLACK = "\u001b[30m"
        val colours = mapOf<Int,String>(
            9 to RED,
            8 to BRIGHT_RED,
            7 to YELLOW,
            6 to BRIGHT_YELLOW,
            5 to GREEN,
            4 to BRIGHT_GREEN,
            3 to BRIGHT_WHITE,
            2 to WHITE,
            1 to BRIGHT_BLACK,
            0 to BLACK,
        )
        print(colours[item]+item+RESET)

    }
    @Override
    override fun solve() {

        this.grid = (this.input as List<String>).map { it.chunked(1).map { it.toInt() }.toMutableList() }.toMutableList()
        var count = 0;
        var maxView = 0;
        this.grid.forEachIndexed { y, row ->
            row.forEachIndexed { x, item ->
            printItem(item)
                if(x==0 || y==0 || x==row.lastIndex || y==grid.lastIndex){
                    count +=1;
                }else{

                    var left = row.subList(0, x).any { it >= item }
                    var right = row.subList(x + 1, row.lastIndex + 1).any { it >= item }

                    var leftView = 0
                    var rightView = 0
                    var upView = 0
                    var downView = 0

                    var up = false
                    var down = false
                    var i =y;
                    while (i>0){
                        i--;
                        val check = grid[i][x]
                        if (check >= item){
                            up = true;
                            break;
                        }
                    }
                    i=y;
                    while (i<grid.lastIndex){
                        i++;
                        val check = grid[i][x]
                        if (check >= item){
                            down = true;
                        }
                    }
                    testInput
                    if (!left || !right || !up || !down){
                        count+=1;
                    }

                    //right
                    i=x
                    while (i< row.lastIndex){
                        i++;
                        if(grid[y][i]< item){
                            rightView++
                        }else{
                            rightView++
                            break;
                        }
                    }
                    //left
                    i=x
                    while (i>0){
                        i--;
                        if(grid[y][i]< item){
                            leftView++
                        }else{
                            leftView++
                            break;
                        }
                    }
                    //up
                    i=y
                    while (i>0){
                        i--;
                        if(grid[i][x]< item){
                            upView++;
                        }else{
                            upView++;
                            break;
                        }
                    }
                    //down
                    i=y
                    while (i<grid.lastIndex){
                        i++;
                        if(grid[i][x]< item){
                            downView++
                        }else{
                            downView++
                            break;
                        }
                    }
                    val thisView = upView * leftView * downView * rightView
                    if(thisView > maxView){
                        maxView = thisView
                    }
                }
                print(" ")
            }
            println()

        }
        this.p1 = count
        this.p2 = maxView
    }
}

fun main() {
    Day()
}