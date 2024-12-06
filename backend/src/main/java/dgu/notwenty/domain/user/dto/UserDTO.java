package dgu.notwenty.domain.user.dto;

import dgu.notwenty.domain.user.entity.Type;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.util.List;

public class UserDTO {

    public static class Request {
        @Builder
        @Getter
        @NoArgsConstructor(access = AccessLevel.PROTECTED)
        @AllArgsConstructor(access = AccessLevel.PROTECTED)
        public static class SetUserTypeRequest {
            @Schema(description = "유저 유형", example = "WORKER")
            private Type type;
        }

        @Builder
        @Getter
        @NoArgsConstructor(access = AccessLevel.PROTECTED)
        @AllArgsConstructor(access = AccessLevel.PROTECTED)
        public static class ConnectSubjectRequest {
            @Schema(description = "복지 대상자 ID", example = "1")
            private Long subjectId;
        }

        @Builder
        @Getter
        @NoArgsConstructor(access = AccessLevel.PROTECTED)
        @AllArgsConstructor(access = AccessLevel.PROTECTED)
        public static class SetLocationRequest {
            @Schema(description = "복지 대상자의 위도", example = "37.5665")
            private Double latitude;

            @Schema(description = "복지 대상자의 경도", example = "37.5665")
            private Double longitude;
        }
    }

    public static class Response {
        @Builder
        @Getter
        @NoArgsConstructor(access = AccessLevel.PROTECTED)
        @AllArgsConstructor(access = AccessLevel.PROTECTED)
        public static class UserInfoResponse {
            @Schema(description = "유저 이름", example = "서하은")
            private String name;

            @Schema(description = "유저 이메일", example = "ee@ee.com")
            private String email;

            @Schema(description = "유저 프로필 이미지 url", example = "ee@ee.com")
            private String imageUrl;

            @Schema(description = "유저 유형", example = "WORKER")
            private Type type;

            @Schema(description = "위도", example = "37.5665")
            private Double latitude;

            @Schema(description = "경도", example = "126.9780")
            private Double longitude;

            @Schema(description = "총 근무 시간 (초)", example = "360000")
            private Long totalTime;
        }

        @Builder
        @Getter
        @NoArgsConstructor(access = AccessLevel.PROTECTED)
        @AllArgsConstructor(access = AccessLevel.PROTECTED)
        public static class SubjectInfoListResponse {

            @Schema(description = "복지 대상자 목록", example = "1")
            private List<SubjectInfoResponse> subjectInfoList;
        }

        @Builder
        @Getter
        @NoArgsConstructor(access = AccessLevel.PROTECTED)
        @AllArgsConstructor(access = AccessLevel.PROTECTED)
        public static class SubjectInfoResponse {

            @Schema(description = "복지 대상자 ID", example = "1")
            private Long subjectId;

            @Schema(description = "이름", example = "서하은")
            private String name;

            @Schema(description = "이메일", example = "ee@ee.com")
            private String email;

            @Schema(description = "프로필 이미지 url", example = "http://k.kakaocdn.net")
            private String imageUrl;

        }
    }
}