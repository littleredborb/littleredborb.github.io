//AUTHOR: Jana Austria && Hannah Chua
//ART: Hannah Chua

public class Froctic extends Animon {
    private final float BASE_HP = 35.0f;
    private final int BASE_AP = 60;
    private final int BASE_DP = 44;
    

    public Froctic(String name, int level){
        super(name,"Poison",level);
        int ap = (2 * BASE_AP * level/100) + 5;
        double hp = (2 * BASE_HP + 100) * level/100 + 5;
        int dp = (2 * BASE_DP * level/100) + 5;
        
        super.setAp(ap);
        super.setDp(dp);
        super.setStatHp(hp);
        super.setCurrHp(hp);
        
        this.addMove(0, "Sting", "Poison", 15);
        this.addMove(1, "Toxic", "Poison", 60);
        this.addMove(2, "Astonish", "Normal", 15);
        this.addMove(3, "Bounce", "Normal", 0);
    }
    
    
    public void levelUp(){
        this.resetStats();
        if(this.getLevel() >= 7 && this.getLevel() < 10)
            this.editMove(3, "Sucker Punch", "Normal", 80);
        else if(this.getLevel() >= 10 && this.getLevel() < 20)
            this.editMove(0, "Poison Jab", "Poison", 80);
        else if(this.getLevel() >= 20)
            this.editMove(2, "Mud Shot", "Ground", 65);
    }
    
    public void resetStats(){
        super.resetStats();
        super.setAp((2 * BASE_AP * super.getLevel()/100) + 5);
        super.setStatHp((2 * BASE_HP + 100) * super.getLevel()/100 + 5);
        super.setDp((2 * BASE_DP * super.getLevel()/100) + 5);
    }
}
