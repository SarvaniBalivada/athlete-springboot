package springboot_based.ams.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import springboot_based.ams.entity.Competition;

public interface CompetitionRepository
        extends JpaRepository<Competition, Long> {

}