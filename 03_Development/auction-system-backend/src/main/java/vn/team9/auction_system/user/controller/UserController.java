package vn.team9.auction_system.user.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.team9.auction_system.common.service.IUserService;
import vn.team9.auction_system.common.dto.user.UserRequest;
import vn.team9.auction_system.common.dto.user.UserResponse;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final IUserService userService;

    // Lấy danh sách tất cả users (Admin)
    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    // Lấy thông tin user theo ID
    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    // Cập nhật thông tin user
    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateUser(@PathVariable Long id, @RequestBody UserRequest request) {
        return ResponseEntity.ok(userService.updateUser(id, request));
    }

    // Xóa user
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    // Ban user (Admin)
    @PostMapping("/{id}/ban")
    public ResponseEntity<UserResponse> banUser(@PathVariable Long id) {
        return ResponseEntity.ok(userService.banUser(id));
    }

    // Unban user (Admin)
    @PostMapping("/{id}/unban")
    public ResponseEntity<UserResponse> unbanUser(@PathVariable Long id) {
        return ResponseEntity.ok(userService.unbanUser(id));
    }

    // Lấy profile user hiện tại
    @GetMapping("/profile")
    public ResponseEntity<UserResponse> getCurrentUserProfile() {
        return ResponseEntity.ok(userService.getCurrentUserProfile());
    }

    // Cập nhật profile user hiện tại
    @PutMapping("/profile")
    public ResponseEntity<UserResponse> updateCurrentUserProfile(@RequestBody UserRequest request) {
        return ResponseEntity.ok(userService.updateCurrentUserProfile(request));
    }

    // Lấy số dư tài khoản
    @GetMapping("/balance")
    public ResponseEntity<UserResponse> getBalance() {
        return ResponseEntity.ok(userService.getCurrentUserProfile());
    }
}