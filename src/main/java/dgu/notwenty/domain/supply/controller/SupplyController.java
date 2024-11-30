package dgu.notwenty.domain.supply.controller;

import dgu.notwenty.domain.auth.service.AuthService;
import dgu.notwenty.domain.supply.dto.SupplyDTO.Request.SupplyRequest;
import dgu.notwenty.domain.supply.dto.SupplyDTO.Response.SupplyListResponse;
import dgu.notwenty.domain.supply.service.SupplyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/api/supply")
@Tag(name = "물품 정보 관련 컨트롤러")
public class SupplyController {

    private final AuthService authService;
    private final SupplyService supplyService;

    @Operation(summary = "물품 전달 정보 조회", description = "지원 물품 목록을 조회합니다. 복지사 계정의 경우 해당 복지사가 등록한 물품만 조회되며, 복지 대상자 계정의 경우 해당 복지 대상자가 수령한 물품만 조회됩니다.")
    @GetMapping("/get")
    public ResponseEntity<SupplyListResponse> getSupplyInfo(
            @RequestHeader("Authorization") String token) {

        Long userId = authService.getUserIdFromToken(token);
        if (userId == -1) throw new IllegalArgumentException("토큰 정보가 올바르지 않습니다.");

        return ResponseEntity.ok(supplyService.getSupplyInfo(userId));
    }

    @Operation(summary = "물품 전달 정보 생성", description = "물품 전달 정보를 생성합니다.")
    @PostMapping(value="/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> createSupplyInfo(
            @RequestHeader("Authorization") String token,
            @RequestPart("supplyRequest") SupplyRequest supplyRequest,
            @RequestPart("image") MultipartFile image) {

        Long userId = authService.getUserIdFromToken(token);
        if (userId == -1) throw new IllegalArgumentException("토큰 정보가 올바르지 않습니다.");

        return ResponseEntity.ok(supplyService.createSupplyInfo(userId, supplyRequest, image));
    }


}
