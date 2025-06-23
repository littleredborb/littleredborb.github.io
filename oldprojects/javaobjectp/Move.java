//AUTHOR: Jana Austria && Hannah Chua
//ART: Hannah Chua

import java.util.Random;

public class Move {
    private int bp;
    private String name;
    private String type;
    private Animon user;
    
    public Move(String name, String type, int bp, Animon user){
        this.setName(name);
        this.setType(type);
        this.setBp(bp);
        this.setUser(user);
    }

    public int getBp() {
        return this.bp;
    }
    public String getName() {
        return this.name;
    }
    public String getType() {
        return this.type;
    }
    public Animon getUser() {
        return this.user;
    }
    public void setBp(int bp) {
        this.bp = bp;
    }
    public void setName(String name) {
        this.name = name;
    }
    public void setType(String type) {
        this.type = type;
    }
    public void setUser(Animon user) {
        this.user = user;
    }
    
    public double calculateDamage(Animon enemy){
        Random rand = new Random();
        Multiplier multiplier = new Multiplier(this.getType(),enemy.getType());
        float typeMult = multiplier.getMultiplier();
        
        int random = 217+rand.nextInt(255-127)+1;
        double dmg = ((0.4 * user.getLevel() + 2) * user.getAp() * this.getBp() / 50 / enemy.getDp() + 2)
                    * typeMult * random / 255;
        return dmg;
    }
}
