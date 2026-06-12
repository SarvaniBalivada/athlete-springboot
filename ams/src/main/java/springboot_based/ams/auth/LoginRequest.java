package springboot_based.ams.auth;

import lombok.Data;

@Data
public class LoginRequest {
    private String username;
    private String password;
}