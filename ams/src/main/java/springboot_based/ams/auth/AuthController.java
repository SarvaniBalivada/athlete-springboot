package springboot_based.ams.auth;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import springboot_based.ams.dto.RegisterRequest;
import springboot_based.ams.entity.Athlete;
import springboot_based.ams.entity.Coach;
import springboot_based.ams.entity.User;
import springboot_based.ams.repository.AthleteRepository;
import springboot_based.ams.repository.CoachRepository;
import springboot_based.ams.repository.UserRepository;
import springboot_based.ams.security.JwtUtil;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private AuthenticationManager authenticationManager;
    private JwtUtil jwtUtil;
    private UserRepository userRepository;
    private AthleteRepository athleteRepository;
    private CoachRepository coachRepository;
    private org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String token = jwtUtil.generateToken(userDetails.getUsername());

        return ResponseEntity.ok(new LoginResponse(token, userDetails.getUsername(), "USER"));
    }

    @PostMapping("/register")
    public ResponseEntity<LoginResponse> register(@RequestBody RegisterRequest request) {
        User user = new User();
        user.setUsername(request.getEmail());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        User savedUser = userRepository.save(user);

        if ("COACH".equalsIgnoreCase(request.getRole())) {
            Coach coach = new Coach();
            coach.setFirstName(request.getFirstName());
            coach.setLastName(request.getLastName());
            coach.setEmail(request.getEmail());
            coachRepository.save(coach);
        } else {
            Athlete athlete = new Athlete();
            athlete.setFirstName(request.getFirstName());
            athlete.setLastName(request.getLastName());
            athlete.setEmail(request.getEmail());
            athleteRepository.save(athlete);
        }

        String token = jwtUtil.generateToken(savedUser.getUsername());
        return new ResponseEntity<>(new LoginResponse(token, savedUser.getUsername(), request.getRole()), HttpStatus.CREATED);
    }
}