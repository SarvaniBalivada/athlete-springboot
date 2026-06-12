package springboot_based.ams.mapper;

import springboot_based.ams.dto.TrainingDto;
import springboot_based.ams.entity.Training;

public class TrainingMapper {

    public static TrainingDto mapToTrainingDto(Training training) {

        return new TrainingDto(
                training.getId(),
                training.getTrainingName(),
                training.getTrainingType(),
                training.getLocation(),
                training.getTrainingDate(),
                training.getDuration(),
                training.getCoachName()
        );
    }

    public static Training mapToTraining(TrainingDto trainingDto) {

        return new Training(
                trainingDto.getId(),
                trainingDto.getTrainingName(),
                trainingDto.getTrainingType(),
                trainingDto.getLocation(),
                trainingDto.getTrainingDate(),
                trainingDto.getDuration(),
                trainingDto.getCoachName()
        );
    }
}