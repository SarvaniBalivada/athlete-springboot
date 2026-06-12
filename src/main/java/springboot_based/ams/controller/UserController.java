package springboot_based.ams.controller;

import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import springboot_based.ams.dto.UserDto;
import springboot_based.ams.service.UserService;

@CrossOrigin("*")

@AllArgsConstructor

@RestController
@RequestMapping("/api/users")

public class UserController {

    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserDto> createUser(
            @RequestBody UserDto userDto
    ) {

        UserDto savedUser =
                userService.createUser(userDto);

        return new ResponseEntity<>(
                savedUser,
                HttpStatus.CREATED
        );
    }
}