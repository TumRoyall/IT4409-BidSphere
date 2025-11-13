package vn.team9.auction_system.common.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserRequest {

    @Size(max = 100)
    private String fullName;

    @Size(max = 50)
    private String username;

    @Email
    private String email;

    @Size(max = 20)
    private String phone;

    private String gender;

    private String status;
}
