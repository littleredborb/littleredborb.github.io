//AUTHOR: Jana Austria && Hannah Chua
//ART: Hannah Chua

import java.awt.Dimension;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Random;
import javax.swing.JButton;
import javax.swing.JLabel;

public class BattleAction implements ActionListener{
        private Animon user;
        private JLabel messageBox;
        private Move move;
        private Animon enemy;
        private JLabel messageBox2;
        private JLabel hp1;
        private JLabel hp2;
        
        private BattlePanel pan;
        private Random rand;
        private Trainer trainer;
        
        
        private JButton cont;
        private JButton[] buttons;
        

        
        public BattleAction(Trainer trainer,BattlePanel pan, Animon user, JLabel messageBox, 
                            JLabel messageBox2, Move move, Animon enemy, JLabel hp1, JLabel hp2,
                            JButton[] buttons){
            this.user = user;
            this.messageBox = messageBox;
            this.move = move;
            this.enemy = enemy;
            this.hp1 = hp1;
            this.hp2 = hp2;
            this.messageBox2 = messageBox2;
            this.pan = pan;
            this.rand = new Random();
            this.trainer = trainer;
            this.buttons = buttons;
            
            this.cont = new JButton("click here to continue");
            
            Dimension contSize = cont.getPreferredSize();
            cont.setBounds(270, 370, contSize.width, contSize.height);
            
        }
        
        @Override
        public void actionPerformed(ActionEvent e){
            
            int turn = rand.nextInt(2);
            //0 - user first
            //1 - enemy first
            
            if(turn == 0){            
                System.out.println("player first");
                userTurn();
                if(ifUserIsFainted())
                    this.userFainted();
                else if(ifEnemyIsFainted())
                    this.enemyFainted();
                else{
                   
                enemyTurn();
                if(ifUserIsFainted())
                    this.userFainted();
                else if(ifEnemyIsFainted())
                    this.enemyFainted();
                }
            }
            else{
                System.out.println("enemy first");
                enemyTurn();
                if(ifUserIsFainted())
                    this.userFainted();
                else if(ifEnemyIsFainted())
                    this.enemyFainted();
                else{
                    userTurn();
                if(ifUserIsFainted())
                    this.userFainted();
                else if(ifEnemyIsFainted())
                    this.enemyFainted();
                }
            }
                
        }
        
        public void swapAnimon(int index){
            Animon temp;
            temp = this.trainer.getParty().get(0);
            this.trainer.getParty().remove(0);
            this.trainer.getParty().add(temp);
        }
        
        public boolean ifUserIsFainted(){
            if(this.user.getCurrHp() < 1)
                return true;
            else
                return false;
        }
        
        public boolean ifEnemyIsFainted(){
            if(this.enemy.getCurrHp() < 1)
                return true;
            else
                return false;
        }
        
        public void userFainted(){
            this.hp1.setText("--fainted--");
            this.messageBox.setText(this.user.getName() + " has fainted");
            this.pan.repaint();
            this.swapAnimon(1);
            this.pan.add(cont);
            
            for(int i=0; i<this.buttons.length; i++)
                this.buttons[i].setVisible(false);
            
            this.cont.addActionListener(new ActionListener() {

                @Override
                public void actionPerformed(ActionEvent e) {
                    BattleAction.this.pan.getEndBattle().actionPerformed(null);
                    
                    
                }
            });
        }
        
        public void enemyFainted(){
            this.hp2.setText("--fainted--");
            this.messageBox2.setText(this.enemy.getName() + " has fainted");
            //get exp
            this.user.gainExp(this.enemy);
            this.user.levelUp();
            this.messageBox.setText(this.user.getName() + " gained " + this.user.getGainedExp(this.enemy.getLevel()) + " EXP");
            this.pan.add(cont);
            this.pan.repaint();
            
            for(int i=0; i<this.buttons.length; i++)
                this.buttons[i].setVisible(false);
            
            cont.addActionListener(new ActionListener() {

                @Override
                public void actionPerformed(ActionEvent e) {
                    BattleAction.this.pan.getEndBattle().actionPerformed(null);
                }
            });
        }
        
        public void userTurn(){
            this.messageBox.setText(this.user.getName() + " used " + this.move.getName());
            this.enemy.setCurrHp(this.enemy.getCurrHp() - this.move.calculateDamage(this.enemy));
            this.hp2.setText("HP : " + Math.floor(this.enemy.getCurrHp()));
        }
        
        public void enemyTurn(){
            int enemyMove = rand.nextInt(4);
            int m = enemyMove; 
            this.messageBox2.setText(this.enemy.getName() + " used " + this.enemy.getMoves()[m].getName());
            this.user.setCurrHp(this.user.getCurrHp() - this.enemy.getMoves()[m].calculateDamage(this.enemy));
            this.hp1.setText("HP : " + Math.floor(this.user.getCurrHp()));
        }
        
    }