package springboot_based.ams.mapper;

import springboot_based.ams.dto.CoachDto;
import springboot_based.ams.entity.Coach;

public class CoachMapper {

    public static CoachDto mapToCoachDto(Coach coach) {

        return new CoachDto(
                coach.getId(),
                coach.getFirstName(),
                coach.getLastName(),
                coach.getEmail()
        );
    }

    public static Coach mapToCoach(CoachDto coachDto) {

        return new Coach(
                coachDto.getId(),
                coachDto.getFirstName(),
                coachDto.getLastName(),
                coachDto.getEmail()
        );
    }
}