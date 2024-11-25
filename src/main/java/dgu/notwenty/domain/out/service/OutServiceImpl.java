package dgu.notwenty.domain.out.service;

import dgu.notwenty.domain.out.converter.OutConverter;
import dgu.notwenty.domain.out.dto.OutDTO.Request.createOutInfoRequest;
import dgu.notwenty.domain.out.dto.OutDTO.Request.setOutReasonRequest;
import dgu.notwenty.domain.out.dto.OutDTO.Response.outInfoResponse;
import dgu.notwenty.domain.out.dto.OutDTO.Response.outInfoListResponse;
import dgu.notwenty.domain.out.entity.Outlog;
import dgu.notwenty.domain.out.repository.OutRepository;
import dgu.notwenty.domain.user.entity.User;
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
public class OutServiceImpl implements OutService {


    private final OutRepository outRepository;
    private final UserRepository userRepository;

    public outInfoListResponse getOutInfo(Long workerId){

         User worker = userRepository.findById(workerId)
                 .orElseThrow(() -> new NoSuchElementException("해당 복지사를 찾을 수 없습니다."));

         List<Outlog> outList = outRepository.findByWorkerId(workerId);
         List<outInfoResponse> outInfoResponseList = new ArrayList<>();

         for(Outlog out : outList){
             // 이탈사유가 null인 이탈 기록만 조회하여 리턴
             if(out.getReason() == null) outInfoResponseList.add(OutConverter.toOutInfoResponse(out));
         }

         return OutConverter.toOutInfoListResponse(outInfoResponseList);
    }

    public String createOutInfo(Long workerId, createOutInfoRequest request){

        User worker = userRepository.findById(workerId)
                .orElseThrow(() -> new NoSuchElementException("해당 복지사를 찾을 수 없습니다."));

        Outlog newOut = OutConverter.toOut(worker, request.getDate(), request.getOutStartTime(), request.getOutEndTime(), null);

        outRepository.save(newOut);

        return "이탈 기록이 생성되었습니다.";
    }

    public String setOutReason(Long workerId, setOutReasonRequest request){

        User worker = userRepository.findById(workerId)
                .orElseThrow(() -> new NoSuchElementException("해당 복지사를 찾을 수 없습니다."));

        Outlog out = outRepository.findById(request.getOutId())
                .orElseThrow(() -> new NoSuchElementException("유효하지 않은 이탈 기록 ID입니다."));

        out.setReason(request.getReason());
        outRepository.save(out);

        return "이탈 사유를 등록하였습니다.";
    }
}
