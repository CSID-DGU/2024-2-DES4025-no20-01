package dgu.notwenty.domain.user.controller;

import dgu.notwenty.domain.user.dto.UserDTO.UserPositionRequest;
import dgu.notwenty.domain.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
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

    @Operation(summary = "유저 직책 설정", description = "유저의 직책을 설정합니다.")
    @PostMapping("/update/position/{userId}")
    public ResponseEntity<String> setUserPosition(
            @PathVariable Long userId,
            @RequestBody UserPositionRequest request) {
        return ResponseEntity.ok(userService.setUserPosition(userId, request));
    }


}
