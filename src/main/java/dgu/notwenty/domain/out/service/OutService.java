package dgu.notwenty.domain.out.service;

import dgu.notwenty.domain.out.dto.OutDTO.Request.createOutInfoRequest;
import dgu.notwenty.domain.out.dto.OutDTO.Request.setOutReasonRequest;
import dgu.notwenty.domain.out.dto.OutDTO.Response.outInfoListResponse;

public interface OutService {
    outInfoListResponse getOutInfo(Long workerId);
    String createOutInfo(Long workerId, createOutInfoRequest request);
    String setOutReason(Long workerId, setOutReasonRequest request);
}
