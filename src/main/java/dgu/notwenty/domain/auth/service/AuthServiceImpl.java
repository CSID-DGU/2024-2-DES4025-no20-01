package dgu.notwenty.domain.auth.service;

import dgu.notwenty.domain.auth.converter.AuthConverter;
import dgu.notwenty.domain.auth.dto.KakaoDTO.Response.KakaoAuthResponse;
import dgu.notwenty.domain.auth.dto.KakaoDTO.Response.KakaoProfile;
import dgu.notwenty.domain.auth.dto.KakaoDTO.Response.OAuthToken;
import dgu.notwenty.domain.auth.util.JWTUtil;
import dgu.notwenty.domain.auth.util.KakaoUtil;
import dgu.notwenty.domain.user.converter.UserConverter;
import dgu.notwenty.domain.user.entity.User;
import dgu.notwenty.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final KakaoUtil kakaoUtil;
    private final UserRepository userRepository;
    private final JWTUtil jwtUtil;

    @Override
    public KakaoAuthResponse oAuthLogin(String accessCode) {

        OAuthToken oAuthToken = kakaoUtil.requestToken(accessCode);
        KakaoProfile kakaoProfile = kakaoUtil.requestProfile(oAuthToken);
        String email = kakaoProfile.getKakao_account().getEmail();

        User user = userRepository.findByEmail(email)
                .orElseGet(() -> createNewUser(kakaoProfile));

        String token = jwtUtil.createJwt(user.getId(), user.getEmail());

        return AuthConverter.toKakaoAuth(user, token);
    }

    private User createNewUser(KakaoProfile kakaoProfile) {

        User newUser = UserConverter.toUser(
                kakaoProfile.getProperties().getNickname(),
                kakaoProfile.getKakao_account().getEmail(),
                null,
                kakaoProfile.getKakao_account().getProfile().getProfile_image_url(),
                0L
        );
        return userRepository.save(newUser);
    }

    @Override
    public Long getUserIdFromToken(String token) {

        if (token == null || !token.startsWith("Bearer ")) return -1L;

        String actualToken = token.replace("Bearer ", "");
        Long userId = jwtUtil.extractUserId(actualToken);

        return userId;
    }
}
