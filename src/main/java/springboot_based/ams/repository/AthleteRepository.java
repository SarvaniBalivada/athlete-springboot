package springboot_based.ams.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import springboot_based.ams.entity.Athlete;

public interface AthleteRepository extends JpaRepository<Athlete,Long> {

}
