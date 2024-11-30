package dgu.notwenty.domain.history.converter;

import dgu.notwenty.domain.history.dto.HistoryDTO;
import dgu.notwenty.domain.history.dto.HistoryDTO.Response.RecentHistoryListResponse;
import dgu.notwenty.domain.history.dto.HistoryDTO.Response.RecentHistoryResponse;
import dgu.notwenty.domain.history.dto.HistoryDTO.Response.ServiceHistoryListResponse;
import dgu.notwenty.domain.history.dto.HistoryDTO.Response.ServiceHistoryResponse;
import dgu.notwenty.domain.history.entity.History;
import dgu.notwenty.domain.user.entity.User;

import java.time.LocalDate;
import java.util.List;

public class HistoryConverter {

    public static History toHistory(User worker, User subject, LocalDate date, String content) {
        return History.builder()
                .worker(worker)
                .subject(subject)
                .date(date)
                .content(content)
                .response(null) // 초기 미응답은 null
                .build();
    }

    public static ServiceHistoryListResponse toServiceHistoryListResponse(List<ServiceHistoryResponse> historyList){
        return ServiceHistoryListResponse.builder()
                .serviceHistoryList(historyList)
                .build();
    }

    public static ServiceHistoryResponse toServiceHistoryResponse(History history) {
        return ServiceHistoryResponse.builder()
                .historyId(history.getId())
                .date(history.getDate())
                .content(history.getContent())
                .response(history.getResponse())
                .build();
    }

    public static RecentHistoryListResponse toRecentHistoryListResponse(List<RecentHistoryResponse> historyList){
        return RecentHistoryListResponse.builder()
                .recentHistoryList(historyList)
                .build();
    }

    public static RecentHistoryResponse toRecentHistoryResponse(History history) {
        return RecentHistoryResponse.builder()
                .historyId(history.getId())
                .date(history.getDate())
                .content(history.getContent())
                .build();
    }

}

