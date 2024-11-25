package dgu.notwenty.domain.out.dto;

import dgu.notwenty.domain.user.entity.Type;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public class OutDTO {

    public static class Request {

        @Builder
        @Getter
        @NoArgsConstructor(access = AccessLevel.PROTECTED)
        @AllArgsConstructor(access = AccessLevel.PROTECTED)
        public static class createOutInfoRequest {

            @Schema(description = "이탈 날짜", example = "2024-10-14")
            private LocalDate date;

            @Schema(description = "이탈 시작 시간", example = "08:00:00")
            private LocalTime outStartTime;

            @Schema(description = "이탈 종료 시간", example = "08:00:00")
            private LocalTime outEndTime;
        }

        @Builder
        @Getter
        @NoArgsConstructor(access = AccessLevel.PROTECTED)
        @AllArgsConstructor(access = AccessLevel.PROTECTED)
        public static class setOutReasonRequest {

            @Schema(description = "이탈 기록 ID", example = "1")
            private Long outId;

            @Schema(description = "이탈 사유", example = "...하느라 잠시 이탈했습니다.")
            private String reason;
        }

    }

    public static class Response {

        @Builder
        @Getter
        @NoArgsConstructor(access = AccessLevel.PROTECTED)
        @AllArgsConstructor(access = AccessLevel.PROTECTED)
        public static class outInfoListResponse {
            List<outInfoResponse> outInfoList;
        }

        @Builder
        @Getter
        @NoArgsConstructor(access = AccessLevel.PROTECTED)
        @AllArgsConstructor(access = AccessLevel.PROTECTED)
        public static class outInfoResponse {
            @Schema(description = "이탈 기록 ID", example = "1")
            private Long outId;

            @Schema(description = "이탈 날짜", example = "2024-10-14")
            private LocalDate date;

            @Schema(description = "이탈 시작 시간", example = "08:00:00")
            private LocalTime outStartTime;

            @Schema(description = "이탈 종료 시간", example = "08:00:00")
            private LocalTime outEndTime;
        }

    }
}
