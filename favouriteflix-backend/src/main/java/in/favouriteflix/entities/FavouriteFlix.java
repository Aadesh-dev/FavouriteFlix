package in.favouriteflix.entities;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
public class FavouriteFlix {

	@Id
	private String imdbID;
	
	@JsonProperty("Title")
	private String title;

	@JsonProperty("Year")
	private String year;

	@JsonProperty("Type")
	private String type;

	@JsonProperty("Poster")
	private String poster;
	
	@JsonIgnore
	@ManyToMany(mappedBy="flix", fetch=FetchType.EAGER)
	private Set<User> users;

	public FavouriteFlix() {
		super();
	}

	public FavouriteFlix(String imdbID, String title, String year, String type, String poster, Set<User> users) {
		super();
		this.imdbID = imdbID;
		this.title = title;
		this.year = year;
		this.type = type;
		this.poster = poster;
		this.users = users;
	}

	public String getImdbID() {
		return imdbID;
	}

	public void setImdbID(String imdbID) {
		this.imdbID = imdbID;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getPoster() {
		return poster;
	}

	public void setPoster(String poster) {
		this.poster = poster;
	}

	public Set<User> getUsers() {
		return users;
	}

	public void setUsers(Set<User> users) {
		this.users = users;
	}

}
