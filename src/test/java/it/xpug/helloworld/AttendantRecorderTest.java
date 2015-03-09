package it.xpug.helloworld;

import static org.junit.Assert.*;

import org.junit.Test;

public class AttendantRecorderTest {

	@Test
	public void shouldReadListWithOneAttendant() {
		
		AttendantRecorder recorder = new AttendantRecorder();
		Attendant attendant = new Attendant("pippo", "pluto", "pippo@gmail.com", "abc", 1);
		
		recorder.addAddendants(attendant);
		
		assertEquals("[{\"nome\":\"pippo\", \"cognome\":\"pluto\", \"email\":\"pippo@gmail.com\", \"idCorso\":\"abc\"}]", recorder.getAttendantsAsJson());
	}
	
	@Test
	public void shouldAddAttendand() {
		
		AttendantRecorder recorder = new AttendantRecorder();
		
		assertEquals("[]",recorder.getAttendantsAsJson());
		Attendant attendant = new Attendant("pippo", "pluto", "pippo@gmail.com", "abc", 1);
		
		recorder.addAddendants(attendant);
		assertEquals("[{\"nome\":\"pippo\", \"cognome\":\"pluto\", \"email\":\"pippo@gmail.com\", \"idCorso\":\"abc\"}]", recorder.getAttendantsAsJson());
		attendant = new Attendant("ciao", "mario", "pippo@gmail.com", "cba", 1);
		
		recorder.addAddendants(attendant);
		assertEquals("[{\"nome\":\"pippo\", \"cognome\":\"pluto\", \"email\":\"pippo@gmail.com\", \"idCorso\":\"abc\"},"
				+ "{\"nome\":\"ciao\", \"cognome\":\"mario\", \"email\":\"pippo@gmail.com\", \"idCorso\":\"cba\"}]", recorder.getAttendantsAsJson());	
	}
	
	@Test
	public void shouldMultipleAttendantsForCompany() {
		AttendantRecorder recorder = new AttendantRecorder();
		
		Attendant attendant = new Attendant("nomeAzienda", "", "pippo@azienda.com", "corsoid", 5);
		
		recorder.addAddendants(attendant);
		assertEquals("[{\"nome\":\"nomeAzienda\", \"cognome\":\"\", \"email\":\"pippo@azienda.com\", \"idCorso\":\"corsoid\", \"numeroPartecipanti\": 5}]",
				recorder.getAttendantsAsJson());
	}

}
