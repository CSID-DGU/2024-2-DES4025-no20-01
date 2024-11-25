package dgu.notwenty.domain.work.service;

import dgu.notwenty.domain.work.dto.WorkDTO;
import dgu.notwenty.domain.work.dto.WorkDTO.Request.WorkEndRequest;
import dgu.notwenty.domain.work.dto.WorkDTO.Request.WorkStartRequest;

public interface WorkService {
    String startWork(Long workerId, WorkStartRequest workStartRequest);
    String endWork(Long workerId, WorkEndRequest workEndRequest);
}
