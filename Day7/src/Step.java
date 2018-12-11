import java.util.ArrayList;

public class Step {
    public char step;
    public ArrayList<Character> after = new ArrayList<Character>();

    public Step(char step) {
        this.step = step;
    }

    public void displayChar(){
        System.out.print("Step: " + step);
        System.out.print(" After: ");
        for (int x=0; x<after.size(); x++
             ) {
            System.out.print( after.get(x).toString() + " ,");

        }
        System.out.print(" number before= " + after.size());
        System.out.println();
    }
}
