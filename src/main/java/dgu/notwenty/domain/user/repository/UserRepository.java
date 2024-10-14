package dgu.notwenty.domain.user.repository;

import dgu.notwenty.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}
