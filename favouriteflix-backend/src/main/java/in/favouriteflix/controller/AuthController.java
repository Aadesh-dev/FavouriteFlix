package in.favouriteflix.controller;

import java.util.HashSet;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.favouriteflix.dao.RoleRepository;
import in.favouriteflix.dao.UserRepository;
import in.favouriteflix.entities.Role;
import in.favouriteflix.entities.User;
import in.favouriteflix.jwt.JwtUtils;
import in.favouriteflix.payload.request.LoginDto;
import in.favouriteflix.payload.request.SignUpDto;
import in.favouriteflix.payload.response.MessageResponse;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600, exposedHeaders = "Set-Cookie")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpDto signUpRequest) {
		if (Boolean.TRUE.equals(userRepository.existsByUsername(signUpRequest.getUsername()))) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
		}

		if (Boolean.TRUE.equals(userRepository.existsByEmail(signUpRequest.getEmail()))) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
		}

		// Get role from DB. Don't create new Role object as it always creates new Role
		// row whenever new User is created.
		Role userRole = roleRepository.findByName("ROLE_USER")
				.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
		Set<Role> roles = new HashSet<>();
		roles.add(userRole);

		// Create new user's account
		User user = new User(signUpRequest.getUsername(), signUpRequest.getEmail(),
				encoder.encode(signUpRequest.getPassword()));
		user.setRoles(roles);
		user.setFlix(new HashSet<>());
		userRepository.save(user);
		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginDto loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsernameOrEmail(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);

		// Cookie approach
		ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(authentication);

		// Header approach
		// String jwt = jwtUtils.generateJwtToken(authentication);

		// In header approach, we were passing below user info and roles in JwtResponse
		// payload.
		// UserDetails userDetails =
		// (org.springframework.security.core.userdetails.User)
		// authentication.getPrincipal();
		// List<String> roles = userDetails.getAuthorities().stream().map(item ->
		// item.getAuthority())
		// .collect(Collectors.toList());
//		HttpHeaders httpHeaders = new HttpHeaders();
//		httpHeaders.add(HttpHeaders.SET_COOKIE, jwtCookie.toString());
//		httpHeaders.add(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, HttpHeaders.SET_COOKIE);

		return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
				.body(new MessageResponse("Signed in successfully!"));
	}

	@PostMapping("/signout")
	public ResponseEntity<?> signout() {
		ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
		return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString())
				.body(new MessageResponse("You've been signed out!"));
	}
}
