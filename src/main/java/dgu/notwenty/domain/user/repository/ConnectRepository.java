package dgu.notwenty.domain.user.repository;

import dgu.notwenty.domain.user.entity.Connect;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConnectRepositoy extends JpaRepository<Connect, Long> {
    List<Connect> findBySubjectId(Long subjectId);
}
