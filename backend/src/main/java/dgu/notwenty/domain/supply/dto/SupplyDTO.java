package dgu.notwenty.domain.supply.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

public class SupplyDTO {
    public static class Request {
        @Builder
        @Getter
        @NoArgsConstructor(access = AccessLevel.PROTECTED)
        @AllArgsConstructor(access = AccessLevel.PROTECTED)
        public static class SupplyRequest {
            @Schema(description = "복지 대상자 ID", example = "1")
            private Long subjectId;

            @Schema(description = "물품명", example = "쌀")
            private String supplyName;

            @Schema(description = "수량", example = "20kg 1포대")
            private String quantity;

            @Schema(description = "상태", example = "양호")
            private String quality;

            @Schema(description = "업로드 날짜", example = "2024-11-11")
            private LocalDate date;
        }
    }

    public static class Response {
        @Builder
        @Getter
        @NoArgsConstructor(access = AccessLevel.PROTECTED)
        @AllArgsConstructor(access = AccessLevel.PROTECTED)
        public static class SupplyListResponse {
            @Schema(description = "물품 목록", example = "물품 목록")
            private List<SupplyResponse> supplyList;
        }

        @Builder
        @Getter
        @NoArgsConstructor(access = AccessLevel.PROTECTED)
        @AllArgsConstructor(access = AccessLevel.PROTECTED)
        public static class SupplyResponse {
            @Schema(description = "복지 대상자 이름", example = "김이박")
            private String subjectName;

            @Schema(description = "복지 물품명", example = "쌀")
            private String supplyName;

            @Schema(description = "수량", example = "20kg 1포대")
            private String quantity;

            @Schema(description = "품질", example = "양호")
            private String quality;

            @Schema(description = "사진 url", example = "www.abc.com")
            private String imageUrl;

            @Schema(description = "등록 날짜", example = "2024-11-11")
            private LocalDate date;
        }

    }
}
