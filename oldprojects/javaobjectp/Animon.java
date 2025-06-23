//AUTHOR: Jana Austria && Hannah Chua
//ART: Hannah Chua

public abstract class Animon{
    private String name;
    private String type;
   
    private int level;
    private int exp;
    
    private double statHp;                 //statHp = static hp
    private double currHp;                 //currHp = current hp on battle
    private int ap;
    private int dp;
    
    private Move[] moves;
    private final int MAX_MOVES = 4;
    
    
   
    
    public Animon(String name, String type, int level){
        this.setName(name);
        this.setType(type);
        this.setLevel(level);
        this.moves = new Move[MAX_MOVES];
        this.setExp((int)Math.pow((double)level, (double)3));
    }
    public String getName() {
        return this.name;
    }
    public String getType() {
        return this.type;
    }
    
    public void resetStats(){
        this.level = (int)Math.cbrt((double)exp);
    }
    
    public int getAp() {
        return this.ap;
    }
    public int getDp() {
        return this.dp;
    }
    public int getExp() {
        return this.exp;
    }
    public Move[] getMoves() {
        return this.moves;
    }
    public int getLevel() {
        return this.level;
    }
    public void setName(String name) {
        if(name!=null)
            this.name = name;
    }
    public void setType(String type) {
        if(type!=null)
        this.type = type;
    }

    public void setExp(int exp) {
        if(exp>=0)
        this.exp = exp;
    }
    public void setMoves(Move[] moves) {
        if(moves!=null)
        this.moves = moves;
    }
    public void setLevel(int level) {
        this.level = level;
    }    
    public void addMove(int index, String name, String type, int bp){
        this.moves[index] = new Move(name, type, bp, this);
    }
    public void editMove(int index, String name, String type, int bp){
        this.moves[index].setName(name);
        this.moves[index].setType(type);
        this.moves[index].setBp(bp);
    }

    
    //prints Animon info on console
    public void printFullInfo(){
        System.out.println(this.getName() + "\t" + "[" + this.getType() + "]");
        System.out.println("level: " + this.getLevel() + "\t" + "EXP: " + this.getExp());
        System.out.println("HP: " + this.getStatHp() + "\t" + "attack: " + this.getAp() + "\t" + "defense: " + this.getDp());
        System.out.println("\nmoveset:");
        for(int i=0; i<this.MAX_MOVES; i++){
            System.out.println("move " + (i+1) + ": " + this.getMoves()[i].getName() + "[" + this.getMoves()[i].getType() + "]");
        }
    }

    //prints Animon name, hp and level on console
    public void printShortInfo(){
        System.out.println(this.getName() + "\t" + "level: " + this.getLevel() + "\t" + "HP: " + this.getStatHp());
    }
    
    //gain exp
    public void gainExp(Animon enemy){
        this.setExp(this.exp + 30 * enemy.getLevel());
        this.levelUp();
    }
    public void setAp(int ap) {
        this.ap = ap;
    }

    public void setDp(int dp) {
        this.dp = dp;
    }
    
    //gets exp gained from the enemy
    public int getGainedExp(int enemyLevel){
        return 30*enemyLevel;
    }

    public double getStatHp() {
        return this.statHp;
    }

    public double getCurrHp() {
        return this.currHp;
    }

    public void setStatHp(double statHp) {
        this.statHp = statHp;
    }

    public void setCurrHp(double currHp) {
        this.currHp = currHp;
    }
    
    public abstract void levelUp();
    

}