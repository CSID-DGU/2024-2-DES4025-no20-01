package dgu.notwenty.domain.out.repository;

import dgu.notwenty.domain.out.entity.Out;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OutRepository extends JpaRepository<Out, Long> {
    List<Out> findByWorkerId(Long workerId);
}
