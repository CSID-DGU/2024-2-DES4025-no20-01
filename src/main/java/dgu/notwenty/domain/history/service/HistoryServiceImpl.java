package dgu.notwenty.domain.history.service;

import dgu.notwenty.domain.history.converter.HistoryConverter;
import dgu.notwenty.domain.history.dto.HistoryDTO.Request.ServiceHistoryRequest;
import dgu.notwenty.domain.history.dto.HistoryDTO.Request.ServiceResponseRequest;
import dgu.notwenty.domain.history.dto.HistoryDTO.Response.RecentHistoryListResponse;
import dgu.notwenty.domain.history.dto.HistoryDTO.Response.RecentHistoryResponse;
import dgu.notwenty.domain.history.dto.HistoryDTO.Response.ServiceHistoryListResponse;
import dgu.notwenty.domain.history.dto.HistoryDTO.Response.ServiceHistoryResponse;
import dgu.notwenty.domain.history.entity.History;
import dgu.notwenty.domain.history.repository.HistoryRepository;
import dgu.notwenty.domain.user.entity.User;
import dgu.notwenty.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Transactional
public class HistoryServiceImpl implements HistoryService {

    private final UserRepository userRepository;
    private final HistoryRepository historyRepository;

    public ServiceHistoryListResponse getServiceHistory(Long subjectId){

        User subject = userRepository.findById(subjectId)
                .orElseThrow(() -> new NoSuchElementException("해당 복지 대상자가 없습니다."));

        List<History> histories = historyRepository.findBySubjectId(subjectId);
        List<ServiceHistoryResponse> historyList = new ArrayList<>();

        for(History history : histories){
            historyList.add(HistoryConverter.toServiceHistoryResponse(history));
        }

        return HistoryConverter.toServiceHistoryListResponse(historyList);
    }

    public String createServiceHistory(Long workerId, ServiceHistoryRequest historyRequest){
        User worker = userRepository.findById(workerId)
                .orElseThrow(() -> new NoSuchElementException("해당 복지사가 없습니다."));

        User subject = userRepository.findById(historyRequest.getSubjectId())
                .orElseThrow(() -> new NoSuchElementException("해당 복지 대상자가 없습니다."));

        History newHistory = HistoryConverter.toHistory(worker, subject, historyRequest.getDate(), historyRequest.getContent());

        historyRepository.save(newHistory);

        return "서비스 내용이 생성되었습니다.";
    }

    public String setServiceResponse(Long subjectId, ServiceResponseRequest responseRequest){
        User subject = userRepository.findById(subjectId)
                .orElseThrow(() -> new NoSuchElementException("해당 복지 대상자가 없습니다."));

        History history = historyRepository.findById(responseRequest.getHistoryId())
                .orElseThrow(() -> new NoSuchElementException("해당 서비스 기록을 찾을 수 없습니다."));

        history.setResponse(responseRequest.getResponse());
        historyRepository.save(history);

        return "서비스 응답을 등록하였습니다.";
    }

    public RecentHistoryListResponse getRecentHistory(Long workerId){
        User worker = userRepository.findById(workerId)
                .orElseThrow(() -> new NoSuchElementException("해당 복지사가 없습니다."));

        List<History> histories = historyRepository.findByWorkerId(workerId);
        List<History> recentHistories = histories.size() > 10 ? histories.subList(0, 10) : histories;

        List<RecentHistoryResponse> recentHistoryList = new ArrayList<>();

        for(History recentHistory : recentHistories){
            recentHistoryList.add(HistoryConverter.toRecentHistoryResponse(recentHistory));
        }

        return HistoryConverter.toRecentHistoryListResponse(recentHistoryList);
    }
}
