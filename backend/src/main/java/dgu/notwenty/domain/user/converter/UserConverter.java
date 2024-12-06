package dgu.notwenty.domain.user.converter;

import dgu.notwenty.domain.user.dto.UserDTO.Response.SubjectInfoListResponse;
import dgu.notwenty.domain.user.dto.UserDTO.Response.SubjectInfoResponse;
import dgu.notwenty.domain.user.dto.UserDTO.Response.UserInfoResponse;
import dgu.notwenty.domain.user.entity.Connect;
import dgu.notwenty.domain.user.entity.Type;
import dgu.notwenty.domain.user.entity.User;

import java.util.List;

public class UserConverter {

    public static User toUser(String name, String email, Type type, String imageUrl, Long totalTime) {
        return User.builder()
                .name(name)
                .email(email)
                .type(type)
                .imageUrl(imageUrl)
                .totalTime(totalTime)
                .build();
    }

    public static User toUserSession(Long userId, String email) {
        return User.builder()
                .id(userId)
                .email(email)
                .build();
    }

    public static UserInfoResponse toUserInfoResponse(User user, Double latitude, Double longitude) {
        return UserInfoResponse.builder()
                .name(user.getName())
                .email(user.getEmail())
                .type(user.getType())
                .imageUrl(user.getImageUrl())
                .latitude(latitude)
                .longitude(longitude)
                .totalTime(user.getTotalTime())
                .build();
    }

    public static SubjectInfoListResponse toSubjectInfoListResponse(List<SubjectInfoResponse> subjectInfoList){
        return SubjectInfoListResponse.builder()
                .subjectInfoList(subjectInfoList)
                .build();
    }

    public static SubjectInfoResponse toSubjectInfoResponse(User user) {
        return SubjectInfoResponse.builder()
                .subjectId(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .imageUrl(user.getImageUrl())
                .build();
    }

    public static Connect toConnectionCreateRequest(User subject, Double latitude, Double longitude) {
        return Connect.builder()
                .latitude(latitude)
                .longitude(longitude)
                .subject(subject)
                .worker(null)
                .build();
    }
}
