package springboot_based.ams.service;

import springboot_based.ams.dto.TrainingDto;

import java.util.List;

public interface TrainingService {

    TrainingDto createTraining(TrainingDto trainingDto);

    TrainingDto getTrainingById(Long trainingId);

    List<TrainingDto> getAllTrainings();

    TrainingDto updateTraining(
            Long trainingId,
            TrainingDto updatedTraining);

    void deleteTraining(Long trainingId);
}