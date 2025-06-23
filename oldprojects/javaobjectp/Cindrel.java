//AUTHOR: Jana Austria && Hannah Chua
//ART: Hannah Chua

public class Cindrel extends Animon {
    private final float BASE_HP = 39.0f;
    private final int BASE_AP = 52;
    private final int BASE_DP = 43;
    

    public Cindrel(String name, int level){
        super(name,"Fire",level);
        int ap = (2 * BASE_AP * level/100) + 5;
        double hp = (2 * BASE_HP + 100) * level/100 + 5;
        int dp = (2 * BASE_DP * level/100) + 5;
        
        super.setAp(ap);
        super.setDp(dp);
        super.setStatHp(hp);
        super.setCurrHp(hp);
        
        this.addMove(0, "Scratch", "Normal", 40);
        this.addMove(1, "Ember", "Fire", 40);
        this.addMove(2, "Fire Fang", "Fire", 65);
        this.addMove(3, "Tail whip", "Normal", 0);
    }
    
    
    public void levelUp(){
        this.resetStats();
        if(this.getLevel() >= 7 && this.getLevel() < 10)
            this.editMove(3, "Fire Spin", "Fire", 70);
        else if(this.getLevel() >= 10 && this.getLevel() < 20)
            this.editMove(0, "Take Down", "Normal", 90);
        else if(this.getLevel() >= 20)
            this.editMove(1, "Bullet Seed", "Grass", 40);
    }
    
    public void resetStats(){
        super.resetStats();
        super.setAp((2 * BASE_AP * super.getLevel()/100) + 5);
        super.setStatHp((2 * BASE_HP + 100) * super.getLevel()/100 + 5);
        super.setDp((2 * BASE_DP * super.getLevel()/100) + 5);
    }
}
