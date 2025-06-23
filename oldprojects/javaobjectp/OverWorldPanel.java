//AUTHOR: Jana Austria && Hannah Chua
//ART: Hannah Chua

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.ArrayList;
import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JPanel;


public class OverWorldPanel extends JPanel{
    private ArrayList<Animon> wildAnimons;
    
    private JButton quit;
    
    private Trainer trainer;
    
    private Trainer[] trainers;
    
    private ActionListener steppedOnAnimon;
    
    private Image img;
    private Image grass;
    private ImageIcon spriteImg;
    private ImageIcon grassImg;
    
    
    private int[] wildX;
    private int[] wildY;
    
    private int[] healX;
    private int[] healY;
    
    private int[] trainX;
    private int[] trainY;
    
    public int charX = 0;
    public int charY = 0;
    
    public int wildLvl;
    
    private int[][] gridMap;
    
    private Animon encounter;
    
    
    //triggers if stepped on animon
    public void setSteppedOnAnimon(ActionListener event){
        this.steppedOnAnimon = event;
    }    
    public ActionListener getSteppedOnAnimon(){
        return this.steppedOnAnimon;
    }
    
    public void setEncounter(Animon animon){
        this.encounter = animon;
    }
    
    public Animon getEncounter(){
        return this.encounter;
    }

    
    public OverWorldPanel(Trainer trainer) {
        
        
        //LOCATION OF WILD ANIMONS
        //map width
        wildX = new int[]{0,1500,850, 250, 500, 1850, 300, 1200, 300, 2000};
        //map height
        wildY = new int[]{750, 550, 300, 500, 300, 350, 200, 400, 150, 0};
        
        healX = new int[]{50,1000,2000};
        healY = new int[]{50,350,250};
        
        trainX = new int[]{550,1750,900, 700, 1400};
        trainY = new int[]{0,  400, 200, 350, 150};
        
        //initialize
        this.trainer = trainer;
        this.encounter = null;
        
        //level of wild animons is same as user's active animon
        this.wildLvl = 1;
        
        this.wildAnimons = new ArrayList<Animon>();
        this.wildAnimons.add(new Ringuin("wild Ringuin",wildLvl));
        this.wildAnimons.add(new Cindrel("wild Cindrel",wildLvl));
        this.wildAnimons.add(new Meowleaf("wild Meowleaf",wildLvl));
        this.wildAnimons.add(new Froctic("wild Froctic",wildLvl));
        
        this.trainers = new Trainer[5];
        this.trainers[0] = new Trainer("Boy");
        this.trainers[0].setName("Felix");
        this.trainers[0].getParty().add(new Ringuin(this.trainers[0].getName() + "'s Ringuin", 20));
        this.trainers[0].getParty().get(0).levelUp();                
        this.trainers[1] = new Trainer("Girl");
        this.trainers[1].setName("Anne");
        this.trainers[1].getParty().add(new Cindrel(this.trainers[1].getName() + "'s Cindrel", 10));
        this.trainers[1].getParty().get(0).levelUp(); 
        this.trainers[2] = new Trainer("Girl");
        this.trainers[2].setName("Heather");
        this.trainers[2].getParty().add(new Cindrel(this.trainers[2].getName() + "'s Cindrel", 20));
        this.trainers[2].getParty().get(0).levelUp(); 
        this.trainers[3] = new Trainer("Boy");
        this.trainers[3].setName("Luke");
        this.trainers[3].getParty().add(new Meowleaf(this.trainers[3].getName() + "'s Meowleaf", 10));
        this.trainers[3].getParty().get(0).levelUp(); 
        this.trainers[4] = new Trainer("Boy");
        this.trainers[4].setName("John");
        this.trainers[4].getParty().add(new Froctic(this.trainers[4].getName() + "'s Froctic", 20));
        this.trainers[4].getParty().get(0).levelUp(); 
        
        
        //import images
        if(this.trainer.getGender() == "Boy")
            spriteImg = new ImageIcon("boy.png");
        else if(this.trainer.getGender() == "Girl")
            spriteImg = new ImageIcon("girl.png");
        img = spriteImg.getImage();
        
        grassImg = new ImageIcon("sgrass.png");
        grass = grassImg.getImage();
        
        quit = new JButton("quit");
        
        quit.setToolTipText("exit the game");      
        
        
        //---------Dimensions and boundaries-----------
        setLayout(null);
        
        Dimension quitSize = quit.getPreferredSize();
        
        quit.setBounds(690, 520, quitSize.width, quitSize.height);
        
        //----------------add Sidebar menu-------
        addKeyListener(new OverWorldPanelKeyEvents(this, wildX, wildY, healX, healY, 
                                        trainX, trainY, trainer, trainers, wildAnimons));

        this.add(quit);
        
        quit.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent e) {
                System.exit(0);
            }
        });
               
        setVisible(false);
    }
    
    

    
    @Override
    public void paintComponent(Graphics g) {
        
        g.setColor(Color.LIGHT_GRAY);
        g.fillRect(0, 0, 800, 600);
        
        for(int i= 0; i<13; i++){
            for(int j=0; j<13; j++){
                g.drawImage(grass, i*50, j*50, null);
            }
        }
        
        g.setColor(Color.WHITE);
        g.fillRect(660, 70, 110, 70);
        
        for(int i=0; i<this.trainers.length; i++){
            if(this.trainX[i] <= 600){
                if(this.trainers[i].getGender() == "Boy")
                    g.drawImage((new ImageIcon("boy.png").getImage()), this.trainX[i], this.trainY[i], null);
                else if(this.trainers[i].getGender() == "Girl")
                    g.drawImage((new ImageIcon("girl.png").getImage()), this.trainX[i], this.trainY[i], null);
            }
                
        }
        
        for(int i=0; i<this.healX.length; i++){
            if(this.healX[i] <= 600)
                g.drawImage((new ImageIcon("house.png").getImage()), this.healX[i], this.healY[i], null);
        }
        
        for(int i=0; i<this.wildX.length; i++){
            if(this.wildX[i] <= 600)
                g.drawImage((new ImageIcon("grass.png").getImage()), this.wildX[i], this.wildY[i], null);
        }
        
        
        g.drawImage(img, charX, charY, null);
        
        g.setColor(Color.DARK_GRAY);
        g.drawString(this.trainer.getName() + "'s Party: ", 670, 30);
        
        g.drawString(this.trainer.getParty().get(0).getName(), 670, 90);
        g.drawString("[LVL]" + this.trainer.getParty().get(0).getLevel(), 670, 110);
        g.drawString("[HP]" + Math.floor((double)this.trainer.getParty().get(0).getCurrHp()), 670, 130);
        
        g.drawString(this.trainer.getParty().get(1).getName(), 670, 180);
        g.drawString("[LVL]" + this.trainer.getParty().get(1).getLevel(), 670, 200);
        g.drawString("[HP]" + Math.floor((double)this.trainer.getParty().get(1).getCurrHp()), 670, 220);
        
        g.drawString(this.trainer.getParty().get(2).getName(), 670, 270);
        g.drawString("[LVL]" + this.trainer.getParty().get(2).getLevel(), 670, 290);
        g.drawString("[HP]" + Math.floor((double)this.trainer.getParty().get(2).getCurrHp()), 670, 310);
        
        g.drawString(this.trainer.getParty().get(3).getName(), 670, 360);
        g.drawString("[LVL]" + this.trainer.getParty().get(3).getLevel(), 670, 380);
        g.drawString("[HP]" + Math.floor((double)this.trainer.getParty().get(3).getCurrHp()), 670, 400);
        
        g.drawString("move: directional keys", 660, 420);
        g.drawString("heal: move to house", 660, 440);
        g.drawString("swap active animon: A", 660, 460);
        
        
            
    }
}
