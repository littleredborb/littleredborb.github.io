//AUTHOR: Jana Austria && Hannah Chua
//ART: Hannah Chua

public class Ringuin extends Animon{
    private final float BASE_HP = 44.0f;
    private final int BASE_AP = 48;
    private final int BASE_DP = 65;
    

    public Ringuin(String name, int level){
        super(name,"Water",level);
        int ap = (2 * BASE_AP * level/100) + 5;
        double hp = (2 * BASE_HP + 100) * level/100 + 5;
        int dp = (2 * BASE_DP * level/100) + 5;
        
        super.setAp(ap);
        super.setDp(dp);
        super.setStatHp(hp);
        super.setCurrHp(hp);
    
        this.addMove(0, "Pound", "Normal", 50);
        this.addMove(1, "Water Gun", "Water", 40);
        this.addMove(2, "Bubble", "Water", 40);
        this.addMove(3, "Splash", "Normal", 0);
    }
    
    
    public void levelUp(){
        this.resetStats();
        if(this.getLevel() >= 7 && this.getLevel() < 10)
            this.editMove(3, "Surf", "Water", 60);
        else if(this.getLevel() >= 10 && this.getLevel() < 20)
            this.editMove(0, "Fury Attack", "Normal", 70);
        else if(this.getLevel() >= 20)
            this.editMove(1, "Ice Beam", "Ice", 70);
    }
    
    public void resetStats(){
        super.resetStats();
        super.setAp((2 * BASE_AP * super.getLevel()/100) + 5);
        super.setStatHp((2 * BASE_HP + 100) * super.getLevel()/100 + 5);
        super.setDp((2 * BASE_DP * super.getLevel()/100) + 5);
    }
}
