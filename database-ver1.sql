  -- ================================
  -- ✅ MySQL Auction System Schema
  -- ================================
  CREATE DATABASE IF NOT EXISTS auction_system;
  USE auction_system;

  CREATE TABLE role (
  role_id      BIGINT AUTO_INCREMENT PRIMARY KEY,
  role_name    VARCHAR(200) NOT NULL UNIQUE,
  description  VARCHAR(500),
  is_active    BOOLEAN NOT NULL DEFAULT 1,
  created_at   DATETIME(6),
  updated_at   DATETIME(6),
  deleted_at   DATETIME(6),
  created_by   BIGINT,
  updated_by   BIGINT,
  deleted_by   BIGINT,
  is_deleted   BOOLEAN NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tạo bảng permission
CREATE TABLE permission (
  permission_id   BIGINT AUTO_INCREMENT PRIMARY KEY,
  permission_name VARCHAR(200) NOT NULL,
  api_path        VARCHAR(500) NOT NULL,
  method          VARCHAR(20)  NOT NULL,
  module          VARCHAR(100) NOT NULL,
  description     VARCHAR(500),
  created_at      DATETIME(6),
  updated_at      DATETIME(6),
  deleted_at      DATETIME(6),
  created_by      BIGINT,
  updated_by      BIGINT,
  deleted_by      BIGINT,
  is_deleted      BOOLEAN NOT NULL DEFAULT 0,
  CONSTRAINT uk_permission_api_method UNIQUE (api_path, method),
  CONSTRAINT uk_permission_name UNIQUE (permission_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tạo bảng join rolePermission (khớp entity hiện tại)
CREATE TABLE rolePermission (
  role_id       BIGINT NOT NULL,
  permission_id BIGINT NOT NULL,
  PRIMARY KEY (role_id, permission_id),
  CONSTRAINT fk_rp_role FOREIGN KEY (role_id) REFERENCES role(role_id),
  CONSTRAINT fk_rp_perm FOREIGN KEY (permission_id) REFERENCES permission(permission_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

  CREATE TABLE User (
    user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100),
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    role_id BIGINT,
    balance DECIMAL(18,2) DEFAULT 0,
    status VARCHAR(20),   -- ACTIVE, BANNED, PENDING
    gender VARCHAR(10) DEFAULT 'male',
    banned_until TIMESTAMP NULL,
    ban_reason TEXT,
    avatar_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    verification_token VARCHAR(255),
    verified_at TIMESTAMP NULL,
    verification_token_expiry TIMESTAMP NULL,
    FOREIGN KEY (role_id) REFERENCES Role(role_id)
  );

  CREATE TABLE AccountTransaction (
    trans_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    amount DECIMAL(18,2),
    type VARCHAR(20),  -- DEPOSIT, WITHDRAW, TRANSFER, RECEIVED
    status VARCHAR(20), -- PENDING, SUCCESS, FAILED
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES User(user_id)
  );

  CREATE TABLE Product (
    product_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    seller_id BIGINT,
    name VARCHAR(100),
    categories VARCHAR(50),
    description TEXT,
    start_price DECIMAL(18,2),
    estimate_price DECIMAL(18,2),
    deposit DECIMAL(18,2),
    image_url TEXT,  -- sửa từ VARCHAR(255) sang TEXT
    status VARCHAR(20), -- CANCELLED, PENDING, SOLD, APPROVED
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES User(user_id)
  );

  CREATE TABLE Auction (
    auction_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT,
    start_time DATETIME,
    end_time DATETIME,
    status VARCHAR(20), -- PENDING, OPEN, CANCELLED, CLOSED
    highest_current_price DECIMAL(18,2),
    bid_step_amount DECIMAL(18,2),
    winner_id BIGINT,
    FOREIGN KEY (product_id) REFERENCES Product(product_id),
    FOREIGN KEY (winner_id) REFERENCES User(user_id)
  );

  CREATE TABLE Bid (
    bid_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    auction_id BIGINT,
    bidder_id BIGINT,
    bid_amount DECIMAL(18,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    max_autobid_amount DECIMAL(18,2),
    step_autobid_amount DECIMAL(18,2),
    is_auto BOOLEAN DEFAULT FALSE,
    is_highest BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (auction_id) REFERENCES Auction(auction_id),
    FOREIGN KEY (bidder_id) REFERENCES User(user_id)
  );

  CREATE TABLE Notification (
    noti_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    title VARCHAR(255),
    message TEXT,
    type VARCHAR(50), -- AUCTION, SYSTEM, PAYMENT, BID
    category VARCHAR(100), -- BID_PLACED, OUTBID, AUCTION_WON, etc.
    priority VARCHAR(20) DEFAULT 'MEDIUM',
    action_url VARCHAR(255),
    action_label VARCHAR(100),
    metadata TEXT, -- JSON string
    is_read BOOLEAN DEFAULT FALSE,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES User(user_id)
  );

  CREATE TABLE Feedback (
    feedback_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    auction_id BIGINT,
    user_id BIGINT,
    rating INT,
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (auction_id) REFERENCES Auction(auction_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id)
  );

  CREATE TABLE TransactionAfterAuction (
    txn_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    auction_id BIGINT,
    seller_id BIGINT,
    buyer_id BIGINT,
    amount DECIMAL(18,2),
    status VARCHAR(20), -- PENDING, SHIPPED, PAID, DONE, CANCELLED
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (auction_id) REFERENCES Auction(auction_id),
    FOREIGN KEY (seller_id) REFERENCES User(user_id),
    FOREIGN KEY (buyer_id) REFERENCES User(user_id)
  );

  CREATE TABLE AdminLog (
    log_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    admin_id BIGINT,
    action TEXT,
    ip_address VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES User(user_id)
  );

  CREATE TABLE Image (
    image_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT,
    image_url VARCHAR(255),
    is_thumbnail BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (product_id) REFERENCES Product(product_id)
  );
