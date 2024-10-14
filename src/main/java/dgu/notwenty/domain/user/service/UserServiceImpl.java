package dgu.notwenty.domain.user.service;

import dgu.notwenty.domain.user.converter.UserConverter;
import dgu.notwenty.domain.user.dto.UserDTO.Request.UserPositionRequest;
import dgu.notwenty.domain.user.dto.UserDTO.Response.UserInfoResponse;
import dgu.notwenty.domain.user.dto.UserDTO.Request.UserCreateRequest;
import dgu.notwenty.domain.user.dto.UserDTO.Response.UserCreateResponse;
import dgu.notwenty.domain.user.dto.UserDTO.Request.WorkInfoRequest;
import dgu.notwenty.domain.user.entity.User;
import dgu.notwenty.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public String setUserPosition(Long userId, UserPositionRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));

        user.updateUserPosition(request.getUserPosition());
        userRepository.save(user);

        return "직책 설정에 성공하였습니다.";
    }

    public UserInfoResponse getUserInfo(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));

        return UserConverter.toUserInfoResponse(user);
    }

    public UserCreateResponse createUser(UserCreateRequest request) {
        User user = UserConverter.toUserCreate(request);
        User savedUser = userRepository.save(user);

        return UserConverter.toUserCreateResponse(savedUser);
    }

    public String setWorkInfo(Long userId, WorkInfoRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));

        user.updateWorkInfo(request.getLatitude(), request.getLongitude(),
                request.getWorkStart(), request.getWorkEnd());
        userRepository.save(user);

        return "근무지 정보 설정에 성공하였습니다.";
    }
}
