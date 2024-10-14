package dgu.notwenty.domain.user.service;

import dgu.notwenty.domain.user.dto.UserDTO.UserPositionRequest;
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
}
