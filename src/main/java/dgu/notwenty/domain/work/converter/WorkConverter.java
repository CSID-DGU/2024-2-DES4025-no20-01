package dgu.notwenty.domain.work.converter;

import dgu.notwenty.domain.user.entity.User;
import dgu.notwenty.domain.work.dto.WorkDTO.Response.WorkStartResponse;
import dgu.notwenty.domain.work.dto.WorkDTO.Request.WorkStartRequest;
import dgu.notwenty.domain.work.entity.Work;

public class WorkConverter {
    public static Work toWork(User user, WorkStartRequest request) {
        return Work.builder()
                .user(user)
                .startTime(request.getStartTime())
                .status(true) // 출근시 상태를 true로 설정
                .build();
    }

    public static WorkStartResponse toWorkStartResponse(Work work) {
        return WorkStartResponse.builder()
                .workId(work.getWorkId())
                .startTime(work.getStartTime())
                .userId(work.getUser().getId())
                .status(work.getStatus())
                .build();
    }
}
