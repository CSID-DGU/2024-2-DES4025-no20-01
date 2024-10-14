package dgu.notwenty.domain.work.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.time.LocalDateTime;

public class WorkDTO {
    public static class Request {
        @Getter
        @Builder
        @NoArgsConstructor(access = AccessLevel.PROTECTED)
        @AllArgsConstructor(access = AccessLevel.PROTECTED)
        public static class WorkStartRequest {
            @Schema(description = "출근 시간", example = "2024-10-14T08:00:00")
            private LocalDateTime startTime;
        }
    }

    public static class Response {
        @Getter
        @Builder
        @NoArgsConstructor(access = AccessLevel.PROTECTED)
        @AllArgsConstructor(access = AccessLevel.PROTECTED)
        public static class WorkStartResponse {
            @Schema(description = "근무 ID", example = "1")
            private Long workId;

            @Schema(description = "출근 시간", example = "2024-10-14T08:00:00")
            private LocalDateTime startTime;

            @Schema(description = "유저 ID", example = "1")
            private Long userId;

            @Schema(description = "근무 상태", example = "true")
            private boolean status;
        }
    }
}
