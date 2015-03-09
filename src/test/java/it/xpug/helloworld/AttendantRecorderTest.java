package it.xpug.helloworld;

import static org.junit.Assert.*;

import org.junit.Test;

public class AttendantRecorderTest {

	@Test
	public void shouldReadListWithOneAttendant() {
		
		AttendantRecorder recorder = new AttendantRecorder();
		Attendant attendant = new Attendant("pippo", "pluto", "pippo@gmail.com", "abc");
		
		recorder.addAddendants(attendant);
		
		assertEquals("[{\"nome\":\"pippo\", \"cognome\":\"pluto\", \"email\":\"pippo@gmail.com\", \"idCorso\":\"abc\"}]", recorder.getAttendantsAsJson());
	}
	
	@Test
	public void shouldAddAttendand() {
		
		AttendantRecorder recorder = new AttendantRecorder();
		
		assertEquals("[]",recorder.getAttendantsAsJson());
		Attendant attendant = new Attendant("pippo", "pluto", "pippo@gmail.com", "abc");
		
		recorder.addAddendants(attendant);
		assertEquals("[{\"nome\":\"pippo\", \"cognome\":\"pluto\", \"email\":\"pippo@gmail.com\", \"idCorso\":\"abc\"}]", recorder.getAttendantsAsJson());
		attendant = new Attendant("ciao", "mario", "pippo@gmail.com", "cba");
		
		recorder.addAddendants(attendant);
		assertEquals("[{\"nome\":\"pippo\", \"cognome\":\"pluto\", \"email\":\"pippo@gmail.com\", \"idCorso\":\"abc\"},"
				+ "{\"nome\":\"ciao\", \"cognome\":\"mario\", \"email\":\"pippo@gmail.com\", \"idCorso\":\"cba\"}]", recorder.getAttendantsAsJson());	
	}

}
