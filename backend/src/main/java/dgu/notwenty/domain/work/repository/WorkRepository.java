package dgu.notwenty.domain.work.repository;

import dgu.notwenty.domain.work.entity.Work;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface WorkRepository extends JpaRepository<Work, Long> {
    // 복지사의 해당 날짜 근무 기록을 조회
    @Query("SELECT w FROM Work w WHERE w.worker.id = :workerId AND w.date = :date")
    Optional<Work> findByWorkerIdAndDate(@Param("workerId") Long workerId, @Param("date") LocalDate date);
}
