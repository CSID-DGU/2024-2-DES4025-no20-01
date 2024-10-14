package dgu.notwenty.domain.work.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.time.LocalDateTime;

public class WorkDTO {
    public static class Request {

        @Builder
        @Getter
        @NoArgsConstructor(access = AccessLevel.PROTECTED)
        @AllArgsConstructor(access = AccessLevel.PROTECTED)
        public static class WorkInfoRequest {
            @Schema(description = "유저 직책", example = "WORKER")
            private String userPosition;

            @Schema(description = "위도", example = "37.5665")
            private Double latitude;

            @Schema(description = "경도", example = "126.9780")
            private Double longitude;

            @Schema(description = "근무 시작 시간", example = "2024-01-01T08:00:00")
            private LocalDateTime workStart;

            @Schema(description = "근무 종료 시간", example = "2024-01-01T17:00:00")
            private LocalDateTime workEnd;
        }
    }

    public static class Response {

        @Builder
        @Getter
        @NoArgsConstructor(access = AccessLevel.PROTECTED)
        @AllArgsConstructor(access = AccessLevel.PROTECTED)
        public static class WorkInfoResponse {
            @Schema(description = "응답 코드", example = "200")
            private int code;

            @Schema(description = "응답 결과", example = "SUCCESS")
            private String result;

            @Schema(description = "메시지", example = "근무지 정보 설정에 성공하였습니다.")
            private String message;

            @Schema(description = "추가 데이터")
            private Object data;
        }
    }
}
