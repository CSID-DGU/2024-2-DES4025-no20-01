package dgu.notwenty.domain.out.converter;

import dgu.notwenty.domain.out.dto.OutDTO;
import dgu.notwenty.domain.out.dto.OutDTO.Response.outInfoListResponse;
import dgu.notwenty.domain.out.dto.OutDTO.Response.outInfoResponse;
import dgu.notwenty.domain.out.entity.Out;
import dgu.notwenty.domain.user.entity.User;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public class OutConverter {

    public static Out toOut(User worker, LocalDate date, LocalTime startTime, LocalTime endTime, String reason) {
        return Out.builder()
                .worker(worker)
                .date(date)
                .startTime(startTime)
                .endTime(endTime)
                .reason(reason)
                .build();
    }

    public static outInfoResponse toOutInfoResponse(Out out) {
        return outInfoResponse.builder()
                .outId(out.getId())
                .date(out.getDate())
                .outStartTime(out.getStartTime())
                .outEndTime(out.getEndTime())
                .build();
    }

    public static outInfoListResponse toOutInfoListResponse(List<outInfoResponse> outInfoList) {
        return OutDTO.Response.outInfoListResponse.builder()
                .outInfoList(outInfoList)
                .build();
    }
}
