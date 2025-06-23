//AUTHOR: Jana Austria && Hannah Chua
//ART: Hannah Chua

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.ImageIcon;


public class BattlePanel extends JPanel{
    private JButton[] buttons;
    
    private ImageIcon userImg;
    private ImageIcon enemyImg;
    
    private JLabel userSprite;
    private JLabel enemySprite;
    
    private JLabel messageBox;
    private JLabel messageBox2;
    
    private JLabel hp1;
    private JLabel hp2;
    
    private Trainer trainer;
    private Animon user;
    private Animon enemy;
    
    private ActionListener endBattle;    
    
    public Trainer getTrainer(){
        return this.trainer;
    }
    
    public void setEndBattle(ActionListener event){
        this.endBattle = event;
    }
    public ActionListener getEndBattle(){
        return this.endBattle;
    }
    
    public BattlePanel(Trainer trainer, Animon user, Animon enemy){
        this.trainer = trainer;
        this.user = user;
        this.enemy = enemy;
            
        //buttons
        buttons = new JButton[4];        
        for(int i=0; i<user.getMoves().length; i++)
            buttons[i] = new JButton(user.getMoves()[i].getName());
        
        //images
        if(user instanceof Cindrel)
            userImg = new ImageIcon("squirrel.png");
        else if(user instanceof Ringuin)
            userImg = new ImageIcon("penguin.png");
        else if(user instanceof Meowleaf)
            userImg = new ImageIcon("cat.png");
        else
            userImg = new ImageIcon("frog.png");
        if(enemy instanceof Cindrel)
            enemyImg = new ImageIcon("squirrel.png");
        else if(enemy instanceof Ringuin)
            enemyImg = new ImageIcon("penguin.png");
        else if(enemy instanceof Meowleaf)
            enemyImg = new ImageIcon("cat.png");
        else
            enemyImg = new ImageIcon("frog.png");
        
        //labels
        userSprite = new JLabel(userImg);
        enemySprite = new JLabel(enemyImg);
        messageBox = new JLabel("Go! " + this.user.getName() + "!");
        messageBox2 = new JLabel(this.enemy.getName() + " wants to battle!");
        hp1 = new JLabel("HP : " + Math.floor(this.user.getCurrHp()));
        hp2 = new JLabel("HP : " + Math.floor(this.enemy.getCurrHp()));
        
        //add action for the buttons
        for(int i=0; i<user.getMoves().length; i++){
            buttons[i].addActionListener(new BattleAction(this.trainer,this, user, this.messageBox, 
                                        this.messageBox2, user.getMoves()[i], enemy, hp1, hp2, buttons));
        }
        
        //setDimensions
        setLayout(null);
        
        Dimension userSpriteSize = userSprite.getPreferredSize();
        Dimension enemySpriteSize = enemySprite.getPreferredSize();
        Dimension messageSize = messageBox.getPreferredSize();
        Dimension message2Size = messageBox2.getPreferredSize();
        
        Dimension b1Size = buttons[0].getPreferredSize();
        Dimension b2Size = buttons[1].getPreferredSize();
        Dimension b3Size = buttons[2].getPreferredSize();
        Dimension b4Size = buttons[3].getPreferredSize();
        
        Dimension hp1Size = hp1.getPreferredSize();
        Dimension hp2Size = hp2.getPreferredSize();
        
        messageBox.setBounds(50, 330, 500, messageSize.height);
        messageBox2.setBounds(470, 330, 500, message2Size.height);
        
        buttons[0].setBounds(470, 450, b1Size.width, b1Size.height);
        buttons[1].setBounds(600, 450, b2Size.width, b2Size.height);
        buttons[2].setBounds(470, 500, b3Size.width, b3Size.height);
        buttons[3].setBounds(600, 500, b4Size.width, b4Size.height);
        
        hp1.setBounds(40, 30, 200, hp1Size.height);
        hp2.setBounds(600, 30, 200, hp2Size.height);
        
        //----------------Add Components------------------------
        for(int i=0; i<user.getMoves().length; i++)
            this.add(buttons[i]);
        this.add(messageBox);
        this.add(messageBox2);
        this.add(hp1);
        this.add(hp2);
        
        repaint();
    }
    
    @Override
    public void paintComponent(Graphics g){
        super.paintComponent(g);
        
        g.setColor(Color.WHITE);
        g.fillRect(0, 0, 800, 400);
        
        g.setColor(Color.LIGHT_GRAY);
        //menu
        g.fillRect(0, 400, 800, 200);
        
        //top bar
        g.fillRect(0, 0, 800, 50);
        
        //stats
        g.setColor(Color.DARK_GRAY);
        g.drawString(this.user.getName(), 40, 20);
        g.drawString("[Lvl] " + this.user.getLevel(), 140, 20);
        
        g.drawString(this.enemy.getName(), 600, 20);
        g.drawString("[Lvl] " + this.enemy.getLevel(), 700, 20);
        
        //party:
        g.drawString("Party: ", 50, 470);
        g.drawString("Select an attack: ", 500, 430);
        
        for(int i = 0; i<this.trainer.getPartySize(); i++){
            if(this.trainer.getParty().get(i) instanceof Cindrel && this.trainer.getParty().get(i).getCurrHp() >= 1)
                g.drawImage((new ImageIcon("squirrel_m.png").getImage()), i*50, 500, null);
            else if(this.trainer.getParty().get(i) instanceof Ringuin && this.trainer.getParty().get(i).getCurrHp() >= 1)
                g.drawImage((new ImageIcon("penguin_m.png").getImage()), i*50, 500, null);
            else if(this.trainer.getParty().get(i) instanceof Meowleaf && this.trainer.getParty().get(i).getCurrHp() >= 1)
                g.drawImage((new ImageIcon("cat_m.png").getImage()), i*50, 500, null);
            else if(this.trainer.getParty().get(i) instanceof Froctic && this.trainer.getParty().get(i).getCurrHp() >= 1)
                g.drawImage((new ImageIcon("frog_m.png").getImage()), i*50, 500, null);
        }
        
        
        //platform
        g.setColor(new Color(50,180,30));
        g.fillOval(30, 270, 160, 30);
        g.fillOval(580, 270, 160, 30);
        
        
        //sprite
        if(this.user.getCurrHp() > 0){
            g.drawImage(userImg.getImage(), 10, 100, null);
        }
        else repaint();
        if(this.enemy.getCurrHp() > 0){
            g.drawImage(enemyImg.getImage(), 550, 100, null);
        }
        else repaint();
        
    }

}
