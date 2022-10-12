package in.favouriteflix.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import in.favouriteflix.dao.FavouriteFlixRepository;
import in.favouriteflix.dao.UserRepository;
import in.favouriteflix.entities.FavouriteFlix;
import in.favouriteflix.entities.User;

@Service
public class FavouriteFlixServiceImpl implements FavouriteFlixService {

	@Autowired
	private FavouriteFlixRepository favFlixRepo;

	@Autowired
	UserRepository userRepository;

	public List<FavouriteFlix> getAllFavFlix() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		UserDetails userDetails = (org.springframework.security.core.userdetails.User) authentication.getPrincipal();
		String username = userDetails.getUsername();
		User currentLoggedInUser = userRepository.findByUsername(username).get();
		return new ArrayList<FavouriteFlix>(currentLoggedInUser.getFlix());
	}

	public FavouriteFlix addFavFlix(FavouriteFlix favouriteFlix) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		UserDetails userDetails = (org.springframework.security.core.userdetails.User) authentication.getPrincipal();
		String username = userDetails.getUsername();
		User currentLoggedInUser = userRepository.findByUsername(username).get();
		favouriteFlix.setUsers(new HashSet<>());
		currentLoggedInUser.addFlix(favouriteFlix);
		userRepository.save(currentLoggedInUser);
		return favouriteFlix;
		//return favFlixRepo.save(favouriteFlix);
	}

	public void deleteFavFlix(String imdbID) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		UserDetails userDetails = (org.springframework.security.core.userdetails.User) authentication.getPrincipal();
		String username = userDetails.getUsername();
		User currentLoggedInUser = userRepository.findByUsername(username).get();
		FavouriteFlix currentFlix = favFlixRepo.findById(imdbID).get();
		currentLoggedInUser.removeFlix(currentFlix);
		userRepository.save(currentLoggedInUser);		
		Set<User> usersHavingCurrentFlix = currentFlix.getUsers();
		if(usersHavingCurrentFlix.isEmpty()) {
			favFlixRepo.deleteById(imdbID);
		}
	}
}
