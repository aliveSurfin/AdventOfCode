import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;

public class Day7 {
    public static int first =5;
    public static int second =36;
    public static ArrayList<String > fileInput = new ArrayList<String>();
    public static ArrayList<Step> steps = new ArrayList<Step>();
    public static ArrayList<Character> waiting = new ArrayList<Character>();
    public static String order = "";
    public static int total =0;
    public static int numOfWorkers =5;


    public static int timePlus(char chara){
        int it =0;
        for(char itc='a'; !Character.toString(itc).equalsIgnoreCase(Character.toString(chara));itc++){
            it++;
        }
        return it+60;
    }
    public static void loadFile(String fileName){

        String input;
        try{
            FileReader fr = new FileReader(fileName);
            BufferedReader br = new BufferedReader(fr);
            input = br.readLine();
            while(input!=null){

                fileInput.add(input);
                input = br.readLine();
            }
        }
        catch(FileNotFoundException ex){
            System.err.println(ex.getMessage());
        } catch (IOException e) {
            System.err.println("error");
        }
    }
    public static void parse(){
        String stepString ="";
        for(int x=0; x<fileInput.size(); x++){
            String test = fileInput.get(x);
            if (!stepString.contains(Character.toString(test.charAt(second)))){
                    stepString+=test.charAt(second);
            }
            
            
        }
        for(int a=0; a<stepString.length(); a++){
            steps.add(new Step(stepString.charAt(a)));
            for(int b=0; b<fileInput.size();b++){
                if(fileInput.get(b).charAt(second)==stepString.charAt(a)){
                    steps.get(steps.size()-1).after.add(fileInput.get(b).charAt(first));
                }

            }
        }
        String noString ="";
        for(int c=0; c<steps.size();c++){
            for (int d=0; d<steps.get(c).after.size();d++){
                if(!stepString.contains(Character.toString(steps.get(c).after.get(d)))){
                    if (!noString.contains(Character.toString(steps.get(c).after.get(d)))){
                        noString+= steps.get(c).after.get(d);
                    }

                }
            }
        }
        for(int y=0; y<noString.length();y++){
            steps.add(new Step(noString.charAt(y)));
        }
        //steps.add(new Step(steps.get(c).after.get(d)));
    }
    public static void displaySteps(){
        for (int x=0; x<steps.size();x++){
            steps.get(x).displayChar();
        }
    }
    public static void removeAllAfters(char chara){
        for(int x=0; x<steps.size(); x++){
            for (int y=0; y<steps.get(x).after.size();y++){
                if(steps.get(x).after.get(y)==chara){
                    steps.get(x).after.remove(y);
                }
            }
        }
    }
    public static void removeStep(char chara){
        for (int x=0; x<steps.size();x++){
            if (steps.get(x).step==chara){
                steps.remove(x);
            }
        }
    }
    public static void removeWaiting(char chara){
        for (int x=0; x<waiting.size();x++){
            if (waiting.get(x)==chara){
                waiting.remove(x);
            }
        }
    }

    public static void sortSteps2(){
        ArrayList<Worker> workers = new ArrayList<Worker>();
        boolean run =true;
        int it =0;
        while (run){
            String stepString = "";
            for (int x=0; x<steps.size();x++){
                if (steps.get(x).after.size()==0){
                    stepString = stepString + steps.get(x).step;
                }
            }


            char[] list = stepString.toCharArray();
            if(list.length<1&&workers.size()==0){
                run = false;
                break;
            }
            Arrays.sort(list);

            for(int y=0; y<list.length; y++){
                if(workers.size()<=numOfWorkers) {
                    workers.add(new Worker(list[y], timePlus(list[y])+it));
                    removeStep(list[y]);
                }

            }
            System.out.println("Time: " + it);
            for(int c=0; c<workers.size();c++){
                System.out.println("Worker :" + (c+1) + "step: " + workers.get(c).step + " time: " + workers.get(c).time);
            }
            for (int a =0; a<workers.size(); a++){
                if(workers.get(a).time == it){
                    removeAllAfters(workers.get(a).step);
                    workers.remove(a);

                }
            }
           // displaySteps();
        it++;


        }
        System.out.println(it);
    }

    public static void sortSteps(){
        while (steps.size()!=0){
            String stepString = "";
            for (int a=0; a<order.length();a++){
                removeAllAfters(order.charAt(a));
            }

            for (int x=0; x<steps.size();x++){
                if (steps.get(x).after.size()==0){
                    stepString = stepString + steps.get(x).step;
                }
            }


                    char[] list = stepString.toCharArray();
                    Arrays.sort(list);
                    order = order + list[0];
            displaySteps();
                    removeStep(list[0]);
                    total += timePlus(list[0]);
            System.out.println("Step: " + list[0] + " removed");
            System.out.println();



        }
        System.out.println(order);
    }
    public static void addWaiting(){
        for (int x=0; x<steps.size();x++) {
            if (steps.get(x).after.size() == 0) {
                waiting.add(steps.get(x).step);
                //System.out.println("Added: " + steps.get(x).step);
                removeStep(steps.get(x).step);
            }
        }
    }


    public static void getTime(){
        ArrayList<Worker> workers = new ArrayList<Worker>();
        addWaiting();
        Collections.sort(waiting);
        for(int x=0; x<waiting.size(); x++){
            if(workers.size()<numOfWorkers) {
                workers.add(new Worker(waiting.get(x), timePlus(waiting.get(x))));
                removeWaiting(waiting.get(x));
            }
        }
        int it=0;

        while(workers.size()!=0){
            //System.out.println(workers.size());
            for (int y=0; y<workers.size(); y++){
                if(it >= workers.get(y).time){
                    System.out.println("Step: " + workers.get(y).step);
                    removeAllAfters(workers.get(y).step);
                    workers.remove(y);
                }
            }
            //displaySteps();
            addWaiting();
            Collections.sort(waiting);
            for(int x=0; x<waiting.size(); x++){
                if(workers.size()<numOfWorkers) {
                    workers.add(new Worker(waiting.get(x), timePlus(waiting.get(x))));
                    removeWaiting(waiting.get(x));
                }
            }
        it++;
            System.out.println(it);
        }


    }
    public static void main(String[] args) {
        loadFile("C:\\AdventOfCode2018\\Day7\\steps.txt"); // real input
      // loadFile("C:\\AdventOfCode2018\\Day7\\testFile.txt"); // test input
        parse(); // parse steps
       sortSteps2(); // part2

    }
}
