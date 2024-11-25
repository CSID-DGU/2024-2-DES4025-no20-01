package dgu.notwenty.domain.user.service;

import dgu.notwenty.domain.user.converter.UserConverter;
import dgu.notwenty.domain.user.dto.UserDTO.Request.ConnectSubjectRequest;
import dgu.notwenty.domain.user.dto.UserDTO.Request.SetLocationRequest;
import dgu.notwenty.domain.user.dto.UserDTO.Request.SetUserTypeRequest;
import dgu.notwenty.domain.user.dto.UserDTO.Response.SubjectInfoListResponse;
import dgu.notwenty.domain.user.dto.UserDTO.Response.SubjectInfoResponse;
import dgu.notwenty.domain.user.dto.UserDTO.Response.UserInfoResponse;
import dgu.notwenty.domain.user.entity.Connect;
import dgu.notwenty.domain.user.entity.User;
import dgu.notwenty.domain.user.repository.ConnectRepository;
import dgu.notwenty.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ConnectRepository connectRepository;

    public String setUserType(Long userId, SetUserTypeRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("해당 유저가 없습니다."));

        user.setType(request.getType());
        userRepository.save(user);

        return "이용자 유형 설정에 성공하였습니다.";
    }

    public UserInfoResponse getUserInfo(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("해당 유저가 없습니다."));

        Double latitude = null;
        Double longitude = null;

        List<Connect> connectList = connectRepository.findBySubjectId(userId);
        if (!connectList.isEmpty()) {
            Connect connect = connectList.get(0);
            latitude = connect.getLatitude();
            longitude = connect.getLongitude();
        }

        return UserConverter.toUserInfoResponse(user, latitude, longitude);
    }

    public SubjectInfoListResponse searchSubjectInfo(String subjectName){
        List<User> userList = userRepository.findByNameContaining(subjectName);
        List<SubjectInfoResponse> subjectInfoList = new ArrayList<>();

        for(User user : userList){
            subjectInfoList.add(UserConverter.toSubjectInfoResponse(user));
        }

        return UserConverter.toSubjectInfoListResponse(subjectInfoList);
    }

    public SubjectInfoListResponse getConnectedSubjectInfo(Long workerId){
        List<Connect> connectList = connectRepository.findByWorkerId(workerId);
        List<SubjectInfoResponse> subjectInfoList = new ArrayList<>();
        for(Connect connect : connectList){
            User subject = connect.getSubject();
            subjectInfoList.add(UserConverter.toSubjectInfoResponse(subject));
        }

        return UserConverter.toSubjectInfoListResponse(subjectInfoList);
    }

    public String connectSubject (Long workerId, ConnectSubjectRequest request){

        User worker = userRepository.findById(workerId)
                .orElseThrow(() -> new NoSuchElementException("해당 복지사가 없습니다."));

        User subject = userRepository.findById(request.getSubjectId())
                .orElseThrow(() -> new NoSuchElementException("해당 복지 대상자가 없습니다."));

        List<Connect> connectList = connectRepository.findBySubjectId(request.getSubjectId());

        if(connectList.isEmpty()){
            throw new NoSuchElementException("해당 복지 대상자의 주소가 설정되어 있지 않습니다.");
        }
        else if(connectList.size()==1 && connectList.get(0).getWorker()==null){
            Connect connect = connectList.get(0);
            connect.setWorker(worker);
            connectRepository.save(connect);
        }
        else{
            Connect connect = connectList.get(0);
            Connect newConnect = UserConverter.toConnectionCreateRequest(subject, connect.getLatitude(), connect.getLongitude());
            newConnect.setWorker(worker);
            connectRepository.save(newConnect);
        }

        return "연결에 성공하였습니다.";
    }

    public String disconnectSubject (Long workerId, ConnectSubjectRequest request){

        User worker = userRepository.findById(workerId)
                .orElseThrow(() -> new NoSuchElementException("해당 복지사가 없습니다."));

        User subject = userRepository.findById(request.getSubjectId())
                .orElseThrow(() -> new NoSuchElementException("해당 복지 대상자가 없습니다."));

        Connect connect = connectRepository.findBySubjectIdAndWorkerId(subject.getId(), workerId)
                .orElseThrow(() -> new NoSuchElementException("해당 연결이 없습니다."));

        List<Connect> connectList = connectRepository.findBySubjectId(subject.getId());

        if(connectList.size()>1) connectRepository.delete(connect);
        else connect.setWorker(null);

        return "연결을 삭제하였습니다.";
    }

    public String setLocation(Long userId, SetLocationRequest request) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));

        Double latitude = request.getLatitude();
        Double longitude = request.getLongitude();

        Connect newConnect = UserConverter.toConnectionCreateRequest(user, latitude, longitude);
        connectRepository.save(newConnect);

        return "주소 설정에 성공하였습니다.";
    }
}
