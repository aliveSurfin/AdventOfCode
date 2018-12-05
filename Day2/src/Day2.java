import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;

public class Day2 {

    private static ArrayList<String> fileInput = new ArrayList<String>();
    private static ArrayList<String> ids = new ArrayList<String>();
    private static int three;
    private static int two;

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
    private static String getUniqueChars(String input){
        ArrayList<Character> charList = new ArrayList<Character>();
        for(int x=0; x<input.length();x++){
            if(!charList.contains(input.charAt(x))){
                charList.add(input.charAt(x));
            }
        }
        String chars = "";
        for(int it=0; it<charList.size();it++){
            chars += charList.get(it);
        }
        return chars;
    }
    private static void getChecksum(){
        for(int x=0; x<fileInput.size();x++){
            String chars =  getUniqueChars(fileInput.get(x));
            char[] list =  chars.toCharArray();
            boolean is2 = true;
            boolean is3 = true;
            for (int it =0; it<list.length;it++){
                int count = 0;
                for (int it1 =0; it1<fileInput.get(x).length();it1++){
                    if(list[it] == fileInput.get(x).charAt(it1)){
                        count++;
                    }
                }
                if(count==2&&is2){
                    two ++;
                    is2 =false;
                }
                else if(count==3&&is3){
                    three++;
                    is3 =false;
                }
            }
        }
        System.out.println("three :" + three);
        System.out.println("two :" + two);
        int checksum = two*three;
        System.out.println("Checksum = " + checksum);
    }
    private static void diffOf1 (){
        for(int x=0;x<fileInput.size();x++){
            for (int it=0;it<fileInput.size();it++){
                String s1 = fileInput.get(x);
                String s2 = fileInput.get(it);
                int count =0;
                int index =0;
                for(int a=0; a<s1.length();a++){
                    if(s1.charAt(a)!= s2.charAt(a)){
                        count ++;
                        index = a;
                    }

                }
                if(count==1){
                    StringBuilder sb = new StringBuilder(s1);
                    sb.deleteCharAt(index);
                    String result =sb.toString();
                    ids.add(result);
                }
            }
        }
        for(int x=0; x<ids.size();x++){
            System.out.println(ids.get(x));
        }
    }
    public static void main(String[] args) {
        loadFile("C:\\AdventOfCode2018\\Day2\\checksum.txt");
//getChecksum();
diffOf1();
}

}
