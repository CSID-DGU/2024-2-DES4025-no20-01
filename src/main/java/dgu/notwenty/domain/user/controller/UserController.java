package dgu.notwenty.domain.user.controller;

import dgu.notwenty.domain.auth.service.AuthService;
import dgu.notwenty.domain.user.dto.UserDTO;
import dgu.notwenty.domain.user.dto.UserDTO.Request.ConnectSubjectRequest;
import dgu.notwenty.domain.user.dto.UserDTO.Request.SetLocationRequest;
import dgu.notwenty.domain.user.dto.UserDTO.Request.SetUserTypeRequest;
import dgu.notwenty.domain.user.dto.UserDTO.Response.UserInfoResponse;
import dgu.notwenty.domain.user.service.UserService;
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
@RequestMapping("/api/user")
@Tag(name = "유저 관련 컨트롤러")
public class UserController {

    private final UserService userService;
    private final AuthService authService;

    @Operation(
            summary = "이용자 유형 설정",
            description = "이용자 유형을 설정합니다.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "직책 설정 성공"),
                    @ApiResponse(responseCode = "400", description = "잘못된 요청", content = @Content(schema = @Schema(hidden = true))),
                    @ApiResponse(responseCode = "404", description = "유저를 찾을 수 없음", content = @Content(schema = @Schema(hidden = true)))
            }
    )
    @PatchMapping("/update/type")
    public ResponseEntity<String> setUserType(
            @RequestHeader("Authorization") String token,
            @RequestBody SetUserTypeRequest request) {

        Long userId = authService.getUserIdFromToken(token);
        if(userId == -1) throw new IllegalArgumentException("토큰 정보가 올바르지 않습니다.");

        return ResponseEntity.ok(userService.setUserType(userId, request));
    }

    @Operation(
            summary = "유저 정보 조회",
            description = "유저의 정보를 조회합니다.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "유저 정보 조회 성공", content = @Content(schema = @Schema(implementation = UserInfoResponse.class))),
                    @ApiResponse(responseCode = "404", description = "유저를 찾을 수 없음", content = @Content(schema = @Schema(hidden = true)))
            }
    )
    @GetMapping("/get/userInfo")
    public ResponseEntity<UserInfoResponse> getUserInfo(
            @RequestHeader("Authorization") String token) {

        Long userId = authService.getUserIdFromToken(token);
        if(userId == -1) throw new IllegalArgumentException("토큰 정보가 올바르지 않습니다.");

        return ResponseEntity.ok(userService.getUserInfo(userId));
    }

    @Operation(summary = "복지 대상자 검색", description = "복지 대상자를 검색합니다.")
    @GetMapping("/search/{name}")
    public ResponseEntity<UserDTO.Response.SubjectInfoListResponse> searchSubjectInfo(
            @RequestHeader("Authorization") String token,
            @PathVariable String name) {

        Long userId = authService.getUserIdFromToken(token);
        if(userId == -1) throw new IllegalArgumentException("토큰 정보가 올바르지 않습니다.");

        return ResponseEntity.ok(userService.searchSubjectInfo(name));
    }

    @Operation(summary = "연결된 복지 대상자 조회", description = "연결된 복지 대상자들을 조회합니다.")
    @GetMapping("/get/subjectInfo")
    public ResponseEntity<UserDTO.Response.SubjectInfoListResponse> getConnectedSubjectInfo(
            @RequestHeader("Authorization") String token) {

        Long userId = authService.getUserIdFromToken(token);
        if(userId == -1) throw new IllegalArgumentException("토큰 정보가 올바르지 않습니다.");

        return ResponseEntity.ok(userService.getConnectedSubjectInfo(userId));
    }

    @Operation(summary = "복지 대상자 연결", description = "복지사 자신과 복지 대상자를 연결합니다.")
    @PatchMapping("/user/connect")
    public ResponseEntity<String> connectSubject(
            @RequestHeader("Authorization") String token,
            @RequestBody ConnectSubjectRequest request) {

        Long userId = authService.getUserIdFromToken(token);
        if(userId == -1) throw new IllegalArgumentException("토큰 정보가 올바르지 않습니다.");

        return ResponseEntity.ok(userService.connectSubject(userId, request));
    }

    @Operation(summary = "복지 대상자 연결 해제", description = "복지사 자신과 복지 대상자간의 연결을 해제합니다.")
    @PatchMapping("/user/disconnect")
    public ResponseEntity<String> disconnectSubject(
            @RequestHeader("Authorization") String token,
            @RequestBody ConnectSubjectRequest request) {

        Long userId = authService.getUserIdFromToken(token);
        if(userId == -1) throw new IllegalArgumentException("토큰 정보가 올바르지 않습니다.");

        return ResponseEntity.ok(userService.disconnectSubject(userId, request));
    }

    @Operation(summary = "복지대상자 서비스 위치 등록", description = "복지대상자가 서비스 받을 위치를 등록합니다.")
    @PatchMapping("/update/location")
    public ResponseEntity<String> setLocation(
            @RequestHeader("Authorization") String token,
            @RequestBody SetLocationRequest request) {

        Long userId = authService.getUserIdFromToken(token);
        if(userId == -1) throw new IllegalArgumentException("토큰 정보가 올바르지 않습니다.");

        return ResponseEntity.ok(userService.setLocation(userId, request));
    }
}
