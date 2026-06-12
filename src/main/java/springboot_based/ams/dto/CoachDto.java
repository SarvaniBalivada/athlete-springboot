package springboot_based.ams.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class CoachDto {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String specialization;
}