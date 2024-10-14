package dgu.notwenty.domain.user.dto;

import dgu.notwenty.domain.user.entity.UserPosition;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.time.LocalTime;

public class UserDTO {

    public static class Request {
        @Builder
        @Getter
        @NoArgsConstructor(access = AccessLevel.PROTECTED)
        @AllArgsConstructor(access = AccessLevel.PROTECTED)
        public static class UserPositionRequest {
            @Schema(description = "유저 직책", example = "WORKER")
            private UserPosition userPosition;
        }

        @Builder
        @Getter
        @NoArgsConstructor(access = AccessLevel.PROTECTED)
        @AllArgsConstructor(access = AccessLevel.PROTECTED)
        public static class WorkInfoRequest {
            @Schema(description = "위도", example = "37.5665")
            private Double latitude;

            @Schema(description = "경도", example = "126.9780")
            private Double longitude;

            @Schema(description = "근무 시작 시간", example = "2024-01-01T08:00:00")
            private LocalTime workStart;

            @Schema(description = "근무 종료 시간", example = "2024-01-01T17:00:00")
            private LocalTime workEnd;
        }

        @Builder
        @Getter
        @NoArgsConstructor(access = AccessLevel.PROTECTED)
        @AllArgsConstructor(access = AccessLevel.PROTECTED)
        public static class UserCreateRequest {
            @Schema(description = "유저 이름", example = "홍길동")
            private String userName;

            @Schema(description = "OAuth ID", example = "12345abcde")
            private String oauthId;
        }
    }

    public static class Response {
        @Builder
        @Getter
        @NoArgsConstructor(access = AccessLevel.PROTECTED)
        @AllArgsConstructor(access = AccessLevel.PROTECTED)
        public static class UserInfoResponse {
            @Schema(description = "유저 이름", example = "서하은")
            private String userName;

            @Schema(description = "유저 직책", example = "WORKER")
            private UserPosition userPosition;

            @Schema(description = "위도", example = "37.5665")
            private Double latitude;

            @Schema(description = "경도", example = "126.9780")
            private Double longitude;

            @Schema(description = "근무 시작 시간", example = "2024-01-01T08:00:00")
            private LocalTime workStart;

            @Schema(description = "근무 종료 시간", example = "2024-01-01T17:00:00")
            private LocalTime workEnd;
        }

        @Builder
        @Getter
        @NoArgsConstructor(access = AccessLevel.PROTECTED)
        @AllArgsConstructor(access = AccessLevel.PROTECTED)
        public static class UserCreateResponse {
            @Schema(description = "생성된 유저 ID", example = "1")
            private Long userId;

            @Schema(description = "유저 이름", example = "홍길동")
            private String userName;
        }
    }
}