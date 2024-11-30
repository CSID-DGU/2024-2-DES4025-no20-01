package dgu.notwenty.domain.supply.service;

import dgu.notwenty.domain.supply.converter.SupplyConverter;
import dgu.notwenty.domain.supply.dto.SupplyDTO.Request.SupplyRequest;
import dgu.notwenty.domain.supply.dto.SupplyDTO.Response.SupplyListResponse;
import dgu.notwenty.domain.supply.dto.SupplyDTO.Response.SupplyResponse;
import dgu.notwenty.domain.supply.entity.Supply;
import dgu.notwenty.domain.supply.repository.SupplyRepository;
import dgu.notwenty.domain.user.entity.Type;
import dgu.notwenty.domain.user.entity.User;
import dgu.notwenty.domain.user.repository.UserRepository;
import dgu.notwenty.global.s3.S3ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Transactional
public class SupplyServiceImpl implements SupplyService{

    private final UserRepository userRepository;
    private final SupplyRepository supplyRepository;
    private final S3ImageService s3ImageService;

    public SupplyListResponse getSupplyInfo(Long userId){

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("해당 유저가 없습니다."));

        Type type = user.getType();
        List<Supply> supplies = null;

        if(type.equals(Type.WORKER)){
            supplies = supplyRepository.findBySubjectId(userId);
        }else if(type.equals(Type.SUBJECT)){
            supplies = supplyRepository.findByWorkerId(userId);
        }else{
            throw new IllegalArgumentException("잘못된 사용자 유형입니다.");
        }

        List<SupplyResponse> supplyList = new ArrayList<>();

        for(Supply supply : supplies){
            supplyList.add(SupplyConverter.toSupplyResponse(supply));
        }

        return SupplyConverter.toSupplyListResponse(supplyList);
    }

    public String createSupplyInfo(Long workerId, SupplyRequest supplyRequest, MultipartFile image){
        User worker = userRepository.findById(workerId)
                .orElseThrow(() -> new NoSuchElementException("해당 복지사가 없습니다."));

        User subject = userRepository.findById(supplyRequest.getSubjectId())
                .orElseThrow(() -> new NoSuchElementException("해당 복지 대상자가 없습니다."));

        String imageUrl = s3ImageService.upload(image);

        Supply newSupply = SupplyConverter.toSupply(worker, subject, supplyRequest, imageUrl);
        supplyRepository.save(newSupply);

        return "물품 전달 정보가 생성되었습니다.";
    }
}
