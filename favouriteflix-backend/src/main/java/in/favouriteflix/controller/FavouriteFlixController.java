package in.favouriteflix.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import in.favouriteflix.entities.FavouriteFlix;
import in.favouriteflix.service.FavouriteFlixService;

@CrossOrigin(origins="http://localhost:3000", maxAge = 3600, exposedHeaders="Set-Cookie")
@RestController
@RequestMapping(value = "/api/favflix")
public class FavouriteFlixController {
	
	@Autowired
	private FavouriteFlixService favFlixService;

	@PreAuthorize("hasRole('USER')")
	@GetMapping(value = "getAllFavFlix")
	public List<FavouriteFlix> getAllFavFlix() {
		return favFlixService.getAllFavFlix();
	}
	
	@PreAuthorize("hasRole('USER')")
	@PostMapping(value = "addFavFlix")
	public ResponseEntity<String> addFavFlix(@RequestBody FavouriteFlix favouriteFlix) {
		FavouriteFlix favouriteFlix1 = favFlixService.addFavFlix(favouriteFlix);
		String imdbID = favouriteFlix1.getImdbID();
		return new ResponseEntity<>("Flix With IMDB ID :" + imdbID + " added successfully.", HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('USER')")
	@DeleteMapping("/deleteFavFlix/{imdbID}")
	public ResponseEntity<String> deleteFavFlix(@PathVariable String imdbID) {
		favFlixService.deleteFavFlix(imdbID);
		return new ResponseEntity<>("Flix With IMDB ID :" + imdbID + " deleted successfully.", HttpStatus.OK);
	}

}
