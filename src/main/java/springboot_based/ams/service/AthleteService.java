package springboot_based.ams.service;

import springboot_based.ams.dto.AthleteDto;
import springboot_based.ams.entity.Athlete;

import java.util.List;

public interface AthleteService {
    AthleteDto createAthlete(AthleteDto athleteDto);

    AthleteDto getAthleteById(Long athleteId);

    List<AthleteDto> getAllAthletes();

    AthleteDto updateAthlete(Long athleteId, AthleteDto updatedAthlete);

    void deleteAthlete(Long athleteId);
}
