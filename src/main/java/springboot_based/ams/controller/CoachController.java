package springboot_based.ams.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springboot_based.ams.dto.CoachDto;
import springboot_based.ams.service.CoachService;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/coaches")
public class CoachController {

    private CoachService coachService;

    @PostMapping
    public ResponseEntity<CoachDto> createCoach(@RequestBody CoachDto coachDto) {

        CoachDto savedCoach = coachService.createCoach(coachDto);

        return new ResponseEntity<>(savedCoach, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<CoachDto> getCoach(@PathVariable("id") Long coachId) {

        CoachDto coachDto = coachService.getCoachById(coachId);

        return ResponseEntity.ok(coachDto);
    }

    @GetMapping
    public ResponseEntity<List<CoachDto>> getAllCoaches() {

        List<CoachDto> coaches = coachService.getAllCoaches();

        return ResponseEntity.ok(coaches);
    }

    @PutMapping("{id}")
    public ResponseEntity<CoachDto> updateCoach(
            @PathVariable("id") Long coachId,
            @RequestBody CoachDto updatedCoach) {

        CoachDto coachDto =
                coachService.updateCoach(coachId, updatedCoach);

        return ResponseEntity.ok(coachDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteCoach(
            @PathVariable("id") Long coachId) {

        coachService.deleteCoach(coachId);

        return ResponseEntity.ok("Coach deleted successfully");
    }
}