package dgu.notwenty.domain.history.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

public class HistoryDTO {
    public static class Request {
        @Builder
        @Getter
        @NoArgsConstructor(access = AccessLevel.PROTECTED)
        @AllArgsConstructor(access = AccessLevel.PROTECTED)
        public static class ServiceHistoryRequest {
            @Schema(description = "복지 대상자 ID", example = "1")
            private Long subjectId;

            @Schema(description = "날짜", example = "2024-11-11")
            private LocalDate date;

            @Schema(description = "서비스 내용", example = "~~를 수행했습니다.")
            private String content;
        }

        @Builder
        @Getter
        @NoArgsConstructor(access = AccessLevel.PROTECTED)
        @AllArgsConstructor(access = AccessLevel.PROTECTED)
        public static class ServiceResponseRequest {
            @Schema(description = "서비스 기록 ID", example = "1")
            private Long historyId;

            @Schema(description = "서비스 내용에 대한 복지대상자의 응답", example = "true")
            private Boolean response;
        }
    }

    public static class Response {
        @Builder
        @Getter
        @NoArgsConstructor(access = AccessLevel.PROTECTED)
        @AllArgsConstructor(access = AccessLevel.PROTECTED)
        public static class ServiceHistoryResponse {
            @Schema(description = "기록 ID", example = "1")
            private Long historyId;

            @Schema(description = "날짜", example = "2024-11-11")
            private LocalDate date;

            @Schema(description = "서비스 내용", example = "~~를 수행했습니다.")
            private String content;

            @Schema(description = "복지대상자의 내용 확인 여부", example = "true")
            private Boolean response;
        }

        @Builder
        @Getter
        @NoArgsConstructor(access = AccessLevel.PROTECTED)
        @AllArgsConstructor(access = AccessLevel.PROTECTED)
        public static class ServiceHistoryListResponse {
            @Schema(description = "서비스 기록", example = "서비스 기록")
            private List<ServiceHistoryResponse> serviceHistoryList;
        }

        @Builder
        @Getter
        @NoArgsConstructor(access = AccessLevel.PROTECTED)
        @AllArgsConstructor(access = AccessLevel.PROTECTED)
        public static class RecentHistoryResponse {
            @Schema(description = "기록 ID", example = "1")
            private Long historyId;

            @Schema(description = "날짜", example = "2024-11-11")
            private LocalDate date;

            @Schema(description = "서비스 내용", example = "~~를 수행했습니다.")
            private String content;
        }

        @Builder
        @Getter
        @NoArgsConstructor(access = AccessLevel.PROTECTED)
        @AllArgsConstructor(access = AccessLevel.PROTECTED)
        public static class RecentHistoryListResponse {
            @Schema(description = "최신 기록", example = "최신 기록")
            private List<RecentHistoryResponse> recentHistoryList;
        }
    }
}
