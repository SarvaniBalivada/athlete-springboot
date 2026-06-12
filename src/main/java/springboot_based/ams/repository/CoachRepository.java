package springboot_based.ams.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import springboot_based.ams.entity.Coach;

public interface CoachRepository extends JpaRepository<Coach, Long> {

}