package dgu.notwenty.domain.history.service;

import dgu.notwenty.domain.history.dto.HistoryDTO.Request.ServiceHistoryRequest;
import dgu.notwenty.domain.history.dto.HistoryDTO.Request.ServiceResponseRequest;
import dgu.notwenty.domain.history.dto.HistoryDTO.Response.RecentHistoryListResponse;
import dgu.notwenty.domain.history.dto.HistoryDTO.Response.ServiceHistoryListResponse;

public interface HistoryService {
    ServiceHistoryListResponse getServiceHistory(Long subjectId);
    String createServiceHistory(Long workerId, ServiceHistoryRequest historyRequest);
    String setServiceResponse(Long subjectId, ServiceResponseRequest responseRequest);
    RecentHistoryListResponse getRecentHistory(Long workerId);
}
