package springboot_based.ams.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import springboot_based.ams.dto.AthleteDto;
import springboot_based.ams.entity.Athlete;
import springboot_based.ams.exception.ResourceNotFoundException;
import springboot_based.ams.mapper.AthleteMapper;
import springboot_based.ams.repository.AthleteRepository;
import springboot_based.ams.service.AthleteService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AthleteServiceImpl implements AthleteService {

    private AthleteRepository athleteRepository;

    @Override
    public AthleteDto createAthlete(AthleteDto athleteDto) {
        Athlete athlete= AthleteMapper.mapToAthlete(athleteDto);
        Athlete savedAthlete=athleteRepository.save(athlete);
        return AthleteMapper.mapToAthleteDto(savedAthlete);
    }

    @Override
    public AthleteDto getAthleteById(Long athleteId) {
        Athlete athlete = athleteRepository.findById(athleteId)
                .orElseThrow(()->
                        new ResourceNotFoundException("Athlete is not exists given id: " + athleteId));
        return AthleteMapper.mapToAthleteDto(athlete);
    }

    @Override
    public List<AthleteDto> getAllAthletes() {
        List<Athlete>athletes=athleteRepository.findAll();
        return athletes.stream().map((athlete)->AthleteMapper.mapToAthleteDto((athlete)))
                .collect(Collectors.toList());
    }

    @Override
    public AthleteDto updateAthlete(Long athleteId, AthleteDto updatedAthlete) {
        Athlete athlete= athleteRepository.findById(athleteId)
                .orElseThrow(()->new ResourceNotFoundException("Athlete is not exists given id: " + athleteId));

        athlete.setFirstName(updatedAthlete.getFirstName());
        athlete.setLastName(updatedAthlete.getLastName());
        athlete.setEmail(updatedAthlete.getEmail());

        Athlete updatedAthleteObj=athleteRepository.save(athlete);

        return AthleteMapper.mapToAthleteDto(updatedAthleteObj);
    }

    @Override
    public void deleteAthlete(Long athleteId) {
        Athlete athlete= athleteRepository.findById(athleteId)
                .orElseThrow(()->new ResourceNotFoundException("Athlete is not exists given id: " + athleteId));
        athleteRepository.deleteById(athleteId);

    }
}
