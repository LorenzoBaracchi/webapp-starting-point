package it.xpug.helloworld;

import static org.junit.Assert.*;

import org.junit.Test;

public class AttendantRecorderTest {

	@Test
	public void shouldReadListWithOneAttendant() {
		
		AttendantRecorder recorder = new AttendantRecorder();
		Attendable attendant = new Attendant("pippo", "pluto", "pippo@gmail.com", "abc");
		
		recorder.addAddendants(attendant);
		
		assertEquals("[{\"nome\":\"pippo\", \"cognome\":\"pluto\", \"email\":\"pippo@gmail.com\", \"idCorso\":\"abc\"}]", recorder.getAttendantsAsJson());
	}
	
	@Test
	public void shouldAddAttendand() {
		
		AttendantRecorder recorder = new AttendantRecorder();
		
		assertEquals("[]",recorder.getAttendantsAsJson());
		Attendable attendant = new Attendant("pippo", "pluto", "pippo@gmail.com", "abc");
		
		recorder.addAddendants(attendant);
		assertEquals("[{\"nome\":\"pippo\", \"cognome\":\"pluto\", \"email\":\"pippo@gmail.com\", \"idCorso\":\"abc\"}]", recorder.getAttendantsAsJson());
		attendant = new Attendant("ciao", "mario", "pippo@gmail.com", "cba");
		
		recorder.addAddendants(attendant);
		assertEquals("[{\"nome\":\"pippo\", \"cognome\":\"pluto\", \"email\":\"pippo@gmail.com\", \"idCorso\":\"abc\"},"
				+ "{\"nome\":\"ciao\", \"cognome\":\"mario\", \"email\":\"pippo@gmail.com\", \"idCorso\":\"cba\"}]", recorder.getAttendantsAsJson());	
	}
	
	@Test
	public void shouldMultipleAttendantsForCompany() {
		AttendantRecorder recorder = new AttendantRecorder();
		
		Attendable attendant = new CompanyAttendant("nomeAzienda", "pippo@azienda.com", "corsoid", 5);
		
		recorder.addAddendants(attendant);
		assertEquals("[{\"nome\":\"nomeAzienda\", \"email\":\"pippo@azienda.com\", \"idCorso\":\"corsoid\", \"numeroPartecipanti\":5}]",
				recorder.getAttendantsAsJson());
	}
	
	@Test
	public void shouldRemoveOneAttendantForCompany() throws AttendantException {
		AttendantRecorder recorder = new AttendantRecorder();
		
		Attendable attendant = new CompanyAttendant("nomeAzienda", "pippo@azienda.com", "corsoid", 5);
		
		recorder.addAddendants(attendant);
		assertEquals("[{\"nome\":\"nomeAzienda\", \"email\":\"pippo@azienda.com\", \"idCorso\":\"corsoid\", \"numeroPartecipanti\":5}]",
				recorder.getAttendantsAsJson());
		
		recorder.removeAttendants("nomeAzienda", "corsoid", 2);
		assertEquals("[{\"nome\":\"nomeAzienda\", \"email\":\"pippo@azienda.com\", \"idCorso\":\"corsoid\", \"numeroPartecipanti\":3}]",
				recorder.getAttendantsAsJson());
	}

	
	@Test(expected=AttendantException.class)
	public void shouldNotRemoveWhenNotEnoughAttendants() throws AttendantException {
		AttendantRecorder recorder = new AttendantRecorder();
		
		Attendable attendant = new CompanyAttendant("nomeAzienda", "pippo@azienda.com", "corsoid", 5);
		
		recorder.addAddendants(attendant);
		assertEquals("[{\"nome\":\"nomeAzienda\", \"email\":\"pippo@azienda.com\", \"idCorso\":\"corsoid\", \"numeroPartecipanti\":5}]",
				recorder.getAttendantsAsJson());
		
		recorder.removeAttendants("nomeAzienda", "corsoid", 8);	
	}
}
