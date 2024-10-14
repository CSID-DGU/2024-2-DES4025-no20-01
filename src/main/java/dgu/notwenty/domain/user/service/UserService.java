package dgu.notwenty.domain.user.service;

import dgu.notwenty.domain.user.dto.UserDTO.Request.UserPositionRequest;
import dgu.notwenty.domain.user.dto.UserDTO.Response.UserInfoResponse;
import dgu.notwenty.domain.user.dto.UserDTO.Request.UserCreateRequest;
import dgu.notwenty.domain.user.dto.UserDTO.Response.UserCreateResponse;
import dgu.notwenty.domain.user.dto.UserDTO.Request.WorkInfoRequest;

public interface UserService {
    String setUserPosition(Long userId, UserPositionRequest request);
    UserInfoResponse getUserInfo(Long userId);
    UserCreateResponse createUser(UserCreateRequest request);
    String setWorkInfo(Long userId, WorkInfoRequest request);
}
