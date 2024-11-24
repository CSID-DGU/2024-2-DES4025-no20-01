package dgu.notwenty.domain.user.repository;

import dgu.notwenty.domain.user.entity.Connect;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConnectRepository extends JpaRepository<Connect, Long> {
    List<Connect> findBySubjectId(Long subjectId);
    List<Connect> findByWorkerId(Long workerId);
    Optional<Connect> findBySubjectIdAndWorkerId(Long subjectId, Long workerId);
}
