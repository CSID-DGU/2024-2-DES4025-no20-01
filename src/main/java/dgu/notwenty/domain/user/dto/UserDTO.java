package dgu.notwenty.domain.user.dto;

import dgu.notwenty.domain.user.entity.UserPosition;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.time.LocalDateTime;

public class UserDTO {

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
    public static class UserInfoResponse {
        @Schema(description = "유저 이름", example = "서하은")
        private String userName;

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