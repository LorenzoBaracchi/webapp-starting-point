package it.xpug.helloworld;

import static java.lang.String.format;
import it.xpug.toolkit.db.Database;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class FittiziaServlet extends HttpServlet {
	private Database database;
	private AttendantRecorder recorder;

	public FittiziaServlet(Database database) {
		this.database = database;
		this.recorder = new AttendantRecorder();
	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		response.setContentType("text/html");
		PrintWriter writer = response.getWriter();
		writer.write(get("/api/attendants"));
		writer.close();
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {

		HashMap<String, String> params = new HashMap<String, String>();
		params.put("nome", req.getParameter("nome"));
		params.put("cognome", req.getParameter("cognome"));
		params.put("email", req.getParameter("email"));
		params.put("idCorso", req.getParameter("idCorso"));
		
		params.put("numeroPartecipanti", req.getParameter("numeroPartecipanti"));

		post("/api/attendants", params);
		PrintWriter writer = resp.getWriter();
		writer.write("Iscrizione avvenuta con sucesso!");
		writer.close();
	}

	public String get(String url) {
		return recorder.getAttendantsAsJson();
	}

	void post(String url, HashMap<String, String> params) {
		
		
		Attendable attendant = getAttendant(params);
		recorder.addAddendants(attendant);
	}

	private Attendable getAttendant(HashMap<String, String> params) {
		String num = params.get("numeroPartecipanti");
		if(num==null){
			return new Attendant(params.get("nome"), params.get("cognome"), params.get("email"), params.get("idCorso"));
		}else{
			return new CompanyAttendant(params.get("nome"), params.get("email"), params.get("idCorso"), Integer.parseInt(num));
		}
	}
}
