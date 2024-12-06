package dgu.notwenty.domain.work.converter;

import dgu.notwenty.domain.user.entity.User;
import dgu.notwenty.domain.work.dto.WorkDTO.Request.WorkStartRequest;
import dgu.notwenty.domain.work.entity.Work;

public class WorkConverter {
    public static Work toWork(User worker, WorkStartRequest request) {
        return Work.builder()
                .worker(worker)
                .date(request.getDate())
                .startTime(request.getStartTime())
                .endTime(null)
                .pausedTime(null)
                .build();
    }
}
