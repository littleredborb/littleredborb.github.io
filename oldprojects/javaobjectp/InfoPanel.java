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
import javax.swing.JTextField;
import javax.swing.ImageIcon;

public class InfoPanel extends JPanel {

    private ImageIcon boyImg;
    private ImageIcon girlImg;
    
    private ImageIcon fireImg;
    private ImageIcon waterImg;
    private ImageIcon grassImg;
    private ImageIcon poisonImg;
    
    private JLabel boySprite;
    private JLabel girlSprite;
    
    private JLabel fireSprite;
    private JLabel waterSprite;
    private JLabel grassSprite;
    private JLabel poisonSprite;
    
    private JLabel partyList;
    private JLabel giveName;
    
    private JLabel question;
    private JLabel question2;
    private JLabel question3;

    private JTextField nameHere;
    private JTextField nickName;

    private JButton fire;
    private JButton water;
    private JButton grass;
    private JButton poison;
    
    private JButton boy;
    private JButton girl;
    private JButton addAnimon;
    
    private JButton ok;

    private Trainer trainer;

    private ActionListener onConfirm;
    
    private Animon temp;
    
    
    
    public void setOnConfirm(ActionListener event){
        this.onConfirm = event;
    }
    
    public Trainer getTrainer(){
        return trainer;
    }
    
