package it.xpug.helloworld;

import java.util.ArrayList;

public class AttendantRecorder {
	
	private ArrayList<Attendable> attendants;
	
	public AttendantRecorder(){
		attendants = new ArrayList<Attendable>();
	}

	public String getAttendantsAsJson() {
		return "["+attendantsList()+"]";
	}

	private String attendantsList() {
		String temp="";
		for (Attendable attendant : attendants) {
			temp+=attendant+",";
		}
		return temp.replaceAll(",$", "");
	}

	public void addAddendants(Attendable attendant) {
		this.attendants.add(attendant);
		
	}
}
