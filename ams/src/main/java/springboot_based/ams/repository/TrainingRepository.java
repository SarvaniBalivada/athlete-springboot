package springboot_based.ams.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import springboot_based.ams.entity.Training;

public interface TrainingRepository extends JpaRepository<Training, Long> {

}