package springboot_based.ams.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class CompetitionDto {

    private Long id;
    private String competitionName;
    private String sportName;
    private String location;
    private String competitionDate;
    private String organizer;
    private String competitionLevel;
}