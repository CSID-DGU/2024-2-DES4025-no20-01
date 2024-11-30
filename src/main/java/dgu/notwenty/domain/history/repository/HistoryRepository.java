package dgu.notwenty.domain.history.repository;

import dgu.notwenty.domain.history.entity.History;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface HistoryRepository extends JpaRepository<History, Long> {

    @Query("SELECT h FROM History h WHERE h.subject.id = :subjectId ORDER BY h.date DESC")
    List<History> findBySubjectId(Long subjectId);  // 최신순

    @Query("SELECT h FROM History h WHERE h.worker.id = :workerId ORDER BY h.date DESC")
    List<History> findByWorkerId(Long workerId);  // 최신순
}
