package vn.team9.auction_system.common.service;

import vn.team9.auction_system.common.dto.user.UserRequest;
import vn.team9.auction_system.common.dto.user.UserResponse;
import java.util.List;

public interface IUserService {
    // User registration / management
    UserResponse register(UserRequest request);
    UserResponse updateUser(Long id, UserRequest request);
    UserResponse getUserById(Long id);
    List<UserResponse> getAllUsers();
    void deleteUser(Long id);

    // Admin actions
    UserResponse banUser(Long id);
    UserResponse unbanUser(Long id);

    // Current user profile
    UserResponse getCurrentUserProfile();
    UserResponse updateCurrentUserProfile(UserRequest request);

    // User balance
    default UserResponse getBalance() {
        // Mặc định trả profile, có thể override riêng nếu cần
        return getCurrentUserProfile();
    }
}
