package dgu.notwenty.domain.auth.service;

import dgu.notwenty.domain.auth.dto.KakaoDTO.Response.KakaoAuthResponse;

public interface AuthService {

    KakaoAuthResponse oAuthLogin (String accessCode);
    Long getUserIdFromToken(String token);
}
