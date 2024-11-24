package dgu.notwenty.domain.auth.dto;

import lombok.Builder;
import lombok.Getter;

public class KakaoDTO {

    public static class Request {

        @Getter
        public static class AuthInfoRequest{
            private String email;
        }
    }

    public static class Response {

        // 카카오에서 받는 인가 코드
        @Getter
        public static class OAuthToken {
            private String access_token;
            private String token_type;
            private String refresh_token;
            private int expires_in;
            private String scope;
            private int refresh_token_expires_in;
        }

        // 카카오에서 받는 유저 정보
        @Getter
        public static class KakaoProfile {
            private Long id;
            private String connected_at;
            private Properties properties;
            private KakaoAccount kakao_account;

            @Getter
            public class Properties {
                private String nickname;
                private String profile_image;
                private String thumbnail_image;
            }

            @Getter
            public class KakaoAccount {
                private Boolean profile_nickname_needs_agreement;
                private Boolean profile_image_needs_agreement;
                private Profile profile;
                private Boolean has_email;
                private Boolean email_needs_agreement;
                private Boolean is_email_valid;
                private Boolean is_email_verified;
                private String email;

                @Getter
                public class Profile {
                    private String nickname;
                    private String thumbnail_image_url;
                    private String profile_image_url;
                    private Boolean is_default_image;
                    private Boolean is_default_nickname;
                }
            }
        }

        // 프론트로 리턴해주는 유저 정보
        @Getter
        @Builder
        public static class KakaoAuthResponse {
            private Long userId;
            private String name;
            private String token;
        }
    }
}

