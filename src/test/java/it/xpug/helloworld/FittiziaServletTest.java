package it.xpug.helloworld;

import static org.junit.Assert.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.security.Principal;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.ServletInputStream;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.collections.map.HashedMap;
import org.junit.Test;
import org.openqa.selenium.remote.http.HttpRequest;

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

}
