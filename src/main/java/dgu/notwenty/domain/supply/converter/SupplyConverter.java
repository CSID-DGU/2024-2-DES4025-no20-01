package dgu.notwenty.domain.supply.converter;

import dgu.notwenty.domain.supply.dto.SupplyDTO.Request.SupplyRequest;
import dgu.notwenty.domain.supply.dto.SupplyDTO.Response.SupplyListResponse;
import dgu.notwenty.domain.supply.dto.SupplyDTO.Response.SupplyResponse;
import dgu.notwenty.domain.supply.entity.Supply;
import dgu.notwenty.domain.user.entity.User;

import java.time.LocalDate;
import java.util.List;

public class SupplyConverter {

    public static Supply toSupply(User worker, User subject, SupplyRequest supplyRequest, String imageUrl) {
        LocalDate uploadDate = supplyRequest.getDate();
        LocalDate expirationDate = uploadDate.plusMonths(1);

        return Supply.builder()
                .worker(worker)
                .subject(subject)
                .name(supplyRequest.getSupplyName())
                .quantity(supplyRequest.getQuantity())
                .quality(supplyRequest.getQuality())
                .imageUrl(imageUrl)
                .uploadDate(uploadDate)
                .expirationDate(expirationDate)
                .build();
    }

    public static SupplyListResponse toSupplyListResponse(List<SupplyResponse> supplyList){
        return SupplyListResponse.builder()
                .supplyList(supplyList)
                .build();
    }

    public static SupplyResponse toSupplyResponse(Supply supply) {
        return SupplyResponse.builder()
                .subjectName(supply.getSubject().getName())
                .supplyName(supply.getName())
                .imageUrl(supply.getImageUrl())
                .date(supply.getUploadDate())
                .quantity(supply.getQuantity())
                .quality(supply.getQuality())
                .build();
    }
}
