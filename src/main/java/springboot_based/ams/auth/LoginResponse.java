package springboot_based.ams.auth;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class LoginResponse {

    private String token;
    private String role;
    private String email;
}
