package vn.team9.auction_system.common.service;

import vn.team9.auction_system.common.dto.transaction.TransactionAfterAuctionRequest;
import vn.team9.auction_system.common.dto.transaction.TransactionAfterAuctionResponse;
import java.util.List;

public interface ITransactionAfterAuctionService {
    TransactionAfterAuctionResponse createTransaction(TransactionAfterAuctionRequest request);
    TransactionAfterAuctionResponse updateTransactionStatus(Long id, String status);
    List<TransactionAfterAuctionResponse> getTransactionsByUser(Long userId);

    TransactionAfterAuctionResponse getTransactionByAuction(Long auctionId);
    TransactionAfterAuctionResponse cancelTransaction(Long txnId, String reason);

    // Thêm các hàm còn thiếu để đồng bộ với TransactionController
    List<TransactionAfterAuctionResponse> getAllTransactions();
    TransactionAfterAuctionResponse getTransactionById(Long id);
    TransactionAfterAuctionResponse payTransaction(Long id);
    TransactionAfterAuctionResponse shipTransaction(Long id);
    TransactionAfterAuctionResponse confirmTransaction(Long id);
    List<TransactionAfterAuctionResponse> getTransactionsByBuyer(Long buyerId);
    List<TransactionAfterAuctionResponse> getTransactionsBySeller(Long sellerId);
}