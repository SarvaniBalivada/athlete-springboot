package springboot_based.ams.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "trainings")
public class Training {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "training_name")
    private String trainingName;

    @Column(name = "training_type")
    private String trainingType;

    @Column(name = "location")
    private String location;

    @Column(name = "training_date")
    private String trainingDate;

    @Column(name = "duration")
    private String duration;

    @Column(name = "coach_name")
    private String coachName;
}