package dgu.notwenty.domain.auth.converter;

import dgu.notwenty.domain.auth.dto.AuthSessionDTO;
import dgu.notwenty.domain.auth.dto.KakaoDTO.Response.KakaoAuthResponse;
import dgu.notwenty.domain.user.entity.User;

public class AuthConverter {

    public static AuthSessionDTO toAuthCustom(User user) {
        return AuthSessionDTO.builder()
                .user(user)
                .build();
    }

    public static KakaoAuthResponse toKakaoAuth(User user, String token)
    {
        return KakaoAuthResponse.builder()
                .userId(user.getId())
                .name(user.getName())
                .token(token)
                .build();
    }

}
