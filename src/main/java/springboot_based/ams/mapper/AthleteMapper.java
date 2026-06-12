package springboot_based.ams.mapper;

import springboot_based.ams.dto.AthleteDto;
import springboot_based.ams.entity.Athlete;

public class AthleteMapper {
    public static AthleteDto mapToAthleteDto(Athlete athlete){
        return new AthleteDto(
                athlete.getId(),
                athlete.getFirstName(),
                athlete.getLastName(),
                athlete.getEmail()

        );
    }

    public static Athlete mapToAthlete(AthleteDto athleteDto){
        return new Athlete(
                athleteDto.getId(),
                athleteDto.getFirstName(),
                athleteDto.getLastName(),
                athleteDto.getEmail()


        );
    }
}
