package dgu.notwenty.domain.out.repository;

import dgu.notwenty.domain.out.entity.Outlog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OutRepository extends JpaRepository<Outlog, Long> {
    List<Outlog> findByWorkerId(Long workerId);
}
