package dgu.notwenty.domain.work.service;

import dgu.notwenty.domain.user.entity.User;
import dgu.notwenty.domain.user.repository.UserRepository;
import dgu.notwenty.domain.work.converter.WorkConverter;
import dgu.notwenty.domain.work.dto.WorkDTO.Request.WorkEndRequest;
import dgu.notwenty.domain.work.dto.WorkDTO.Request.WorkStartRequest;
import dgu.notwenty.domain.work.entity.Work;
import dgu.notwenty.domain.work.repository.WorkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class WorkServiceImpl implements WorkService {

    private final WorkRepository workRepository;
    private final UserRepository userRepository;

    public String startWork(Long workerId, WorkStartRequest workStartRequest) {
        User worker = userRepository.findById(workerId)
                .orElseThrow(() -> new NoSuchElementException("해당 복지사를 찾을 수 없습니다."));

        Optional<Work> work = workRepository.findByWorkerIdAndDate(workerId, workStartRequest.getDate());
        if(work.isPresent()) {
            throw new IllegalArgumentException("이미 해당 날짜에 출근 등록을 하셨습니다.");
        }

        Work newWork = WorkConverter.toWork(worker, workStartRequest);
        workRepository.save(newWork);

        return "출근 처리되었습니다.";
    }

    public String endWork(Long workerId, WorkEndRequest workEndRequest) {
        User worker = userRepository.findById(workerId)
                .orElseThrow(() -> new NoSuchElementException("해당 복지사를 찾을 수 없습니다."));

        Work work = workRepository.findByWorkerIdAndDate(workerId, workEndRequest.getDate())
                .orElseThrow(() -> new NoSuchElementException("해당 날짜에 출근한 기록을 찾을 수 없습니다."));

        if(work.getEndTime() != null) throw new IllegalArgumentException("이미 해당 날짜에 퇴근 등록을 하셨습니다.");

        work.setEndTime(workEndRequest.getEndTime());
        work.setPausedTime(workEndRequest.getPausedTime());
        workRepository.save(work);

        return "퇴근 처리되었습니다.";
    }
}
