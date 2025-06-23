//AUTHOR: Jana Austria && Hannah Chua
//ART: Hannah Chua

import java.util.HashMap;

public class Multiplier{
	String animonX;
	String animonY;
	
	public Multiplier(String x, String y){
		this.animonX = x;
		this.animonY = y;
	}
	
	public float getMultiplier(){
		HashMap<String,Float> list = new HashMap<String,Float>();
		
		list.clear();
		
		if(this.animonX == "Grass" ){
			list.put("Grass", 0.5f);
			list.put("Fire", 0.5f);
			list.put("Water", 2f);
			list.put("Poison", 0.5f);
		}
		else if(this.animonX == "Fire" ){
			list.put("Grass", 2f);
			list.put("Fire", 0.5f);
			list.put("Water", 0.5f);
			list.put("Poison", 1f);
		}
		else if(this.animonX == "Water" ){
			list.put("Grass", 0.5f);
			list.put("Fire", 2f);
			list.put("Water", 0.5f);
			list.put("Poison", 1f);
		}
		else if(this.animonX == "Poison" ){
			list.put("Grass", 2f);
			list.put("Fire", 1f);
			list.put("Water", 1f);
			list.put("Poison", 0.5f);
		}
                else if(this.animonX == "Normal" ){
			list.put("Grass", 1f);
			list.put("Fire", 1f);
			list.put("Water", 1f);
			list.put("Poison", 1f);
		}
                else if(this.animonX == "Ice" ){
			list.put("Grass", 2f);
			list.put("Fire", 0.5f);
			list.put("Water", 0.5f);
			list.put("Poison", 1f);
                }
                else if(this.animonX == "Ground" ){
			list.put("Grass", 0.5f);
			list.put("Fire", 2f);
			list.put("Water", 1f);
			list.put("Poison", 2f);
                }
                else if(this.animonX == "Psychic" ){
			list.put("Grass", 1f);
			list.put("Fire", 1f);
			list.put("Water", 1f);
			list.put("Poison", 2f);
                }
		
		return list.get(this.animonY);
	}
	
}