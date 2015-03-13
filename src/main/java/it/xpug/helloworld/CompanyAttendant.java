package it.xpug.helloworld;

public class CompanyAttendant implements Attendable {
	
	private String nome;
	private String email;
	private String idCorso;
	private int numeroPartecipanti;
	
	public CompanyAttendant(String nome, String email, String idCorso, int numeroPartecipanti) {
		this.nome = nome;
		this.email = email;
		this.idCorso = idCorso;
		this.numeroPartecipanti = numeroPartecipanti;
	}

	public String getNome() {
		return nome;
	}


	public String getEmail() {
		return email;
	}
	
	public String getIdCorso() {
		return idCorso;
	}
	
	@Override
	public String toString() {

		return "{\"nome\":\""+this.getNome()+"\", \"email\":\""+this.getEmail()+"\", \"idCorso\":\""+this.idCorso+"\", \"numeroPartecipanti\":"+this.numeroPartecipanti+"}";
	}


	public int getNumeroPartecipanti() {
		return numeroPartecipanti;
	}

	public void removePartecipants(int numberToRemove) {
		this.numeroPartecipanti -= numberToRemove;
	}

}
