package dgu.notwenty.domain.user.service;

import dgu.notwenty.domain.user.dto.UserDTO.Request.ConnectSubjectRequest;
import dgu.notwenty.domain.user.dto.UserDTO.Request.SetLocationRequest;
import dgu.notwenty.domain.user.dto.UserDTO.Request.SetUserTypeRequest;
import dgu.notwenty.domain.user.dto.UserDTO.Response.SubjectInfoListResponse;
import dgu.notwenty.domain.user.dto.UserDTO.Response.UserInfoResponse;

public interface UserService {
    String setUserType(Long userId, SetUserTypeRequest request);
    UserInfoResponse getUserInfo(Long userId);
    SubjectInfoListResponse searchSubjectInfo(String subjectName);
    SubjectInfoListResponse getConnectedSubjectInfo(Long userId);
    String connectSubject (Long workerId, ConnectSubjectRequest request);
    String disconnectSubject (Long workerId, ConnectSubjectRequest request);
    String setLocation(Long userId, SetLocationRequest request);
}
