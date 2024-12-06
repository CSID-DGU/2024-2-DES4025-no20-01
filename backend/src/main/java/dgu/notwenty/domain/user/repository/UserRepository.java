package dgu.notwenty.domain.user.repository;

import dgu.notwenty.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findByName(String name);

    // subjectName을 포함하는 모든 복지대상자를 검색하기 위함
    @Query("SELECT u FROM User u WHERE u.name LIKE %:subjectName% AND u.type = 'SUBJECT'")
    List<User> findByNameContaining(@Param("subjectName") String subjectName);
}
