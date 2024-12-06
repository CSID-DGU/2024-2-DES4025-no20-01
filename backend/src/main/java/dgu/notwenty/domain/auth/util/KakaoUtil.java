package dgu.notwenty.domain.auth.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import dgu.notwenty.domain.auth.dto.KakaoDTO;
import dgu.notwenty.domain.auth.dto.KakaoDTO.Response.KakaoProfile;
import dgu.notwenty.domain.auth.dto.KakaoDTO.Response.OAuthToken;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;

@Component
public class KakaoUtil {

    @Value("${spring.security.kakao.auth.client}")
    private String client;
    @Value("${spring.security.kakao.auth.redirect}")
    private String redirect;

    // 카카오 oauth 토큰 요청
    public OAuthToken requestToken(String accessCode) {

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();

        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", client);
        params.add("redirect_uri", redirect);
        params.add("code", accessCode);

        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(params, headers);

        ResponseEntity<String> response = restTemplate.exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                kakaoTokenRequest,
                String.class);

        ObjectMapper objectMapper = new ObjectMapper();

        OAuthToken oAuthToken = new OAuthToken();

        try {
            oAuthToken = objectMapper.readValue(response.getBody(), OAuthToken.class);
        } catch (JsonProcessingException e) {
            //throw new AuthHandler(ErrorStatus._PARSING_ERROR);
            e.printStackTrace();
        }
        return oAuthToken;
    }

    // 카카오 프로필 요청
    public KakaoProfile requestProfile(OAuthToken oAuthToken) {

        RestTemplate restTemplate2 = new RestTemplate();
        HttpHeaders headers2 = new HttpHeaders();

        headers2.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
        headers2.add("Authorization", "Bearer " + oAuthToken.getAccess_token());

        HttpEntity<MultiValueMap<String, String>> kakaoProfileRequest = new HttpEntity<>(headers2);

        ResponseEntity<String> response2 = restTemplate2.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.GET,
                kakaoProfileRequest,
                String.class);

        ObjectMapper objectMapper = new ObjectMapper();

        KakaoProfile kakaoProfile = new KakaoProfile();

        try {
            kakaoProfile = objectMapper.readValue(response2.getBody(), KakaoProfile.class);
        } catch (JsonProcessingException e) {
            System.out.println(Arrays.toString(e.getStackTrace()));
            //throw new AuthHandler(ErrorStatus._PARSING_ERROR);
        }

        return kakaoProfile;
    }
}