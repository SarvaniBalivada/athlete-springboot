package springboot_based.ams.service.impl;

import lombok.AllArgsConstructor;

import org.springframework.stereotype.Service;

import springboot_based.ams.dto.UserDto;
import springboot_based.ams.entity.User;
import springboot_based.ams.mapper.UserMapper;
import springboot_based.ams.repository.UserRepository;
import springboot_based.ams.service.UserService;

@Service
@AllArgsConstructor

public class UserServiceImpl
        implements UserService {

    private UserRepository userRepository;

    @Override
    public UserDto createUser(
            UserDto userDto
    ) {

        User user =
                UserMapper.mapToUser(userDto);

        User savedUser =
                userRepository.save(user);

        return UserMapper
                .mapToUserDto(savedUser);
    }
}