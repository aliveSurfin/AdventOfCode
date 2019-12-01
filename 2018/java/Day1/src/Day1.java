import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;

public class Day1 {
    private static ArrayList<String> fileInput = new ArrayList<String>();
    private static ArrayList<Integer> parsedData = new ArrayList<Integer>();
    private static ArrayList<Integer> resultingFreq = new ArrayList<Integer>();
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
    private static void displayFile(){
        if (fileInput.size()>0){
            for (int x= 0; x<fileInput.size(); x++){
                System.out.println(fileInput.get(x));
            }
        }else {
            System.out.println("No file data was loaded");
        }
    }
    private static void getEndValue (int currentValue){
        for(int x=0; x<parsedData.size();x++){
            System.out.println(currentValue + " next " + parsedData.get(x));
            currentValue = currentValue+parsedData.get(x);
        }
        System.out.println("Final Value");
        System.out.println(currentValue);
    }
    private static void repeatingValue(){
        int currentValue = 0;
        boolean looping = true;
        resultingFreq.add(currentValue);
        while(looping) {
            for (int x = 0; x < parsedData.size(); x++) {
                currentValue = parsedData.get(x) + currentValue;
                for (int it = 0; it < resultingFreq.size(); it++) {
                    if (currentValue == resultingFreq.get(it)) {
                        System.out.println("Found 2 of the same " + currentValue);
                        looping = false;
                        break;
                    }
                    if(!looping){
                        break;
                    }
                }
                if(!looping){
                    break;
                }
                resultingFreq.add(currentValue);
                System.out.println("Added " + currentValue);

            }
        }
    }
    public static void main(String[] args) {
    //System.out.print("test");
    Day1 d1 = new Day1();
    loadFile("Day1Input");

    //displayFile();
        for(int x=0; x<fileInput.size();x++){
            if(fileInput.get(x).contains("+")){
                int removePlus = Integer.parseInt(fileInput.get(x).replace("+", ""));
                parsedData.add(removePlus);
            }
            else{
                int withMinus = Integer.parseInt(fileInput.get(x));
                parsedData.add(withMinus);
            }
        }
       // getEndValue(0);
        repeatingValue();


    }

}
