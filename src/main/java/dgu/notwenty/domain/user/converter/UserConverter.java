package dgu.notwenty.domain.user.converter;


import dgu.notwenty.domain.user.dto.UserDTO.Response.UserInfoResponse;
import dgu.notwenty.domain.user.dto.UserDTO.Response.UserCreateResponse;
import dgu.notwenty.domain.user.dto.UserDTO.Request.UserCreateRequest;
import dgu.notwenty.domain.user.entity.User;

public class UserConverter {

    public static UserInfoResponse toUserInfoResponse(User user) {
        return UserInfoResponse.builder()
                .userName(user.getUserName())
                .userPosition(user.getUserPosition())
                .latitude(user.getLatitude())
                .longitude(user.getLongitude())
                .workStart(user.getWorkStart())
                .workEnd(user.getWorkEnd())
                .build();
    }

    public static User toUserCreate(UserCreateRequest userCreateRequest) {
        return User.builder()
                .userName(userCreateRequest.getUserName())
                .oauthId(userCreateRequest.getOauthId())
                .build();
    }

    public static UserCreateResponse toUserCreateResponse(User user) {
        return UserCreateResponse.builder()
                .userId(user.getUserId())
                .userName(user.getUserName())
                .build();
    }
}
