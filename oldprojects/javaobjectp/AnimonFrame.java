//AUTHOR: Jana Austria && Hannah Chua
//ART: Hannah Chua

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import javax.swing.JFrame;
import java.util.Random;
import java.util.Scanner;

public class AnimonFrame extends JFrame {

    final MainMenuPanel mainMenu;
    final InfoPanel selectMenu;
    BattlePanel battle;
    OverWorldPanel overWorld;
    
    public AnimonFrame() {

        mainMenu = new MainMenuPanel();
        selectMenu = new InfoPanel();
        overWorld = null;
        
        mainMenu.setOnStartButtonClicked(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent e) {

                AnimonFrame.this.mainMenu.setVisible(false);
                AnimonFrame.this.remove(AnimonFrame.this.mainMenu);

                AnimonFrame.this.add(AnimonFrame.this.selectMenu);
                AnimonFrame.this.selectMenu.setVisible(true);
            }
        });
        

        selectMenu.setOnConfirm(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent e) {

                AnimonFrame.this.overWorld = new OverWorldPanel(AnimonFrame.this.selectMenu.getTrainer());

                AnimonFrame.this.remove(AnimonFrame.this.selectMenu);
                AnimonFrame.this.add(AnimonFrame.this.overWorld);

                AnimonFrame.this.overWorld.setVisible(true);
                AnimonFrame.this.overWorld.setFocusable(true);
                
                overWorld.setSteppedOnAnimon(new ActionListener() {

                    @Override
                    public void actionPerformed(ActionEvent e) {
                        
                        //set wild Animon level same to user animon
                        if(overWorld.getEncounter().getName().startsWith("wild")){
                            overWorld.getEncounter().setLevel(AnimonFrame.this.selectMenu.getTrainer().getParty().get(0).getLevel());
                            overWorld.getEncounter().setCurrHp(AnimonFrame.this.selectMenu.getTrainer().getParty().get(0).getStatHp());
                            
                        }
                        AnimonFrame.this.battle = new BattlePanel(AnimonFrame.this.selectMenu.getTrainer(), 
                                                          AnimonFrame.this.selectMenu.getTrainer().getParty().get(0), 
                                                            overWorld.getEncounter());
                
                
                battle.setEndBattle(new ActionListener() {

                    @Override
                    public void actionPerformed(ActionEvent e) {
                        AnimonFrame.this.remove(battle);
                        AnimonFrame.this.overWorld.setVisible(true);
                    }
                });
                
                AnimonFrame.this.overWorld.setVisible(false);
                AnimonFrame.this.add(AnimonFrame.this.battle);
                AnimonFrame.this.battle.setVisible(true);
                }
            });
            }
        });
        
        
        

        
        this.setSize(800, 600);
        this.setTitle("Animon!");
        this.setDefaultCloseOperation(EXIT_ON_CLOSE);

        this.add(mainMenu);

        mainMenu.setVisible(true);
    }
    
}
