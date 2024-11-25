package dgu.notwenty.domain.out.controller;

import dgu.notwenty.domain.auth.service.AuthService;
import dgu.notwenty.domain.out.dto.OutDTO.Request.createOutInfoRequest;
import dgu.notwenty.domain.out.dto.OutDTO.Request.setOutReasonRequest;
import dgu.notwenty.domain.out.dto.OutDTO.Response.outInfoListResponse;
import dgu.notwenty.domain.out.service.OutService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/api/out")
@Tag(name = "이탈 관련 컨트롤러")
public class OutController {

    private final AuthService authService;
    private final OutService outService;

    @Operation(summary = "이탈 기록 조회", description = "복지사 본인의 이탈 기록을 조회합니다.")
    @GetMapping("/get/record")
    public ResponseEntity<outInfoListResponse> getOutInfo(
            @RequestHeader("Authorization") String token) {

        Long userId = authService.getUserIdFromToken(token);
        if(userId == -1) throw new IllegalArgumentException("토큰 정보가 올바르지 않습니다.");

        return ResponseEntity.ok(outService.getOutInfo(userId));
    }

    @Operation(summary = "이탈 기록 생성", description = "새 이탈 기록을 생성합니다.")
    @PostMapping("/create/record")
    public ResponseEntity<String> createOutInfo(
            @RequestHeader("Authorization") String token,
            @RequestBody createOutInfoRequest request) {

        Long userId = authService.getUserIdFromToken(token);
        if(userId == -1) throw new IllegalArgumentException("토큰 정보가 올바르지 않습니다.");

        return ResponseEntity.ok(outService.createOutInfo(userId, request));
    }

    @Operation(summary = "이탈 사유 등록", description = "이탈 사유를 등록합니다.")
    @PostMapping("/update/reason")
    public ResponseEntity<String> setOutReason(
            @RequestHeader("Authorization") String token,
            @RequestBody setOutReasonRequest request) {

        Long userId = authService.getUserIdFromToken(token);
        if(userId == -1) throw new IllegalArgumentException("토큰 정보가 올바르지 않습니다.");

        return ResponseEntity.ok(outService.setOutReason(userId, request));
    }

}
