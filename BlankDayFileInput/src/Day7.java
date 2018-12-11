import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;

public class Day7 {

    public static ArrayList<String > fileInput = new ArrayList<String>();
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
    public static void main(String[] args) {

    }
}
