package it.xpug.helloworld;

public class Attendant{
	private String nome;
	private String cognome;
	private String email;
	private String idCorso;
	
	public Attendant(String nome, String cognome, String email, String idCorso) {
		super();
		this.nome = nome;
		this.cognome = cognome;
		this.email = email;
		this.idCorso = idCorso;
	}

	public String getNome() {
		return nome;
	}

	public String getCognome() {
		return cognome;
	}

	public String getEmail() {
		return email;
	}
	
	@Override
	public String toString() {

		return "{\"nome\":\""+this.getNome()+"\", \"cognome\":\""+this.getCognome()+
				"\", \"email\":\""+this.getEmail()+"\", \"idCorso\":\""+this.idCorso+"\"}";
	}

	public String getIdCorso() {
		return idCorso;
	}
}