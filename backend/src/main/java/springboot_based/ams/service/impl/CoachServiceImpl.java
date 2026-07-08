package springboot_based.ams.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import springboot_based.ams.dto.CoachDto;
import springboot_based.ams.entity.Coach;
import springboot_based.ams.exception.ResourceNotFoundException;
import springboot_based.ams.mapper.CoachMapper;
import springboot_based.ams.repository.CoachRepository;
import springboot_based.ams.service.CoachService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CoachServiceImpl implements CoachService {

    private CoachRepository coachRepository;

    @Override
    public CoachDto createCoach(CoachDto coachDto) {

        Coach coach = CoachMapper.mapToCoach(coachDto);

        Coach savedCoach = coachRepository.save(coach);

        return CoachMapper.mapToCoachDto(savedCoach);
    }

    @Override
    public CoachDto getCoachById(Long coachId) {

        Coach coach = coachRepository.findById(coachId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Coach does not exist with given id : " + coachId));

        return CoachMapper.mapToCoachDto(coach);
    }

    @Override
    public List<CoachDto> getAllCoaches() {

        List<Coach> coaches = coachRepository.findAll();

        return coaches.stream()
                .map(CoachMapper::mapToCoachDto)
                .collect(Collectors.toList());
    }

    @Override
    public CoachDto updateCoach(Long coachId, CoachDto updatedCoach) {

        Coach coach = coachRepository.findById(coachId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Coach does not exist with given id : " + coachId));

        coach.setFirstName(updatedCoach.getFirstName());
        coach.setLastName(updatedCoach.getLastName());
        coach.setEmail(updatedCoach.getEmail());

        Coach updatedCoachObj = coachRepository.save(coach);

        return CoachMapper.mapToCoachDto(updatedCoachObj);
    }

    @Override
    public void deleteCoach(Long coachId) {

        Coach coach = coachRepository.findById(coachId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Coach does not exist with given id : " + coachId));

        coachRepository.deleteById(coachId);
    }
}