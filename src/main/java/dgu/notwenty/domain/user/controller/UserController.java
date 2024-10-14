package dgu.notwenty.domain.user.controller;

import dgu.notwenty.domain.user.dto.UserDTO.Request.WorkInfoRequest;
import dgu.notwenty.domain.user.dto.UserDTO.Request.UserCreateRequest;
import dgu.notwenty.domain.user.dto.UserDTO.Request.UserPositionRequest;
import dgu.notwenty.domain.user.dto.UserDTO.Response.UserInfoResponse;
import dgu.notwenty.domain.user.dto.UserDTO.Response.UserCreateResponse;
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

    @Operation(
            summary = "유저 직책 설정",
            description = "유저의 직책을 설정합니다.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "직책 설정 성공"),
                    @ApiResponse(responseCode = "400", description = "잘못된 요청", content = @Content(schema = @Schema(hidden = true))),
                    @ApiResponse(responseCode = "404", description = "유저를 찾을 수 없음", content = @Content(schema = @Schema(hidden = true)))
            }
    )
    @PatchMapping("/update/position/{userId}")
    public ResponseEntity<String> setUserPosition(
            @PathVariable Long userId,
            @RequestBody UserPositionRequest request) {
        return ResponseEntity.ok(userService.setUserPosition(userId, request));
    }

    @Operation(
            summary = "유저 정보 조회",
            description = "유저의 정보를 조회합니다.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "유저 정보 조회 성공", content = @Content(schema = @Schema(implementation = UserInfoResponse.class))),
                    @ApiResponse(responseCode = "404", description = "유저를 찾을 수 없음", content = @Content(schema = @Schema(hidden = true)))
            }
    )
    @GetMapping("/get/{userId}")
    public ResponseEntity<UserInfoResponse> getUserInfo(
            @PathVariable Long userId) {
        return ResponseEntity.ok(userService.getUserInfo(userId));
    }

    @Operation(summary = "유저 정보 등록", description = "유저의 기본 정보를 등록합니다.")
    @PostMapping("/register")
    public ResponseEntity<UserCreateResponse> createUser(@RequestBody UserCreateRequest request) {
        return ResponseEntity.ok(userService.createUser(request));
    }

    @Operation(
            summary = "근무지 정보 설정",
            description = "유저의 직책, 근무지 위치(위도/경도), 근무 시작 및 종료 시간을 설정합니다.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "근무지 정보 설정 성공", content = @Content(schema = @Schema(implementation = UserInfoResponse.class))),
                    @ApiResponse(responseCode = "400", description = "잘못된 요청", content = @Content(schema = @Schema(hidden = true))),
                    @ApiResponse(responseCode = "404", description = "유저를 찾을 수 없음", content = @Content(schema = @Schema(hidden = true))),
            }
    )
    @PatchMapping("/update/workInfo/{userId}")
    public ResponseEntity<String> setWorkInfo(
            @PathVariable Long userId,
            @RequestBody WorkInfoRequest request) {
        return ResponseEntity.ok(userService.setWorkInfo(userId, request));
    }
}
