package dgu.notwenty.domain.history.controller;


import dgu.notwenty.domain.auth.service.AuthService;
import dgu.notwenty.domain.history.dto.HistoryDTO;
import dgu.notwenty.domain.history.dto.HistoryDTO.Request.ServiceHistoryRequest;
import dgu.notwenty.domain.history.dto.HistoryDTO.Request.ServiceResponseRequest;
import dgu.notwenty.domain.history.dto.HistoryDTO.Response.RecentHistoryListResponse;
import dgu.notwenty.domain.history.dto.HistoryDTO.Response.ServiceHistoryListResponse;
import dgu.notwenty.domain.history.service.HistoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/api/history")
@Tag(name = "서비스 기록 관련 컨트롤러")
public class HistoryController {

    private final AuthService authService;
    private final HistoryService historyService;

    @Operation(summary = "서비스 기록(내용) 조회", description = "복지대상자가 받은 서비스 기록을 조회합니다.")
    @GetMapping("/get/content")
    public ResponseEntity<ServiceHistoryListResponse> getServiceHistory(
            @RequestHeader("Authorization") String token) {

        Long userId = authService.getUserIdFromToken(token);
        if(userId == -1) throw new IllegalArgumentException("토큰 정보가 올바르지 않습니다.");

        return ResponseEntity.ok(historyService.getServiceHistory(userId));
    }

    @Operation(summary = "서비스 기록(내용) 생성", description = "복지사가 수행한 서비스 내용을 생성합니다.")
    @PostMapping("/create/content")
    public ResponseEntity<String> createServiceHistory(
            @RequestHeader("Authorization") String token,
            @RequestBody ServiceHistoryRequest historyRequest) {

        Long userId = authService.getUserIdFromToken(token);
        if(userId == -1) throw new IllegalArgumentException("토큰 정보가 올바르지 않습니다.");

        return ResponseEntity.ok(historyService.createServiceHistory(userId, historyRequest));
    }

    @Operation(summary = "서비스 응답 등록", description = "수행된 서비스에 대한 응답을 등록합니다.")
    @PatchMapping("/update/response")
    public ResponseEntity<String> setServiceResponse(
            @RequestHeader("Authorization") String token,
            @RequestBody ServiceResponseRequest responseRequest) {

        Long userId = authService.getUserIdFromToken(token);
        if(userId == -1) throw new IllegalArgumentException("토큰 정보가 올바르지 않습니다.");

        return ResponseEntity.ok(historyService.setServiceResponse(userId, responseRequest));
    }

    @Operation(summary = "이전 작성 내용 불러오기", description = "복지사가 최근에 작성한 서비스 내용 10개를 조회합니다.")
    @GetMapping("/get/recent")
    public ResponseEntity<RecentHistoryListResponse> getRecentHistory(
            @RequestHeader("Authorization") String token) {

        Long userId = authService.getUserIdFromToken(token);
        if(userId == -1) throw new IllegalArgumentException("토큰 정보가 올바르지 않습니다.");

        return ResponseEntity.ok(historyService.getRecentHistory(userId));
    }
}
