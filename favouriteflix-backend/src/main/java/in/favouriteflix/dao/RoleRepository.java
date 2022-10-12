package in.favouriteflix.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import in.favouriteflix.entities.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
	Optional<Role> findByName(String name);
}
