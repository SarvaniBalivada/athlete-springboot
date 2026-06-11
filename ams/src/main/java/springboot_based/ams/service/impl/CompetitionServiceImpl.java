package springboot_based.ams.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import springboot_based.ams.dto.CompetitionDto;
import springboot_based.ams.entity.Competition;
import springboot_based.ams.exception.ResourceNotFoundException;
import springboot_based.ams.mapper.CompetitionMapper;
import springboot_based.ams.repository.CompetitionRepository;
import springboot_based.ams.service.CompetitionService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CompetitionServiceImpl implements CompetitionService {

    private CompetitionRepository competitionRepository;

    @Override
    public CompetitionDto createCompetition(CompetitionDto competitionDto) {

        Competition competition = CompetitionMapper.mapToCompetition(competitionDto);

        Competition savedCompetition = competitionRepository.save(competition);

        return CompetitionMapper.mapToCompetitionDto(savedCompetition);
    }

    @Override
    public CompetitionDto getCompetitionById(Long competitionId) {

        Competition competition = competitionRepository.findById(competitionId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Competition does not exist with given id: " + competitionId));

        return CompetitionMapper.mapToCompetitionDto(competition);
    }

    @Override
    public List<CompetitionDto> getAllCompetitions() {

        List<Competition> competitions = competitionRepository.findAll();

        return competitions.stream()
                .map(CompetitionMapper::mapToCompetitionDto)
                .collect(Collectors.toList());
    }

    @Override
    public CompetitionDto updateCompetition(Long competitionId,
                                            CompetitionDto updatedCompetition) {

        Competition competition = competitionRepository.findById(competitionId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Competition does not exist with given id: " + competitionId));

        competition.setCompetitionName(updatedCompetition.getCompetitionName());
        competition.setSportName(updatedCompetition.getSportName());
        competition.setLocation(updatedCompetition.getLocation());
        competition.setCompetitionDate(updatedCompetition.getCompetitionDate());
        competition.setOrganizer(updatedCompetition.getOrganizer());
        competition.setCompetitionLevel(updatedCompetition.getCompetitionLevel());

        Competition updatedCompetitionObj = competitionRepository.save(competition);

        return CompetitionMapper.mapToCompetitionDto(updatedCompetitionObj);
    }

    @Override
    public void deleteCompetition(Long competitionId) {

        Competition competition = competitionRepository.findById(competitionId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Competition does not exist with given id: " + competitionId));

        competitionRepository.deleteById(competitionId);
    }
}