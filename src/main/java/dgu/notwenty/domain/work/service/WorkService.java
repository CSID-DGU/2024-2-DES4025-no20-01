package dgu.notwenty.domain.work.service;

import dgu.notwenty.domain.work.dto.WorkDTO.Response.WorkStartResponse;
import dgu.notwenty.domain.work.dto.WorkDTO.Request.WorkStartRequest;

public interface WorkService {
    WorkStartResponse startWork(Long userId, WorkStartRequest workStartRequest);
}
