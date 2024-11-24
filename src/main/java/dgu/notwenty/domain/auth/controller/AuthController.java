package dgu.notwenty.domain.auth.controller;

import dgu.notwenty.domain.auth.dto.KakaoDTO;
import dgu.notwenty.domain.auth.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
@Tag(name = "인증 관련 컨트롤러")
public class AuthController {

    private final AuthService authService;

    @Operation(summary = "카카오 로그인", description = "카카오 인가코드로 JWT토큰을 발급합니다.")
    @GetMapping("/kakao/login/{code}")
    public ResponseEntity<KakaoDTO.Response.KakaoAuthResponse> kakaoLogin(
            @PathVariable String code) {

        return ResponseEntity.ok(authService.oAuthLogin(code));
    }

}
