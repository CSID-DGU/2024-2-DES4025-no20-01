package dgu.notwenty.domain.supply.scheduler;

import dgu.notwenty.domain.supply.entity.Supply;
import dgu.notwenty.domain.supply.repository.SupplyRepository;
import dgu.notwenty.global.s3.S3ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
public class SupplyCleanupScheduler {

    private SupplyRepository supplyRepository;
    private S3ImageService s3ImageService;

    @Scheduled(cron = "0 0 0 * * ?") // 매일 자정에 실행
    public void deleteExpiredSupplies() {
        List<Supply> expiredSupplies = supplyRepository.findExpiredSupplies(LocalDate.now());

        for (Supply expiredSupply : expiredSupplies) {
            s3ImageService.deleteImageFromS3(expiredSupply.getImageUrl());
            supplyRepository.delete(expiredSupply);
        }
    }
}


