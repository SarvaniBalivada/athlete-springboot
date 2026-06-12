package springboot_based.ams.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class TrainingDto {

    private Long id;
    private String trainingName;
    private String trainingType;
    private String location;
    private String trainingDate;
    private String duration;
    private String coachName;
}