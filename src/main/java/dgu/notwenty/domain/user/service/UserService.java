package dgu.notwenty.domain.user.service;

import dgu.notwenty.domain.user.dto.UserDTO.UserPositionRequest;

public interface UserService {
    String setUserPosition(Long userId, UserPositionRequest request);

}
