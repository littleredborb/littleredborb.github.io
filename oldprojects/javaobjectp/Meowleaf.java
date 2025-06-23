//AUTHOR: Jana Austria && Hannah Chua
//ART: Hannah Chua

public class Meowleaf extends Animon{
    private final float BASE_HP = 45.0f;
    private final int BASE_AP = 49;
    private final int BASE_DP = 49;
    

    public Meowleaf(String name, int level){
        super(name,"Grass",level);
        int ap = (2 * BASE_AP * level/100) + 5;
        double hp = (2 * BASE_HP + 100) * level/100 + 5;
        int dp = (2 * BASE_DP * level/100) + 5;
        
        super.setAp(ap);
        super.setDp(dp);
        super.setStatHp(hp);
        super.setCurrHp(hp);
    
        this.addMove(0, "Tackle", "Normal", 50);
        this.addMove(1, "Razor Leaf", "Grass", 45);
        this.addMove(2, "Take Down", "Normal", 90);
        this.addMove(3, "Leer", "Normal", 0);
    }
    
    public void levelUp(){
        this.resetStats();
        if(this.getLevel() >= 7 && this.getLevel() < 10)
            this.editMove(3, "Magical Leaf", "Grass", 60);
        else if(this.getLevel() >= 10 && this.getLevel() < 20)
            this.editMove(0, "Leaf Blade", "Grass", 70);
        else if(this.getLevel() >= 20)
            this.editMove(1, "Psybeam", "Psychic", 65);
    }
    
    public void resetStats(){
        super.resetStats();
        super.setAp((2 * BASE_AP * super.getLevel()/100) + 5);
        super.setStatHp((2 * BASE_HP + 100) * super.getLevel()/100 + 5);
        super.setDp((2 * BASE_DP * super.getLevel()/100) + 5);
    }
}
