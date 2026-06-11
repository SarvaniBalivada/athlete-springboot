package springboot_based.ams.service;

import springboot_based.ams.dto.CompetitionDto;

import java.util.List;

public interface CompetitionService {

    CompetitionDto createCompetition(
            CompetitionDto competitionDto);

    CompetitionDto getCompetitionById(Long competitionId);

    List<CompetitionDto> getAllCompetitions();

    CompetitionDto updateCompetition(
            Long competitionId,
            CompetitionDto updatedCompetition);

    void deleteCompetition(Long competitionId);
}