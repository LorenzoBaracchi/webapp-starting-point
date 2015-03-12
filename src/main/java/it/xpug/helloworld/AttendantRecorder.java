package it.xpug.helloworld;

import java.util.ArrayList;

public class AttendantRecorder {
	
	private ArrayList<Attendant> attendants;
	
	public AttendantRecorder(){
		attendants = new ArrayList<Attendant>();
	}

	public String getAttendantsAsJson() {
		return "["+attendantsList()+"]";
	}

	private String attendantsList() {
		String temp="";
		for (Attendant attendant : attendants) {
			temp+=attendant+",";
		}
		return temp.replaceAll(",$", "");
	}

	public void addAddendants(Attendant attendant) {
		this.attendants.add(attendant);
		
	}
}
