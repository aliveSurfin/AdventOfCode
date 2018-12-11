public class Guard implements Comparable<Guard> {
    private long timeSlept;
    private int ID;
    public int[] mins = new int[61];
    public Guard(int ID){
        this.ID = ID;
    }
    public  long getTimeSlept() {
        return timeSlept;
    }

    public void setTimeSlept(long timeSlept) {
       this.timeSlept = timeSlept;
    }

    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public void displayMins(){
        for (int x=0; x<mins.length; x++){
            System.out.println(x + " " + mins[x] );
        }
    }

    @Override
    public int compareTo(Guard guard){
        long test = this.getTimeSlept()-guard.getTimeSlept();
        return (int) test;
    }
}
