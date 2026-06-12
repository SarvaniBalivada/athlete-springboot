package springboot_based.ams.service;

import springboot_based.ams.dto.UserDto;

public interface UserService {

    UserDto createUser(UserDto userDto);
}