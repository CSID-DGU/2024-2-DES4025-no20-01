package dgu.notwenty.domain.work.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

public class WorkDTO {
    public static class Request {
        @Getter
        @Builder
        @NoArgsConstructor(access = AccessLevel.PROTECTED)
        @AllArgsConstructor(access = AccessLevel.PROTECTED)
        public static class WorkStartRequest {
            @Schema(description = "출근 날짜", example = "2024-10-14")
            private LocalDate date;

            @Schema(description = "출근 시간", example = "08:00:00")
            private LocalTime startTime;
        }

        @Getter
        @Builder
        @NoArgsConstructor(access = AccessLevel.PROTECTED)
        @AllArgsConstructor(access = AccessLevel.PROTECTED)
        public static class WorkEndRequest {
            @Schema(description = "퇴근 날짜", example = "2024-10-14")
            private LocalDate date;

            @Schema(description = "퇴근 시간", example = "08:00:00")
            private LocalTime endTime;

            @Schema(description = "총 일시 정지 시간", example = "08:00:00")
            private Long pausedTime;
        }
    }

    public static class Response {

    }
}
