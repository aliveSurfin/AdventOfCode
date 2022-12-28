package aoc.days.day11

import aoc.days.day0.DayBaseClass
import aoc.utils.ReadInput
import java.math.BigInteger
import kotlin.properties.Delegates

class Day (testInput: Boolean = false): DayBaseClass(testInput) {
    //Monkey 0:
    //  Starting items: 59, 65, 86, 56, 74, 57, 56
    //  Operation: new = old * 17
    //  Test: divisible by 3
    //    If true: throw to monkey 3
    //    If false: throw to monkey 6
    class Monkey(input :String, private var lessWorry: Boolean = false){
        var items : MutableList<BigInteger> = mutableListOf()
        var staticOperand by Delegates.notNull<String>()
        var operator by Delegates.notNull<String>()
        var testOperand by Delegates.notNull<BigInteger>()
        var testTrue by Delegates.notNull<BigInteger>()
        var testFalse by Delegates.notNull<BigInteger>()

        var inspections = 0

        fun getStaticOperand(inp: BigInteger) : BigInteger{
            return if(staticOperand == "old"){
                inp
            }else{
                staticOperand.toBigInteger()
            }
        }
        fun operation(inp : BigInteger) : BigInteger{
            if (operator == "*"){
                return inp * getStaticOperand(inp)
            }
            return inp + getStaticOperand(inp)
        }
        fun test(inp: BigInteger) : Map<BigInteger,BigInteger>{
            if((inp % testOperand) == BigInteger.valueOf(0)){
                return mapOf(testTrue to inp)
            }
            return mapOf(testFalse to inp)
        }
        init {
            val lines = input.split("\n")
            items = lines[1].split("Starting items: ")[1].split(',')
                .map { e -> e.trim().toBigInteger() }.toMutableList()

            val op = lines[2].split("Operation: new = old ")[1].trim().split(" ")

            staticOperand = op[1]
            operator = op[0]
            testOperand = lines[3].split("Test: divisible by ")[1].toBigInteger()
            testTrue = lines[4].split("If true: throw to monkey ")[1].toBigInteger()
            testFalse = lines[5].split("If false: throw to monkey ")[1].toBigInteger()
        }

        fun round(lcm: BigInteger = BigInteger.valueOf(0)) : MutableList<Map<BigInteger,BigInteger>>{

            val throws = mutableListOf<Map<BigInteger, BigInteger>>()
            items.forEachIndexed { index, i ->
                var j = operation(i)
                inspections+=1;
                if (lessWorry){
                    j = j.mod(lcm)
                    throws.add(test(j))
                }else {
                    val k = j / BigInteger.valueOf(3);
                    throws.add(test(k))
                }
            }
            this.items.clear()
            return throws
        }


    }
    @Override
    override fun readInput(){
        this.input = ReadInput.toString(this.path)
    }

    fun p1(){
        var monkeys = (this.input as String).split("\n\n").map { e-> Monkey(e) }
        repeat(20) {
            monkeys.forEachIndexed { index, monkey ->
                val throws = monkey.round()
                throws.forEach { thr ->
                    thr.keys.forEach {
                        monkeys[it.toInt()].items.add(thr[it]!!)
                    }

                }
            }
        }

        this.p1 = monkeys.map { it.inspections }.sorted().takeLast(2)
        this.p1 = (this.p1 as List<Int>)[0] * (this.p1 as List<Int>)[1]
    }

    fun p2(){
        var monkeys = (this.input as String).split("\n\n").map { e-> Monkey(e, true) }
        var testOperands = monkeys.map { m-> m.testOperand }
        var lcm : BigInteger = BigInteger.valueOf(1);
        testOperands.forEach{
            lcm *= (lcm *it)
        }
        repeat(10000) {
            monkeys.forEachIndexed { index, monkey ->
                val throws = monkey.round(lcm)
                throws.forEach { thr ->
                    thr.keys.forEach {
                        monkeys[it.toInt()].items.add(thr[it]!!)
                    }

                }
            }
            if((it+1) % 1000 == 0 || it == 19){
                println("${it}:  ${monkeys.map { mn-> mn.inspections}} }")
            }
        }

        this.p2 = monkeys.map { it.inspections }.sorted().takeLast(2)
        var test :BigInteger = ((this.p2 as List<Int>)[0].toBigInteger()) * ((this.p2 as List<Int>)[1].toBigInteger())
        this.p2 = test
    }
    @Override
    override fun solve() {
        p1()
        p2()

    }
}
fun main(){
    Day()
}