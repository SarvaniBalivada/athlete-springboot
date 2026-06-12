package springboot_based.ams.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import springboot_based.ams.dto.TrainingDto;
import springboot_based.ams.entity.Training;
import springboot_based.ams.exception.ResourceNotFoundException;
import springboot_based.ams.mapper.TrainingMapper;
import springboot_based.ams.repository.TrainingRepository;
import springboot_based.ams.service.TrainingService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TrainingServiceImpl implements TrainingService {

    private TrainingRepository trainingRepository;

    @Override
    public TrainingDto createTraining(TrainingDto trainingDto) {

        Training training = TrainingMapper.mapToTraining(trainingDto);

        Training savedTraining = trainingRepository.save(training);

        return TrainingMapper.mapToTrainingDto(savedTraining);
    }

    @Override
    public TrainingDto getTrainingById(Long trainingId) {

        Training training = trainingRepository.findById(trainingId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Training does not exist with given id: " + trainingId));

        return TrainingMapper.mapToTrainingDto(training);
    }

    @Override
    public List<TrainingDto> getAllTrainings() {

        List<Training> trainings = trainingRepository.findAll();

        return trainings.stream()
                .map(TrainingMapper::mapToTrainingDto)
                .collect(Collectors.toList());
    }

    @Override
    public TrainingDto updateTraining(
            Long trainingId,
            TrainingDto updatedTraining) {

        Training training = trainingRepository.findById(trainingId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Training does not exist with given id: " + trainingId));

        training.setTrainingName(updatedTraining.getTrainingName());
        training.setTrainingType(updatedTraining.getTrainingType());
        training.setLocation(updatedTraining.getLocation());
        training.setTrainingDate(updatedTraining.getTrainingDate());
        training.setDuration(updatedTraining.getDuration());
        training.setCoachName(updatedTraining.getCoachName());

        Training updatedTrainingObj = trainingRepository.save(training);

        return TrainingMapper.mapToTrainingDto(updatedTrainingObj);
    }

    @Override
    public void deleteTraining(Long trainingId) {

        Training training = trainingRepository.findById(trainingId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Training does not exist with given id: " + trainingId));

        trainingRepository.deleteById(trainingId);
    }
}