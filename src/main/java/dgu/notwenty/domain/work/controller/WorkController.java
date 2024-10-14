package dgu.notwenty.domain.work.controller;

import dgu.notwenty.domain.work.dto.WorkDTO;
import dgu.notwenty.domain.work.dto.WorkDTO.Response.WorkStartResponse;
import dgu.notwenty.domain.work.dto.WorkDTO.Request.WorkStartRequest;
import dgu.notwenty.domain.work.service.WorkService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/api/work")
@Tag(name = "근무 관련 컨트롤러")
public class WorkController {
    private final WorkService workService;

    @Operation(
            summary = "출근하기",
            description = "사용자의 출근 시간을 기록합니다.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "출근 성공", content = @Content(schema = @Schema(implementation = WorkDTO.Response.class))),
                    @ApiResponse(responseCode = "400", description = "잘못된 요청", content = @Content(schema = @Schema(hidden = true))),
                    @ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없음", content = @Content(schema = @Schema(hidden = true)))
            }
    )
    @PostMapping("/start/{userId}")
    public ResponseEntity<WorkStartResponse> startWork(@PathVariable Long userId, @RequestBody WorkStartRequest workStartRequest) {
        return ResponseEntity.ok(workService.startWork(userId, workStartRequest));
    }
}
