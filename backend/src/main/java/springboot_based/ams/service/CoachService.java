package springboot_based.ams.service;

import springboot_based.ams.dto.CoachDto;

import java.util.List;

public interface CoachService {

    CoachDto createCoach(CoachDto coachDto);

    CoachDto getCoachById(Long coachId);

    List<CoachDto> getAllCoaches();

    CoachDto updateCoach(Long coachId, CoachDto updatedCoach);

    void deleteCoach(Long coachId);
}