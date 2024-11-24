package dgu.notwenty.domain.auth.converter;

import dgu.notwenty.domain.auth.dto.KakaoDTO.Response.KakaoAuthResponse;
import dgu.notwenty.domain.user.entity.Type;
import dgu.notwenty.domain.user.entity.User;

public class AuthConverter {

    public static User toUser(String name, String email, Type type, String imageUrl, Long totalTime) {
        return User.builder()
                .name(name)
                .email(email)
                .type(type)
                .imageUrl(imageUrl)
                .totalTime(totalTime)
                .build();
    }

    public static KakaoAuthResponse toKakaoAuthResponse(User user, String token)
    {
        return KakaoAuthResponse.builder()
                .userId(user.getId())
                .name(user.getName())
                .token(token)
                .build();
    }
}
