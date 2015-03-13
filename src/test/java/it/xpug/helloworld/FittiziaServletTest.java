package it.xpug.helloworld;

import static org.junit.Assert.assertEquals;

import java.util.HashMap;

import org.junit.Test;

public class FittiziaServletTest {

	@Test
	public void shouldReadEmptyList() {
		FittiziaServlet server = new FittiziaServlet(null);
		assertEquals("[]", server.get("/api/attendants"));
	}

	@Test
	public void shouldAddAttendandOnPostSinglePartecipant() {
		FittiziaServlet server = new FittiziaServlet(null);

		HashMap<String, String> params = new HashMap<String, String>();
		params.put("nome", "pippo");
		params.put("cognome", "pluto");
		params.put("email", "pippo@gmail.com");
		params.put("idCorso", "tortellini");

		server.post("/api/attendants", params);
		assertEquals(
				"[{\"nome\":\"pippo\", \"cognome\":\"pluto\", \"email\":\"pippo@gmail.com\", \"idCorso\":\"tortellini\"}]",
				server.get("/api/attendants"));
	}
	
	@Test
	public void shouldAddAttendandOnPostMultiplePartecipants() {
		FittiziaServlet server = new FittiziaServlet(null);

		HashMap<String, String> params = new HashMap<String, String>();
		params.put("nome", "pippo");
		params.put("email", "pippo@gmail.com");
		params.put("idCorso", "tortellini");
		params.put("numeroPartecipanti", "9");

		server.post("/api/attendants", params);
		assertEquals(
				"[{\"nome\":\"pippo\", \"email\":\"pippo@gmail.com\", \"idCorso\":\"tortellini\", \"numeroPartecipanti\":9}]",
				server.get("/api/attendants"));
	}
	
	@Test
	public void shouldNotRespondOnInvalUrl(){
		FittiziaServlet server = new FittiziaServlet(null);
	//	assertEquals("404", server.get("/sconosciuto/attendants"));
	}
	
	@Test
	public void shouldRemoveAttendandOnPost(){
		FittiziaServlet server = new FittiziaServlet(null);
		
		HashMap<String, String> params = new HashMap<String, String>();
		params.put("nome", "pippo");
		params.put("email", "pippo@gmail.com");
		params.put("idCorso", "tortellini");
		params.put("numeroPartecipanti", "9");

		server.post("/api/attendants", params);
		assertEquals(
				"[{\"nome\":\"pippo\", \"email\":\"pippo@gmail.com\", \"idCorso\":\"tortellini\", \"numeroPartecipanti\":9}]",
				server.get("/api/attendants"));
		
		params = new HashMap<String, String>();
		params.put("method", "remove");
		params.put("nome", "pippo");
		params.put("email", "pippo@gmail.com");
		params.put("idCorso", "tortellini");
		params.put("numeroPartecipanti", "3");

		server.post("/api/attendants", params);
		assertEquals(
				"[{\"nome\":\"pippo\", \"email\":\"pippo@gmail.com\", \"idCorso\":\"tortellini\", \"numeroPartecipanti\":6}]",
				server.get("/api/attendants"));
	}
	
	@Test
	public void shouldMoveAttendants(){
		FittiziaServlet server = new FittiziaServlet(null);
		
		HashMap<String, String> params = new HashMap<String, String>();
		params.put("nome", "pippo");
		params.put("email", "pippo@gmail.com");
		params.put("idCorso", "tortellini");
		params.put("numeroPartecipanti", "9");

		server.post("/api/attendants", params);
		assertEquals(
				"[{\"nome\":\"pippo\", \"email\":\"pippo@gmail.com\", \"idCorso\":\"tortellini\", \"numeroPartecipanti\":9}]",
				server.get("/api/attendants"));
		
		params = new HashMap<String, String>();
		params.put("method", "move");
		params.put("nome", "pippo");
		params.put("email", "pippo@gmail.com");
		params.put("idCorsoDa", "tortellini");
		params.put("idCorsoA", "sommossa");
		params.put("numeroPartecipanti", "3");

		server.post("/api/attendants", params);
		assertEquals(
				"[{\"nome\":\"pippo\", \"email\":\"pippo@gmail.com\", \"idCorso\":\"tortellini\", \"numeroPartecipanti\":6},"
				+ "{\"nome\":\"pippo\", \"email\":\"pippo@gmail.com\", \"idCorso\":\"sommossa\", \"numeroPartecipanti\":3}]",
				server.get("/api/attendants"));	

	}

}
