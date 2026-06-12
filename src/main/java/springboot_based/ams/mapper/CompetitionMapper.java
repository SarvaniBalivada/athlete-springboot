package springboot_based.ams.mapper;

import springboot_based.ams.dto.CompetitionDto;
import springboot_based.ams.entity.Competition;

public class CompetitionMapper {

    public static CompetitionDto mapToCompetitionDto(Competition competition) {

        return new CompetitionDto(
                competition.getId(),
                competition.getCompetitionName(),
                competition.getSportName(),
                competition.getLocation(),
                competition.getCompetitionDate(),
                competition.getOrganizer(),
                competition.getCompetitionLevel()
        );
    }

    public static Competition mapToCompetition(CompetitionDto competitionDto) {

        return new Competition(
                competitionDto.getId(),
                competitionDto.getCompetitionName(),
                competitionDto.getSportName(),
                competitionDto.getLocation(),
                competitionDto.getCompetitionDate(),
                competitionDto.getOrganizer(),
                competitionDto.getCompetitionLevel()
        );
    }
}