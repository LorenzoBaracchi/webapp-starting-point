package it.xpug.helloworld;

import it.xpug.toolkit.db.Database;

import java.io.IOException;
import java.io.PrintWriter;
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
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		response.setContentType("text/html");
		PrintWriter writer = response.getWriter();
		writer.write(get("/api/attendants"));
		writer.close();
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {

		HashMap<String, String> params = parseParameters(req);

		boolean success = post("/api/attendants", params);
		PrintWriter writer = resp.getWriter();
		if(success)
			writer.write("Iscrizione avvenuta con sucesso!");
		else
			writer.write("Iscrizione fallita");
		writer.close();
	}
	
	private HashMap<String, String> parseParameters(HttpServletRequest req){
		HashMap<String, String> params = new HashMap<String, String>();
		params.put("method", req.getParameter("method"));

		params.put("nome", req.getParameter("nome"));
		params.put("cognome", req.getParameter("cognome"));
		params.put("email", req.getParameter("email"));
		params.put("idCorso", req.getParameter("idCorso"));
		params.put("idCorsoDa", req.getParameter("idCorsoDa"));
		params.put("idCorsoA", req.getParameter("idCorsoA"));

		params.put("numeroPartecipanti", req.getParameter("numeroPartecipanti"));
		return params;
	}

	public String get(String url) {
		return recorder.getAttendantsAsJson();
	}

	boolean post(String url, HashMap<String, String> params) {

		if (isMoveRequest(params)) {
			int toMove = Integer.parseInt(params.get("numeroPartecipanti"));
			try {
				recorder.removeAttendants(params.get("nome"), params.get("idCorsoDa"), toMove);
			} catch (AttendantException e) {
				e.printStackTrace();
				return false;
			}
			CompanyAttendant attendant = new CompanyAttendant(params.get("nome"), params.get("email"), params.get("idCorsoA"), toMove);
			recorder.addAddendants(attendant);
		}else if (isRemoveRequest(params)) {
			int toRemove = Integer.parseInt(params.get("numeroPartecipanti"));
			try {
				recorder.removeAttendants(params.get("nome"),
						params.get("idCorso"), toRemove);
			} catch (AttendantException e) {
				e.printStackTrace();
				return false;
			}
		} else {
			Attendable attendant = getAttendant(params);
			recorder.addAddendants(attendant);
		}
		return true;
	}

	private boolean isRemoveRequest(HashMap<String, String> params) {
		return params.get("method") != null
				&& params.get("method").equals("remove");
	}
	
	private boolean isMoveRequest(HashMap<String, String> params) {
		return params.get("method") != null
				&& params.get("method").equals("move");
	}

	private Attendable getAttendant(HashMap<String, String> params) {
		String num = params.get("numeroPartecipanti");
		if (num == null) {
			return new Attendant(params.get("nome"), params.get("cognome"),
					params.get("email"), params.get("idCorso"));
		} else {
			return new CompanyAttendant(params.get("nome"),
					params.get("email"), params.get("idCorso"),
					Integer.parseInt(num));
		}
	}
}