    public InfoPanel() {
        setSize(800,600);
        this.temp = null;
        
        //Labels
        question = new JLabel("Are you a boy or a girl?");
        question2 = new JLabel("What is your name?");
        question3 = new JLabel("Select four animons: ");
        partyList = new JLabel("Party: ");
        giveName = new JLabel("Give your animon a name:");
        
        //ImageIcons
        boyImg = new ImageIcon("boy.png");
        girlImg = new ImageIcon("girl.png");
        
        fireImg = new ImageIcon("squirrel_m.png");
        waterImg = new ImageIcon("penguin_m.png");
        grassImg = new ImageIcon("cat_m.png");
        poisonImg = new ImageIcon("frog_m.png");
        
        //Sprites
        
        //Buttons
        boy = new JButton("I am a boy", boyImg);
        girl = new JButton("I am a girl", girlImg);
        
        fire = new JButton("Cindrel", fireImg);
        water = new JButton("Ringuin", waterImg);
        grass = new JButton("Meowleaf", grassImg);
        poison = new JButton("Froctic", poisonImg);
        
        fire.setToolTipText("fire squirrel animon");
        water.setToolTipText("ice penguin animon");
        grass.setToolTipText("forest cat animon");
        poison.setToolTipText("poison frog animon");
        
        fire.setSize(500, 500);
        
        nameHere = new JTextField("", 20);
        nickName = new JTextField("Give it a nickname", 20);
        ok = new JButton("ok");
        addAnimon = new JButton("add");
        
        
        
        //-------------Add Dimensions and Set Positions-------
        setLayout(null);
        
        Dimension q1Size = this.question.getPreferredSize();
        Dimension q2Size = this.question2.getPreferredSize();
        Dimension q3Size = this.question3.getPreferredSize();
        
        Dimension nameSize = this.nameHere.getPreferredSize();
        Dimension nickSize = this.nickName.getPreferredSize();
        
        Dimension boySize = this.boy.getPreferredSize();
        Dimension girlSize = this.girl.getPreferredSize();
        
        Dimension okSize = this.ok.getPreferredSize();
        Dimension addSize = this.addAnimon.getPreferredSize();
        
        Dimension fireSize = this.fire.getPreferredSize();
        Dimension waterSize = this.water.getPreferredSize();
        Dimension grassSize = this.grass.getPreferredSize();
        Dimension poisonSize = this.poison.getPreferredSize();
        Dimension partySize = this.partyList.getPreferredSize();
        Dimension giveSize = this.giveName.getPreferredSize();
        
        //setBounds
        
        question.setBounds(50,50,q1Size.width, q1Size.height);
        question2.setBounds(50,50,q2Size.width, q2Size.height);
        question3.setBounds(50,50,q3Size.width, q2Size.height);
        partyList.setBounds(50,300,800, partySize.height);
        giveName.setBounds(450,70,giveSize.width, giveSize.height);
        
        boy.setBounds(50,70, boySize.width, boySize.height);
        girl.setBounds(200, 70, girlSize.width, girlSize.height);
        fire.setBounds(50, 70, fireSize.width, fireSize.height);
        water.setBounds(300, 70, waterSize.width, waterSize.height);
        grass.setBounds(50, 150, grassSize.width, grassSize.height);
        poison.setBounds(300, 150, poisonSize.width, poisonSize.height);
        
        nickName.setBounds(450, 100, nickSize.width, nickSize.height);
        nameHere.setBounds(50, 70, nameSize.width, nameSize.height);
        ok.setBounds(60+nameSize.width, 68, okSize.width, okSize.height);
        addAnimon.setBounds(550, 140, addSize.width, addSize.height);
        
        
        
        //----------------------Add Action to buttons----------------

        boy.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent e) {
                
                trainer = new Trainer("Boy");
                girl.setVisible(false);
                boy.setVisible(false);
                question.setVisible(false);
                InfoPanel.this.add(question2);
                InfoPanel.this.add(nameHere);
                InfoPanel.this.add(ok);
                
            }
        });

        girl.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent e) {
                
                trainer = new Trainer("Girl");
                girl.setVisible(false);
                boy.setVisible(false);
                question.setVisible(false);
                InfoPanel.this.add(question2);
                InfoPanel.this.add(nameHere);
                InfoPanel.this.add(ok);
            }
        });

        ok.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent e) {
                
                trainer.setName(nameHere.getText());
                question2.setVisible(false);
                nameHere.setVisible(false);
                ok.setVisible(false);
                
                InfoPanel.this.add(question3);
                InfoPanel.this.add(fire);
                InfoPanel.this.add(water);
                InfoPanel.this.add(grass);
                InfoPanel.this.add(poison);
                InfoPanel.this.add(partyList);
                repaint();
            }
        });
        
        addAnimon.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent e) {
                InfoPanel.this.temp.setName(InfoPanel.this.nickName.getText());
                trainer.getParty().add(InfoPanel.this.temp);
                InfoPanel.this.partyList.setText(InfoPanel.this.partyList.getText() 
                                                 + InfoPanel.this.trainer.getParty().get(InfoPanel.this.trainer.getPartySize()-1).getName() 
                                                 + " | ");
                if(trainer.getPartySize() == trainer.MAX_ANIMON)
                    InfoPanel.this.onConfirm.actionPerformed(null);
                InfoPanel.this.remove(InfoPanel.this.nickName);
                InfoPanel.this.remove(InfoPanel.this.giveName);
                InfoPanel.this.remove(InfoPanel.this.addAnimon);
                InfoPanel.this.nickName.setVisible(false);
                InfoPanel.this.addAnimon.setVisible(false);
                InfoPanel.this.giveName.setVisible(false);
                InfoPanel.this.temp = null;
                InfoPanel.this.repaint();
            }
        });
        
        fire.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent e) {
                InfoPanel.this.add(InfoPanel.this.nickName);
                InfoPanel.this.add(InfoPanel.this.giveName);
                InfoPanel.this.add(InfoPanel.this.addAnimon);
                InfoPanel.this.giveName.setVisible(true);
                InfoPanel.this.nickName.setVisible(true);
                InfoPanel.this.nickName.setText(trainer.getName() + "'s Cindrel");
                InfoPanel.this.addAnimon.setVisible(true);
                InfoPanel.this.temp = new Cindrel("", 1);
                InfoPanel.this.repaint();
            }
        });
        water.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent e) {
                InfoPanel.this.add(InfoPanel.this.nickName);
                InfoPanel.this.add(InfoPanel.this.giveName);
                InfoPanel.this.add(InfoPanel.this.addAnimon);
                InfoPanel.this.giveName.setVisible(true);
                InfoPanel.this.nickName.setVisible(true);
                InfoPanel.this.nickName.setText(trainer.getName() + "'s Ringuin");
                InfoPanel.this.addAnimon.setVisible(true);
                InfoPanel.this.temp = new Ringuin("", 1);
                InfoPanel.this.repaint();
            }
        });
        grass.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent e) {
                InfoPanel.this.add(InfoPanel.this.nickName);
                InfoPanel.this.add(InfoPanel.this.giveName);
                InfoPanel.this.add(InfoPanel.this.addAnimon);
                InfoPanel.this.giveName.setVisible(true);
                InfoPanel.this.nickName.setVisible(true);
                InfoPanel.this.nickName.setText(trainer.getName() + "'s Meowleaf");
                InfoPanel.this.addAnimon.setVisible(true);
                InfoPanel.this.temp = new Meowleaf("", 1);
                InfoPanel.this.repaint();
            }
        });
        poison.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent e) {
                InfoPanel.this.add(InfoPanel.this.nickName);
                InfoPanel.this.add(InfoPanel.this.giveName);
                InfoPanel.this.add(InfoPanel.this.addAnimon);
                InfoPanel.this.giveName.setVisible(true);
                InfoPanel.this.nickName.setVisible(true);
                InfoPanel.this.nickName.setText(trainer.getName() + "'s Froctic");
                InfoPanel.this.addAnimon.setVisible(true);
                InfoPanel.this.temp = new Froctic("", 1);
                InfoPanel.this.repaint();
            }
        });

        this.add(question);
        this.add(boy);
        this.add(girl);
        

        this.setVisible(false);
    }
    
    @Override
    public void paintComponent(Graphics g){
        super.paintComponent(g);
        
        g.setColor(Color.WHITE);
        g.fillRect(0, 0, 800, 600);
        
        g.setColor(Color.DARK_GRAY);
        g.fillRect(0, 0, 800, 30);
        g.fillRect(0, 400, 800, 200);
    }
}
