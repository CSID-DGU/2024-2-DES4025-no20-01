package dgu.notwenty.domain.supply.service;

import dgu.notwenty.domain.supply.dto.SupplyDTO.Request.SupplyRequest;
import dgu.notwenty.domain.supply.dto.SupplyDTO.Response.SupplyListResponse;
import org.springframework.web.multipart.MultipartFile;

public interface SupplyService {
    SupplyListResponse getSupplyInfo(Long userId);
    String createSupplyInfo(Long workerId, SupplyRequest supplyRequest, MultipartFile image);
}
