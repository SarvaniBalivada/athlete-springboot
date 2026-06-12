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
@Table(name = "competitions")
public class Competition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "competition_name")
    private String competitionName;

    @Column(name = "sport_name")
    private String sportName;

    @Column(name = "location")
    private String location;

    @Column(name = "competition_date")
    private String competitionDate;

    @Column(name = "organizer")
    private String organizer;

    @Column(name = "competition_level")
    private String competitionLevel;
}