//AUTHOR: Jana Austria && Hannah Chua
//ART: Hannah Chua

import java.util.ArrayList;

public class Trainer {
    private String name;
    private ArrayList<Animon> party;
    private String gender;
    public final int MAX_ANIMON = 4;
    
    public Trainer(String gender){
        this.setGender(gender);
        this.setName("");
        this.party = new ArrayList<Animon>();
    }
    
    public int getPartySize(){
        return this.getParty().size();
    }

    public String getName() {
        return this.name;
    }
    public ArrayList<Animon> getParty() {
        return this.party;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getGender() {
        return this.gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }
    
    public void printInfo(){
        System.out.println("Trainer: " + this.getName() + "\nGender: " + this.getGender() + "\n");
        for(int i=0; i<this.MAX_ANIMON; i++){
            this.party.get(i).printFullInfo();
            System.out.println("\n");
        }
    }
    
    
}
