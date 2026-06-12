package springboot_based.ams.mapper;

import springboot_based.ams.dto.UserDto;
import springboot_based.ams.entity.User;

public class UserMapper {

    public static UserDto mapToUserDto(
            User user
    ) {

        return new UserDto(

                user.getId(),

                user.getFirstName(),

                user.getLastName(),

                user.getEmail(),

                user.getPassword(),

                user.getRole()
        );
    }

    public static User mapToUser(
            UserDto userDto
    ) {

        return new User(

                userDto.getId(),

                userDto.getFirstName(),

                userDto.getLastName(),

                userDto.getEmail(),

                userDto.getPassword(),

                userDto.getRole()
        );
    }
}