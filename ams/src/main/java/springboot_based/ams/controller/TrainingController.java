package springboot_based.ams.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springboot_based.ams.dto.TrainingDto;
import springboot_based.ams.service.TrainingService;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/trainings")
public class TrainingController {

    private TrainingService trainingService;

    // Build Add Training REST API
    @PostMapping
    public ResponseEntity<TrainingDto> createTraining(
            @RequestBody TrainingDto trainingDto) {

        TrainingDto savedTraining =
                trainingService.createTraining(trainingDto);

        return new ResponseEntity<>(savedTraining, HttpStatus.CREATED);
    }

    // Build Get Training REST API
    @GetMapping("{id}")
    public ResponseEntity<TrainingDto> getTraining(
            @PathVariable("id") Long trainingId) {

        TrainingDto trainingDto =
                trainingService.getTrainingById(trainingId);

        return ResponseEntity.ok(trainingDto);
    }

    // Build Get All Trainings REST API
    @GetMapping
    public ResponseEntity<List<TrainingDto>> getAllTrainings() {

        List<TrainingDto> trainings =
                trainingService.getAllTrainings();

        return ResponseEntity.ok(trainings);
    }

    // Build Update Training REST API
    @PutMapping("{id}")
    public ResponseEntity<TrainingDto> updateTraining(
            @PathVariable("id") Long trainingId,
            @RequestBody TrainingDto updatedTraining) {

        TrainingDto trainingDto =
                trainingService.updateTraining(trainingId, updatedTraining);

        return ResponseEntity.ok(trainingDto);
    }

    // Build Delete Training REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteTraining(
            @PathVariable("id") Long trainingId) {

        trainingService.deleteTraining(trainingId);

        return ResponseEntity.ok("Training deleted successfully");
    }
}