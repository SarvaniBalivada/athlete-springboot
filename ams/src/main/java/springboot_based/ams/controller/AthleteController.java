package springboot_based.ams.controller;

import lombok.AllArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springboot_based.ams.dto.AthleteDto;
import springboot_based.ams.entity.Athlete;
import springboot_based.ams.service.AthleteService;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/athletes")
public class AthleteController {
    private AthleteService athleteService;

    //Build Add Athlete REST API
    @PostMapping
    public ResponseEntity<AthleteDto>createAthlete(@RequestBody AthleteDto athleteDto){
        AthleteDto savedAthlete=athleteService.createAthlete(athleteDto);
        return new ResponseEntity<>(savedAthlete, HttpStatus.CREATED);
    }

    //Build Get Athlete REST API
    @GetMapping("{id}")
    public ResponseEntity<AthleteDto>getAthlete(@PathVariable("id") Long athleteId){
        AthleteDto athleteDto=athleteService.getAthleteById(athleteId);
        return ResponseEntity.ok(athleteDto);
    }

    //Build Get All Athletes REST API
    @GetMapping
    public ResponseEntity<List<AthleteDto>>getAllAthletes(){
        List<AthleteDto>athletes=athleteService.getAllAthletes();
        return ResponseEntity.ok(athletes);

    }

    //Build Update Athlete REST API
    @PutMapping("{id}")
    public ResponseEntity<AthleteDto>updateAthlete(@PathVariable("id") Long athleteId,
                                                   @RequestBody AthleteDto updatedAthlete){
        AthleteDto athleteDto=athleteService.updateAthlete(athleteId,updatedAthlete);
        return ResponseEntity.ok(athleteDto);
    }

    //Build Delete Athlete REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteAthlete(@PathVariable("id") Long athleteId){
        athleteService.deleteAthlete(athleteId);
        return ResponseEntity.ok("Athlete deleted succesfully");
    }
}
