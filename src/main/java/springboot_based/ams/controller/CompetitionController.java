package springboot_based.ams.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springboot_based.ams.dto.CompetitionDto;
import springboot_based.ams.service.CompetitionService;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/competitions")
public class CompetitionController {

    private CompetitionService competitionService;

    // Build Add Competition REST API
    @PostMapping
    public ResponseEntity<CompetitionDto> createCompetition(
            @RequestBody CompetitionDto competitionDto) {

        CompetitionDto savedCompetition =
                competitionService.createCompetition(competitionDto);

        return new ResponseEntity<>(savedCompetition, HttpStatus.CREATED);
    }

    // Build Get Competition REST API
    @GetMapping("{id}")
    public ResponseEntity<CompetitionDto> getCompetition(
            @PathVariable("id") Long competitionId) {

        CompetitionDto competitionDto =
                competitionService.getCompetitionById(competitionId);

        return ResponseEntity.ok(competitionDto);
    }

    // Build Get All Competitions REST API
    @GetMapping
    public ResponseEntity<List<CompetitionDto>> getAllCompetitions() {

        List<CompetitionDto> competitions =
                competitionService.getAllCompetitions();

        return ResponseEntity.ok(competitions);
    }

    // Build Update Competition REST API
    @PutMapping("{id}")
    public ResponseEntity<CompetitionDto> updateCompetition(
            @PathVariable("id") Long competitionId,
            @RequestBody CompetitionDto updatedCompetition) {

        CompetitionDto competitionDto =
                competitionService.updateCompetition(
                        competitionId,
                        updatedCompetition
                );

        return ResponseEntity.ok(competitionDto);
    }

    // Build Delete Competition REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteCompetition(
            @PathVariable("id") Long competitionId) {

        competitionService.deleteCompetition(competitionId);

        return ResponseEntity.ok("Competition deleted successfully");
    }
}