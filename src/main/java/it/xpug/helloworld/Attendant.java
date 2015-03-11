package it.xpug.helloworld;

public class Attendant{
	private String nome;
	private String cognome;
	private String email;
	
	public Attendant(String nome, String cognome, String email) {
		super();
		this.nome = nome;
		this.cognome = cognome;
		this.email = email;
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

		return "{nome:\""+this.getNome()+"\", cognome:\""+this.getCognome()+
				"\", email:\""+this.getEmail()+"\"}";
	}
}