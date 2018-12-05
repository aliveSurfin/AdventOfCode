import java.util.Calendar;
import java.util.Date;

public class Event {
    public Event(String input) {
        String list[] = input.split(" ");
        String date = list[0].replace("[", "");
        date = date.replaceAll("-"," ");
        String[] dateSplit = date.split(" ");
        String time = list[1].replaceAll("]", "");
        String[] timeSplit = time.split(":");
        System.out.print(date);

        this.date.set(2000, Integer.parseInt(dateSplit[1])-1, Integer.parseInt(dateSplit[2]), Integer.parseInt(timeSplit[0]), Integer.parseInt(timeSplit[1]));


    }


    private Calendar date = new Calendar() {
        @Override
        protected void computeTime() {

        }

        @Override
        protected void computeFields() {

        }

        @Override
        public void add(int field, int amount) {

        }

        @Override
        public void roll(int field, boolean up) {

        }

        @Override
        public int getMinimum(int field) {
            return 0;
        }

        @Override
        public int getMaximum(int field) {
            return 0;
        }

        @Override
        public int getGreatestMinimum(int field) {
            return 0;
        }

        @Override
        public int getLeastMaximum(int field) {
            return 0;
        }
    };
    private String eventType;
    private int guardID;

    @Override
    public String toString() {
        return date.getTime().toString();
    }
}
