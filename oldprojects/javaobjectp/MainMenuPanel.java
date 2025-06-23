//AUTHOR: Jana Austria && Hannah Chua
//ART: Hannah Chua

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;
import javax.swing.ImageIcon;
import javax.swing.JPanel;
import javax.swing.JLabel;
import javax.swing.JButton;

public class MainMenuPanel extends JPanel{
    private final JButton start_btn;
    private final JButton exit_btn;
    
    private ActionListener onStartButtonClicked;
    
    public void setOnStartButtonClicked(ActionListener event)    {
        onStartButtonClicked = event;
    }
    
    
    public MainMenuPanel(){
        start_btn = new JButton("start");
        exit_btn = new JButton("exit");
        
        start_btn.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent e) {
                
                MainMenuPanel.this.onStartButtonClicked.actionPerformed(e);
            }
        });
        
        exit_btn.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent e) {
                System.exit(0);
            }
        });
        
        
        
        //-----------------DIMENSIONS----------------
        setLayout(null);
        
        Dimension startSize = start_btn.getPreferredSize();
        Dimension exitSize = exit_btn.getPreferredSize();
        
        start_btn.setBounds(350,250,startSize.width,startSize.height);
        exit_btn.setBounds(353,300, exitSize.width, exitSize.height);
        
        start_btn.setVisible(true);
        exit_btn.setVisible(true);
        this.add(start_btn);
        this.add(exit_btn);
                
        
    }
    
    @Override
    public void paintComponent(Graphics g){
        super.paintComponent(g);
        
        g.setColor(Color.WHITE);
        g.fillRect(0,0,800,600);
        
        g.setColor(Color.DARK_GRAY);
        g.fillRect(0, 0, 800, 100);
        g.fillRect(0, 400, 800, 200);
        
        g.drawImage((new ImageIcon("squirrel_m.png")).getImage(), 180, 280, null);
        g.drawImage((new ImageIcon("penguin_m.png")).getImage(), 230, 330, null);
        g.drawImage((new ImageIcon("frog_m.png")).getImage(), 540, 280, null);
        g.drawImage((new ImageIcon("cat_m.png")).getImage(), 480, 330, null);
        g.drawImage((new ImageIcon("title.png")).getImage(), 275, 150, null);
        
    }
}
