import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;

public class Day3 {
    private static ArrayList<Claim> claims = new ArrayList<Claim>();
    private static ArrayList<String> fileInput = new ArrayList<String>();
    private static final int SIZE = 1000;
    private static int[][] fabric = new int[SIZE][SIZE];
    private static int claimOverlaps;
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
    public static void parseClaims(){
        for(int x=0; x<fileInput.size();x++){
            if(!fileInput.get(x).contains("#")){
                break;
            }
            else{
                String[] list = fileInput.get(x).split(" ");
               String claimNo = list[0].replace("#","");
               String xy = list[2].replace(":","");
                String[] xandy = xy.split(",");
                String[] wh = list[3].split("x");
                claims.add(new Claim(Integer.parseInt(claimNo),Integer.parseInt(xandy[0]),Integer.parseInt(xandy[1]),Integer.parseInt(wh[0]),Integer.parseInt(wh[1])));
               // break;
            }
        }
    }
    public static void displayClaims(){
        for(int x=0; x<claims.size();x++) {
            System.out.println(claims.get(x).toString());
        }
    }
    public static void findClaims(){
        for (Claim claim: claims
             ) {
                    int left = claim.getX();
                    int right =claim.getX()+claim.getW();
                    int up = claim.getY();
                    int down = claim.getY()+claim.getH();
                    boolean noClaim = false;
                    for(int x=left; x<right;x++){
                        for(int y=up; y<down;y++){




                            fabric[y][x] +=1;
                        }
                    }




            
        }
        for(int a=0; a<fabric.length;a++){
            for (int b=0; b<fabric.length; b++){
                if (fabric[a][b]>1){
                    claimOverlaps++;
                }
            }
        }
    }
    public static void findNoClaim(){
        for (Claim claim: claims
                ) {
            int left = claim.getX();
            int right =claim.getX()+claim.getW();
            int up = claim.getY();
            int down = claim.getY()+claim.getH();
            boolean noClaim = false;
            for(int x=left; x<right;x++){
                for(int y=up; y<down;y++) {

                if(fabric[y][x]!=1){
                    noClaim = true;
                }
                }
                }
                if(!noClaim){
                    System.out.println(claim.toString());
                }
        }
    }
    public static void displayFabric(){
        for(int x=0; x<fabric.length;x++){
            for(int y=0;y<fabric.length;y++) {
            System.out.print(fabric[y][x]);
            }
            System.out.println();
            }
    }
    public static void main(String[] args) {
loadFile("C:\\AdventOfCode2018\\Day3\\claims.txt");
parseClaims();
        for(int a=0; a<fabric.length;a++){
            for (int b=0; b<fabric.length; b++) {
                fabric[a][b]=0;
            }
        }
findClaims();
System.out.println(claimOverlaps);
findNoClaim();



//displayFabric();
//displayClaims();
    }

}
