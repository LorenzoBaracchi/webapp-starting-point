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

	public void removeAttendants(String companyName, String courseId, int numberToRemove) {
		CompanyAttendant current = (CompanyAttendant) getAttendatsFor(companyName, courseId);
		if(current != null)
			current.removePartecipants(numberToRemove);
	}

	private Attendable getAttendatsFor(String companyName, String courseId) {
		for(Attendable attendant : attendants){
			if(attendant.getNome().equals(companyName) && attendant.getIdCorso().equals(courseId))
				return attendant;
		}
		return null;
	}
}
