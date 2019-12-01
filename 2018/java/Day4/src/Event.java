import java.util.Calendar;
import java.util.Date;

public class Event implements Comparable<Event> {
    public Event(String input) {
        String list[] = input.split(" ");
        String date = list[0].replace("[", "");
        date = date.replaceAll("-"," ");
        String[] dateSplit = date.split(" ");
        String time = list[1].replaceAll("]", "");
        String[] timeSplit = time.split(":");
        int year = Integer.parseInt(dateSplit[0]);
        int month = Integer.parseInt(dateSplit[1])-1;
        int day = Integer.parseInt(dateSplit[2]);
        int hour = Integer.parseInt(timeSplit[0]);
        int minutes = Integer.parseInt(timeSplit[1]);
        this.min = minutes;
        String type ="";
        for(int x=2; x<list.length;x++){
            type+= " " +list[x];
        }
        if(type.contains("#")){
            guardID = Integer.parseInt(type.replaceAll("\\D+",""));
            eventType = "swap";
        }
        else{
            if(type.replaceAll(" ","").charAt(0)=='f'){
                eventType = "sleep";
            }
            else {
                eventType="wake";
            }
        }

        //System.out.println(type);
        this.date.set(year, month, day, hour, minutes);
        this.date.set(Calendar.SECOND, 0);
      //  System.out.println(date.toString());
        //System.out.println(date.getTime().toString());

    }


    private Calendar date = Calendar.getInstance();
    private int min;
    private String eventType;
    private int guardID;

    public Calendar getDate() {
        return date;
    }

    public void setDate(Calendar date) {
        this.date = date;
    }

    public String getEventType() {
        return eventType;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    public int getGuardID() {
        return guardID;
    }

    public void setGuardID(int guardID) {
        this.guardID = guardID;
    }
    public int getMin(){
        return this.min;
    }

    @Override
    public String toString() {
        return "Event{" +
                "date=" + date.getTime().toString() +
                ", eventType='" + eventType + '\'' +
                ", guardID=" + guardID +
                '}';
    }

    @Override
    public int compareTo(Event event){
        return this.getDate().compareTo(event.getDate());
    }
}
