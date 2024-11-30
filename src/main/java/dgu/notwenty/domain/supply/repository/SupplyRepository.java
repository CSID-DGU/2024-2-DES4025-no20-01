package dgu.notwenty.domain.supply.repository;

import dgu.notwenty.domain.supply.entity.Supply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface SupplyRepository extends JpaRepository<Supply, Long> {
    List<Supply> findBySubjectId(Long subjectId);
    List<Supply> findByWorkerId(Long workerId);

    @Query("SELECT s FROM Supply s WHERE s.expirationDate < :currentDate")
    List<Supply> findExpiredSupplies(@Param("currentDate") LocalDate currentDate);
}
