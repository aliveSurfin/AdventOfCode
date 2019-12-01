import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

import static java.lang.Math.min;
import static java.lang.Math.toIntExact;

public class Day4 {
    private static int maxID;
    private static int max;
    private static int maxX;
    public static ArrayList<String > fileInput = new ArrayList<String>();

    public static ArrayList<Event> events = new ArrayList<Event>();

    public static ArrayList<Guard> guards = new ArrayList<Guard>();
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
    public static void parseEvents() {
        for (int x = 0; x < fileInput.size(); x++) {
            events.add(new Event(fileInput.get(x)));
        }
    }
    public static void displayEvents(){
        for (int x = 0; x < events.size(); x++) {
            System.out.println(events.get(x).toString());
        }
    }
    public static void displayGuards(){
        for (int x = 0; x < guards.size(); x++) {
            System.out.println(guards.get(x).getID() + " " + guards.get(x).getTimeSlept());
        }
    }
    public static void getGuardID(){
        int currentID =0;
        for (int x = 0; x < events.size(); x++) {
            if(events.get(x).getGuardID()==0){
                events.get(x).setGuardID(currentID);

            }
            else {
                currentID = events.get(x).getGuardID();
            }
        }
    }

    private static void calcSleep(){
        for (int x = 0; x < events.size(); x++) {
            if(events.get(x).getEventType().equalsIgnoreCase("wake")){
                long minSlept = (events.get(x).getDate().getTimeInMillis() - events.get(x-1).getDate().getTimeInMillis()) / 1000;
                minSlept = minSlept/60;
                if(guards.size()==0){
                    guards.add(new Guard(events.get(x).getGuardID()));
                    guards.get(guards.size()-1).setTimeSlept(minSlept);
                }
                else{
                    boolean noGuard = false;
                    for(int a=0; a<guards.size();a++){
                        if (guards.get(a).getID()!=events.get(x).getGuardID()){
                            noGuard = true;
                        }
                        else if (guards.get(a).getID()==events.get(x).getGuardID()){
                            guards.get(a).setTimeSlept(guards.get(a).getTimeSlept()+minSlept);
                            noGuard=false;
                        }
                    }
                    if(noGuard){
                        guards.add(new Guard(events.get(x).getGuardID()));
                        guards.get(guards.size()-1).setTimeSlept(minSlept);
                    }
                }
               // System.out.println("Guard :" + events.get(x).getGuardID() + " time slept :" + minSlept);

               // guards.add(new Guard(events.get(x).getGuardID()));
                //guards.get(guards.size()-1).setTimeSlept(minSlept);
            }
        }
    }
    private static void displayEventsForGuards(int guardID){
        for(int x=0; x<events.size();x++){
            if (events.get(x).getGuardID() == guardID){
                System.out.println(events.toString());
            }
        }
    }

    private static void calcMins(){
        for (int it =0; it<guards.size(); it++){
        for(int x=0; x<events.size();x++) {
                    if(guards.get(it).getID()==events.get(x).getGuardID()){
                        //System.out.println("test");
                        if(events.get(x).getEventType().equalsIgnoreCase("wake")){
                            for(int y = events.get(x-1).getMin(); y<events.get(x).getMin(); y++){
                                if(y==61){
                                    y=1;
                                }
                                guards.get(it).mins[y] ++;

                            }
                        }
                    }
        }
        }
    }

    private static void part2(){
        for(int x=0; x<guards.size();x++){
            for (int y=0; y<guards.get(x).mins.length;y++){
                if(guards.get(x).mins[y]>max){
                    max = guards.get(x).mins[y];
                    maxID = guards.get(x).getID();
                    maxX = x;
                }
            }
        }
    }
    public static void main(String[] args) {
        loadFile("C:\\AdventOfCode2018\\Day4\\Events.txt");
        parseEvents();
        Collections.sort(events);
    getGuardID();
      //  displayEvents();
        calcSleep();
        Collections.sort(guards);
        //displayGuards();
        int id = guards.size()-1;
        //displayEventsForGuards(id);

        calcMins();
        part2();
        System.out.println(max);
        System.out.println(maxID);
        guards.get(maxX).displayMins();


//    System.out.print(event.toString());
    }
}
