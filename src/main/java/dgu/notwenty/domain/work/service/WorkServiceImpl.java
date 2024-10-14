package dgu.notwenty.domain.work.service;

import dgu.notwenty.domain.user.entity.User;
import dgu.notwenty.domain.user.repository.UserRepository;
import dgu.notwenty.domain.work.converter.WorkConverter;
import dgu.notwenty.domain.work.dto.WorkDTO.Response.WorkStartResponse;
import dgu.notwenty.domain.work.dto.WorkDTO.Request.WorkStartRequest;
import dgu.notwenty.domain.work.entity.Work;
import dgu.notwenty.domain.work.repository.WorkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class WorkServiceImpl implements WorkService {

    private final WorkRepository workRepository;
    private final UserRepository userRepository;

    public WorkStartResponse startWork(Long userId, WorkStartRequest workStartRequest) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자를 찾을 수 없습니다."));

        Work work = WorkConverter.toWork(user, workStartRequest);
        workRepository.save(work);

        return  WorkConverter.toWorkStartResponse(work);
    }
}
