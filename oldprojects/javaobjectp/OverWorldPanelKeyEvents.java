//AUTHOR: Jana Austria && Hannah Chua
//ART: Hannah Chua

import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.util.ArrayList;
import java.util.Random;

public class OverWorldPanelKeyEvents implements KeyListener{

    private OverWorldPanel panel;
    private int[] wildX;
    private int[] wildY;    
    
    private int[] healX;
    private int[] healY;
    
    private int[] trainX;
    private int[] trainY;
    
    private Trainer trainer;
    private Trainer[] trainers;
    
    private ArrayList<Animon> wildAnimons;
    private Random ran;
    
    
    public void swapAnimon(int index){
            Animon temp;
            temp = this.trainer.getParty().get(0);
            this.trainer.getParty().remove(0);
            this.trainer.getParty().add(temp);
    }
    
    public boolean ifAllFainted(){
        int faint = 0;
        for(int j=0; j<this.trainer.getPartySize(); j++){
            if(this.trainer.getParty().get(j).getCurrHp() < 1)
                faint++;
        }
        if(faint == this.trainer.getPartySize())
            return true;
        else
            return false;
    }
    
    
    public OverWorldPanelKeyEvents(OverWorldPanel panel, int[] wildX, int[] wildY, int[] healX, int[]healY,
                                    int[] trainX, int[] trainY, Trainer trainer, Trainer[] trainers,
                                    ArrayList<Animon> wildAnimons){
        this.panel = panel;
        this.wildY = wildY;
        this.wildX = wildX;
        
        
        this.trainer = trainer;
        this.trainers = trainers;
        
        this.healX = healX;
        this.healY = healY;
        
        this.trainX = trainX;
        this.trainY = trainY;
        
        this.wildAnimons = wildAnimons;
        
        this.ran = new Random();
        
    }
    
    @Override
    public void keyTyped(KeyEvent e) {}

    @Override
    public void keyPressed(KeyEvent e) {
        //MAP WINDOW SIZE: WIDTH 600; HEIGHT 500
        
        switch (e.getKeyCode())
        {
            case KeyEvent.VK_DOWN: panel.charY += 50; 
                break;
            case KeyEvent.VK_UP: panel.charY -= 50; 
                break;
            case KeyEvent.VK_LEFT: panel.charX -= 50;
                break;
            case KeyEvent.VK_RIGHT: panel.charX += 50;
                break;
            case 65: swapAnimon(1);
                break;
        }
        //if char is going past the left side
        
        if (panel.charX < 0){
            panel.charX = 0;
        }
        //if char is going past to the right side
        else if (panel.charX > 600){
            panel.charX = 600;
        }
        
        //if char if going past to the up edge
        if (panel.charY < 0){
            panel.charY = 0;
        }
        //if char is going past to the down edge
        else if (panel.charY > 500){
            panel.charY = 500;
        }
        
        panel.repaint();
        
        
        //triggers stepped on animon
        for(int i=0; i<this.wildX.length; i++){
            if(panel.charX == this.wildX[i] && panel.charY == this.wildY[i]){
                if(!ifAllFainted()){
                    panel.setEncounter(this.wildAnimons.get(ran.nextInt(4)));
                    panel.getEncounter().setCurrHp(panel.getEncounter().getStatHp());
                    panel.getSteppedOnAnimon().actionPerformed(null);
                }
            }
            
        }
        
        //triggers stepped on trainer
        for(int i=0; i<this.trainX.length; i++){
            if(panel.charX == this.trainX[i] && panel.charY == this.trainY[i]){
                if(!ifAllFainted()){
                    panel.setEncounter(this.trainers[i].getParty().get(0));
                    panel.getEncounter().setCurrHp(panel.getEncounter().getStatHp());
                    panel.getSteppedOnAnimon().actionPerformed(null);
                }
            }
        }
        
        //heals party if stepped on house
        for(int i=0; i<this.healX.length; i++){
            if(panel.charX == this.healX[i] && panel.charY == this.healY[i]){
                for(int j=0; j<this.trainer.getPartySize(); j++)
                    this.trainer.getParty().get(j).setCurrHp(this.trainer.getParty().get(j).getStatHp());
                panel.repaint();
            }
            
        }
        
        //If character is at right edge of map
        //Wild animons coors will go to left
        if(panel.charX == 600 && e.getKeyCode() == KeyEvent.VK_RIGHT ){
                for(int i=0; i<this.wildX.length; i++){
                    this.wildX[i] -= 50;
                }
                for(int i=0; i<this.healX.length; i++){
                    this.healX[i] -= 50;
                }
                for(int i=0; i<this.trainX.length; i++){
                    this.trainX[i] -= 50;
                }
                
            
        }
        
        //If character is at left edge of map
        //Wild animons coors will go to right
        if(panel.charX == 0 && e.getKeyCode() == KeyEvent.VK_LEFT ){
                for(int i=0; i<this.wildX.length; i++){
                    this.wildX[i] += 50;
                }
                for(int i=0; i<this.healX.length; i++){
                    this.healX[i] += 50;
                }
                for(int i=0; i<this.trainX.length; i++){
                    this.trainX[i] += 50;
                }
            
        }
        
        //If character is at upper edge of map
        //Wild animons coors will go down
        if(panel.charY == 0 && e.getKeyCode() == KeyEvent.VK_UP ){
                for(int i=0; i<this.wildY.length; i++){
                    this.wildY[i] += 50;
                }
                for(int i=0; i<this.healY.length; i++){
                    this.healY[i] += 50;
                }
                for(int i=0; i<this.trainY.length; i++){
                    this.trainY[i] += 50;
                }
            
        }
        
        //If character is at bottom edge of map
        //Wild animons coors will go up
        if(panel.charY == 500 && e.getKeyCode() == KeyEvent.VK_DOWN ){
                for(int i=0; i<this.wildY.length; i++){
                    this.wildY[i] -= 50;
                }
                for(int i=0; i<this.healY.length; i++){
                    this.healY[i] -= 50;
                }
                for(int i=0; i<this.trainY.length; i++){
                    this.trainY[i] -= 50;
                }
            
            
        panel.repaint();
        }
        
    }
    
    @Override
    public void keyReleased(KeyEvent e) {}
}
