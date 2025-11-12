package vn.team9.auction_system.transaction.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.team9.auction_system.common.service.ITransactionAfterAuctionService;
import vn.team9.auction_system.common.dto.transaction.TransactionAfterAuctionRequest;
import vn.team9.auction_system.common.dto.transaction.TransactionAfterAuctionResponse;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final ITransactionAfterAuctionService transactionService;

    // Lấy danh sách tất cả transactions (Admin)
    @GetMapping
    public ResponseEntity<List<TransactionAfterAuctionResponse>> getAllTransactions() {
        return ResponseEntity.ok(transactionService.getAllTransactions());
    }

    // Lấy chi tiết 1 transaction
    @GetMapping("/{id}")
    public ResponseEntity<TransactionAfterAuctionResponse> getTransactionById(@PathVariable Long id) {
        return ResponseEntity.ok(transactionService.getTransactionById(id));
    }

    // Tạo transaction sau khi auction kết thúc
    @PostMapping
    public ResponseEntity<TransactionAfterAuctionResponse> createTransaction(@RequestBody TransactionAfterAuctionRequest request) {
        return ResponseEntity.ok(transactionService.createTransaction(request));
    }

    // Cập nhật status transaction
    @PutMapping("/{id}/status")
    public ResponseEntity<TransactionAfterAuctionResponse> updateTransactionStatus(
            @PathVariable Long id, 
            @RequestParam String status) {
        return ResponseEntity.ok(transactionService.updateTransactionStatus(id, status));
    }

    // Buyer thanh toán (PENDING -> PAID)
    @PostMapping("/{id}/pay")
    public ResponseEntity<TransactionAfterAuctionResponse> payTransaction(@PathVariable Long id) {
        return ResponseEntity.ok(transactionService.payTransaction(id));
    }

    // Seller gửi hàng (PAID -> SHIPPED)
    @PostMapping("/{id}/ship")
    public ResponseEntity<TransactionAfterAuctionResponse> shipTransaction(@PathVariable Long id) {
        return ResponseEntity.ok(transactionService.shipTransaction(id));
    }

    // Buyer xác nhận nhận hàng (SHIPPED -> DONE)
    @PostMapping("/{id}/confirm")
    public ResponseEntity<TransactionAfterAuctionResponse> confirmTransaction(@PathVariable Long id) {
        return ResponseEntity.ok(transactionService.confirmTransaction(id));
    }

    // Hủy transaction
    @PostMapping("/{id}/cancel")
    public ResponseEntity<TransactionAfterAuctionResponse> cancelTransaction(@PathVariable Long id) {
        return ResponseEntity.ok(transactionService.cancelTransaction(id));
    }

    // Lấy transactions theo buyer
    @GetMapping("/buyer/{buyerId}")
    public ResponseEntity<List<TransactionAfterAuctionResponse>> getTransactionsByBuyer(@PathVariable Long buyerId) {
        return ResponseEntity.ok(transactionService.getTransactionsByBuyer(buyerId));
    }

    // Lấy transactions theo seller
    @GetMapping("/seller/{sellerId}")
    public ResponseEntity<List<TransactionAfterAuctionResponse>> getTransactionsBySeller(@PathVariable Long sellerId) {
        return ResponseEntity.ok(transactionService.getTransactionsBySeller(sellerId));
    }
}