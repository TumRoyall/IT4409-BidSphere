use auction_system;

-- (Role)
INSERT INTO role (role_name, description, is_active, is_deleted)
VALUES
  ('BIDDER', 'Người dùng đấu giá/bid', 1, 0),
  ('SELLER', 'Người đăng và quản lý sản phẩm', 1, 0),
  ('ADMIN', 'Quản trị hệ thống (super admin)', 1, 0),
  ('MODERATOR', 'Kiểm duyệt (quản lý auction, product, duyệt yêu cầu)', 1, 0);

-- (User)
INSERT INTO User (username, password_hash, email, phone, role_id, balance, status, created_at) VALUES ('user01', 'aa77dcf3dc8e327a40950c09d8d772a720ae3d4e2fa25a2a87426efc00a552f6', 'user01@gmail.com', '0906059826', 2, 8755465.14, 'active', '2023-11-24 09:22:31');
INSERT INTO User (username, password_hash, email, phone, role_id, balance, status, created_at) VALUES ('user02', 'dce789a2b1e560ac2c7f995774557a0b0121e6e7e5dcdf2ef30ab5887ceba1ae', 'user02@gmail.com', '0902376946', 2, 810151.87, 'banned', '2023-06-29 09:22:31');
INSERT INTO User (username, password_hash, email, phone, role_id, balance, status, created_at) VALUES ('user03', 'a7c75fc69cc970b2dc33cb5daf417b93d617215597952ca4cab4af98f49dfddf', 'user03@gmail.com', '0909247366', 1, 8234969.85, 'pending', '2024-04-16 09:22:31');
INSERT INTO User (username, password_hash, email, phone, role_id, balance, status, created_at) VALUES ('user04', '1d91730ee2cbb5cfc6064562f87bcbc49951529c09d27a02d71521ee3f67a5f0', 'user04@gmail.com', '0905816710', 1, 7960870.05, 'banned', '2023-07-28 09:22:31');
INSERT INTO User (username, password_hash, email, phone, role_id, balance, status, created_at) VALUES ('user05', '24c57b81657fcefdc9fadbd00e39f3248f53a209cb9e66534b101d682b910853', 'user05@gmail.com', '0904412087', 1, 6083306.84, 'active', '2024-03-10 09:22:31');
INSERT INTO User (username, password_hash, email, phone, role_id, balance, status, created_at) VALUES ('user06', '875109af682dc553750f1c924ae2bb49288ef09d72a96e7d3834f291ea79ce1a', 'user06@gmail.com', '0906603367', 3, 6963678.9, 'active', '2023-07-17 09:22:31');
INSERT INTO User (username, password_hash, email, phone, role_id, balance, status, created_at) VALUES ('user07', '8c3595b573feb3a0635bc593a92335d1ae2acbd067b771469b411523ac413b9f', 'user07@gmail.com', '0904829476', 2, 8721229.94, 'active', '2023-05-20 09:22:31');
INSERT INTO User (username, password_hash, email, phone, role_id, balance, status, created_at) VALUES ('user08', '1756a1918b626bee0da6b1f96162d808c9933b53a6c8f49f1d7c4c543dfc897c', 'user08@gmail.com', '0907321817', 2, 1761040.27, 'pending', '2025-06-06 09:22:31');
INSERT INTO User (username, password_hash, email, phone, role_id, balance, status, created_at) VALUES ('user09', 'a1f6c0a15019f9d7cd65ae33f531530877d22618cea384175fc444fe556acf43', 'user09@gmail.com', '0904355934', 2, 3045521.1, 'banned', '2024-05-13 09:22:31');
INSERT INTO User (username, password_hash, email, phone, role_id, balance, status, created_at) VALUES ('user10', '848244c3188b3bfc15473564ef7f0fad3d90f094ed33a22b459e5c105781dbaf', 'user10@gmail.com', '0903764831', 2, 569302.92, 'banned', '2025-09-13 09:22:31');
INSERT INTO User (username, password_hash, email, phone, role_id, balance, status, created_at) VALUES ('user11', 'a598a006b9d162f432e35b2014c274165e9a7f0968ead27b8ab45b26aa1384ee', 'user11@gmail.com', '0903562008', 3, 1374273.73, 'banned', '2023-06-28 09:22:31');
INSERT INTO User (username, password_hash, email, phone, role_id, balance, status, created_at) VALUES ('user12', 'c45f5884947ce6d0b75f909a25bb9660800e9cb675df3c2efda822bbb818f5f6', 'user12@gmail.com', '0903096981', 3, 2135387.07, 'pending', '2023-04-24 09:22:31');
INSERT INTO User (username, password_hash, email, phone, role_id, balance, status, created_at) VALUES ('user13', '7b10d61e75b2d728c6d8fefac96ebfb6b153802feb53c0c837f83a7a19c379d9', 'user13@gmail.com', '0909158712', 1, 4705648.92, 'banned', '2024-12-08 09:22:31');
INSERT INTO User (username, password_hash, email, phone, role_id, balance, status, created_at) VALUES ('user14', 'ffb60b98d325729d305ffa377dacc4b6917d874f6c1a5a38a5c37b1bfb470665', 'user14@gmail.com', '0902588889', 2, 2152791.52, 'banned', '2024-09-24 09:22:31');
INSERT INTO User (username, password_hash, email, phone, role_id, balance, status, created_at) VALUES ('user15', '4034b526b3904fbe89367f9709ecdb9fe4629ff5142fb35e02e2d9ca13de72ac', 'user15@gmail.com', '0908048002', 1, 9228732.73, 'active', '2024-01-30 09:22:31');
INSERT INTO User (username, password_hash, email, phone, role_id, balance, status, created_at) VALUES ('user16', '8bb38d410b9925255a6a35ac4f2925aed868e224322af665e8ef14282abe7f2f', 'user16@gmail.com', '0909861084', 2, 2041390.33, 'pending', '2025-05-14 09:22:31');
INSERT INTO User (username, password_hash, email, phone, role_id, balance, status, created_at) VALUES ('user17', '1206ca9a614919e8e06119403acdac4b67c80abb6fdf73bdeba17f30fea77da7', 'user17@gmail.com', '0903144117', 2, 3337677.42, 'pending', '2025-07-12 09:22:31');
INSERT INTO User (username, password_hash, email, phone, role_id, balance, status, created_at) VALUES ('user18', '0c105699355ab70ef62d5562adfc9af526e9f17430e0a9f9ad64cf157b7c1982', 'user18@gmail.com', '0908704126', 2, 9058717.19, 'active', '2024-06-19 09:22:31');
INSERT INTO User (username, password_hash, email, phone, role_id, balance, status, created_at) VALUES ('user19', 'f36c6d2692826bf6fd0e69a789f3fba2397ffc93902c32c8056e062d938b4a6b', 'user19@gmail.com', '0901492493', 2, 6230250.17, 'banned', '2024-01-12 09:22:31');
INSERT INTO User (username, password_hash, email, phone, role_id, balance, status, created_at) VALUES ('user20', 'c2b6496549a8d243c97335836f90e0f1d767fd20a808d9f2d44036f25bdc7e62', 'user20@gmail.com', '0903668795', 1, 7385479.66, 'pending', '2024-05-28 09:22:31');

-- (AccountTransaction)
INSERT INTO AccountTransaction (user_id, amount, type, status, created_at) VALUES (4, 547863.5, 'payment', 'failed', '2023-07-18 09:22:31');
INSERT INTO AccountTransaction (user_id, amount, type, status, created_at) VALUES (3, 448774.02, 'withdraw', 'pending', '2023-12-21 09:22:31');
INSERT INTO AccountTransaction (user_id, amount, type, status, created_at) VALUES (12, 931723.31, 'withdraw', 'pending', '2025-10-07 09:22:31');
INSERT INTO AccountTransaction (user_id, amount, type, status, created_at) VALUES (19, 650402.86, 'withdraw', 'pending', '2023-09-24 09:22:31');
INSERT INTO AccountTransaction (user_id, amount, type, status, created_at) VALUES (9, 962217.71, 'deposit', 'completed', '2025-03-03 09:22:31');
INSERT INTO AccountTransaction (user_id, amount, type, status, created_at) VALUES (13, 110479.1, 'payment', 'failed', '2023-09-11 09:22:31');
INSERT INTO AccountTransaction (user_id, amount, type, status, created_at) VALUES (19, 899527.31, 'deposit', 'pending', '2023-03-26 09:22:31');
INSERT INTO AccountTransaction (user_id, amount, type, status, created_at) VALUES (1, 759355.73, 'deposit', 'failed', '2025-08-02 09:22:31');
INSERT INTO AccountTransaction (user_id, amount, type, status, created_at) VALUES (10, 498544.15, 'deposit', 'failed', '2024-05-07 09:22:31');
INSERT INTO AccountTransaction (user_id, amount, type, status, created_at) VALUES (20, 649158.75, 'payment', 'completed', '2024-10-11 09:22:31');
INSERT INTO AccountTransaction (user_id, amount, type, status, created_at) VALUES (6, 150405.61, 'payment', 'failed', '2025-03-15 09:22:31');
INSERT INTO AccountTransaction (user_id, amount, type, status, created_at) VALUES (2, 836450.08, 'withdraw', 'completed', '2025-04-27 09:22:31');
INSERT INTO AccountTransaction (user_id, amount, type, status, created_at) VALUES (12, 856602.04, 'payment', 'completed', '2025-03-30 09:22:31');
INSERT INTO AccountTransaction (user_id, amount, type, status, created_at) VALUES (18, 762332.62, 'deposit', 'pending', '2023-11-27 09:22:31');
INSERT INTO AccountTransaction (user_id, amount, type, status, created_at) VALUES (1, 785286.82, 'withdraw', 'pending', '2025-07-20 09:22:31');
INSERT INTO AccountTransaction (user_id, amount, type, status, created_at) VALUES (18, 246611.76, 'payment', 'pending', '2024-03-08 09:22:31');
INSERT INTO AccountTransaction (user_id, amount, type, status, created_at) VALUES (16, 789589.34, 'payment', 'pending', '2023-06-25 09:22:31');
INSERT INTO AccountTransaction (user_id, amount, type, status, created_at) VALUES (7, 675660.85, 'withdraw', 'pending', '2025-02-17 09:22:31');
INSERT INTO AccountTransaction (user_id, amount, type, status, created_at) VALUES (8, 734688.2, 'withdraw', 'pending', '2023-08-29 09:22:31');
INSERT INTO AccountTransaction (user_id, amount, type, status, created_at) VALUES (13, 466971.76, 'deposit', 'completed', '2024-04-25 09:22:31');

-- (Product)
INSERT INTO Product (seller_id, name, categories, description, start_price, estimate_price, deposit, image_url, status, created_at) VALUES (17, 'Profit-focused intermediate orchestration', 'Điện tử', 'Test image bank general box meeting without garden. Avoid same stay shoulder.', 3750598.04, '5902509', 375059.8, 'https://example.com/img/1.jpg', 'cancelled', '2025-08-21 09:22:31');
INSERT INTO Product (seller_id, name, categories, description, start_price, estimate_price, deposit, image_url, status, created_at) VALUES (6, 'Public-key value-added customer loyalty', 'Điện tử', 'Smile growth be. Wear north score prevent institution work.', 4388954.75, '8184622', 438895.48, 'https://example.com/img/2.jpg', 'approved', '2024-01-01 09:22:31');
INSERT INTO Product (seller_id, name, categories, description, start_price, estimate_price, deposit, image_url, status, created_at) VALUES (8, 'Face-to-face well-modulated throughput', 'Thời trang', 'Its manager simply position door color attention. Away as begin research democratic there.', 1475846.1, '2417798', 147584.61, 'https://example.com/img/3.jpg', 'sold', '2025-03-21 09:22:31');
INSERT INTO Product (seller_id, name, categories, description, start_price, estimate_price, deposit, image_url, status, created_at) VALUES (19, 'Realigned bi-directional database', 'Điện tử', 'Gas strong pull claim. To similar president brother between.', 257087.23, '314243', 25708.72, 'https://example.com/img/4.jpg', 'pending', '2024-05-19 09:22:31');
INSERT INTO Product (seller_id, name, categories, description, start_price, estimate_price, deposit, image_url, status, created_at) VALUES (6, 'Persevering hybrid utilization', 'Thời trang', 'Can budget feel game red house. Position choose while have yet dark woman team.', 3583916.77, '4154489', 358391.68, 'https://example.com/img/5.jpg', 'cancelled', '2023-04-09 09:22:31');
INSERT INTO Product (seller_id, name, categories, description, start_price, estimate_price, deposit, image_url, status, created_at) VALUES (7, 'Self-enabling encompassing protocol', 'Thời trang', 'Box his station not difficult of.', 2487313.5, '2843168', 248731.35, 'https://example.com/img/6.jpg', 'approved', '2025-08-02 09:22:31');
INSERT INTO Product (seller_id, name, categories, description, start_price, estimate_price, deposit, image_url, status, created_at) VALUES (2, 'Implemented full-range website', 'Nội thất', 'Sea PM against buy smile voice. Almost as week school not. News design eat suggest event.', 1310095.29, '1632905', 131009.53, 'https://example.com/img/7.jpg', 'approved', '2024-09-09 09:22:31');
INSERT INTO Product (seller_id, name, categories, description, start_price, estimate_price, deposit, image_url, status, created_at) VALUES (11, 'Synergistic optimizing forecast', 'Thời trang', 'Establish chair project give nothing. Hold data deep never much. Edge before government tonight.', 2954481.45, '4132622', 295448.15, 'https://example.com/img/8.jpg', 'sold', '2024-12-07 09:22:31');
INSERT INTO Product (seller_id, name, categories, description, start_price, estimate_price, deposit, image_url, status, created_at) VALUES (2, 'Balanced attitude-oriented Graphical User Interface', 'Nội thất', 'Sport others these court miss plant detail. Number leader nor traditional power inside.', 4340734.17, '5986819', 434073.42, 'https://example.com/img/9.jpg', 'pending', '2023-05-29 09:22:31');
INSERT INTO Product (seller_id, name, categories, description, start_price, estimate_price, deposit, image_url, status, created_at) VALUES (19, 'Sharable encompassing access', 'Nội thất', 'Whole majority community medical create. Particularly former write stay air whatever day.', 2454366.06, '4819743', 245436.61, 'https://example.com/img/10.jpg', 'approved', '2025-01-23 09:22:31');
INSERT INTO Product (seller_id, name, categories, description, start_price, estimate_price, deposit, image_url, status, created_at) VALUES (4, 'Customer-focused contextually-based task-force', 'Nội thất', 'Political Mrs he technology economic argue really. Find evidence become truth.', 664706.24, '1159904', 66470.62, 'https://example.com/img/11.jpg', 'cancelled', '2023-04-23 09:22:31');
INSERT INTO Product (seller_id, name, categories, description, start_price, estimate_price, deposit, image_url, status, created_at) VALUES (17, 'Upgradable directional product', 'Sưu tầm', 'On forward rest throughout threat teach two. Decision machine season class add career.', 4816504.04, '6721116', 481650.4, 'https://example.com/img/12.jpg', 'sold', '2025-03-03 09:22:31');
INSERT INTO Product (seller_id, name, categories, description, start_price, estimate_price, deposit, image_url, status, created_at) VALUES (15, 'Cross-group multi-state Local Area Network', 'Điện tử', 'Serious pull red participant decide. Sport music board guy much.', 1408840.66, '2776439', 140884.07, 'https://example.com/img/13.jpg', 'approved', '2025-01-07 09:22:31');
INSERT INTO Product (seller_id, name, categories, description, start_price, estimate_price, deposit, image_url, status, created_at) VALUES (20, 'Programmable object-oriented success', 'Xe cộ', 'People little bit successful. Room bit watch prevent attention poor stage stop.', 2651407.14, '3616311', 265140.71, 'https://example.com/img/14.jpg', 'sold', '2024-07-05 09:22:31');
INSERT INTO Product (seller_id, name, categories, description, start_price, estimate_price, deposit, image_url, status, created_at) VALUES (19, 'Pre-emptive dynamic neural-net', 'Điện tử', 'Space themselves adult something official kid billion.', 793287.11, '1395202', 79328.71, 'https://example.com/img/15.jpg', 'sold', '2025-03-18 09:22:31');
INSERT INTO Product (seller_id, name, categories, description, start_price, estimate_price, deposit, image_url, status, created_at) VALUES (12, 'Self-enabling zero tolerance leverage', 'Thời trang', 'West least which hundred result cover. Large music member chance economic.', 4256874.1, '6295708', 425687.41, 'https://example.com/img/16.jpg', 'approved', '2025-02-17 09:22:31');
INSERT INTO Product (seller_id, name, categories, description, start_price, estimate_price, deposit, image_url, status, created_at) VALUES (16, 'Quality-focused context-sensitive leverage', 'Nội thất', 'Number decision whatever cell something. Despite risk might alone others.', 3207644.22, '4630360', 320764.42, 'https://example.com/img/17.jpg', 'approved', '2024-08-17 09:22:31');
INSERT INTO Product (seller_id, name, categories, description, start_price, estimate_price, deposit, image_url, status, created_at) VALUES (11, 'Synergistic systematic instruction set', 'Điện tử', 'Sort start debate authority newspaper. Rather letter cause. Sea decision in suddenly pull.', 2933515.85, '3603931', 293351.59, 'https://example.com/img/18.jpg', 'cancelled', '2024-09-16 09:22:31');
INSERT INTO Product (seller_id, name, categories, description, start_price, estimate_price, deposit, image_url, status, created_at) VALUES (9, 'Streamlined human-resource pricing structure', 'Nội thất', 'Operation authority everybody. Late sister fine opportunity rule both with.', 507009.96, '633693', 50701.0, 'https://example.com/img/19.jpg', 'cancelled', '2024-04-24 09:22:31');
INSERT INTO Product (seller_id, name, categories, description, start_price, estimate_price, deposit, image_url, status, created_at) VALUES (9, 'Enhanced optimizing ability', 'Sưu tầm', 'Language talk budget affect.', 4819758.42, '7571984', 481975.84, 'https://example.com/img/20.jpg', 'cancelled', '2024-08-23 09:22:31');

-- (Image)
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (1, 'https://example.com/product_1.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (2, 'https://example.com/product_2.jpg', 1);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (3, 'https://example.com/product_3.jpg', 1);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (4, 'https://example.com/product_4.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (5, 'https://example.com/product_5.jpg', 1);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (6, 'https://example.com/product_6.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (7, 'https://example.com/product_7.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (8, 'https://example.com/product_8.jpg', 1);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (9, 'https://example.com/product_9.jpg', 1);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (10, 'https://example.com/product_10.jpg', 1);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (11, 'https://example.com/product_11.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (12, 'https://example.com/product_12.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (13, 'https://example.com/product_13.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (14, 'https://example.com/product_14.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (15, 'https://example.com/product_15.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (16, 'https://example.com/product_16.jpg', 1);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (17, 'https://example.com/product_17.jpg', 1);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (18, 'https://example.com/product_18.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (19, 'https://example.com/product_19.jpg', 1);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (20, 'https://example.com/product_20.jpg', 1);

-- (Auction)
INSERT INTO Auction (product_id, start_time, end_time, status, highest_current_price, bid_step_amount, winner_id) VALUES (1, '2023-10-03 09:22:31', '2025-11-04 09:22:31', 'cancelled', 3740880, '50000', 18);
INSERT INTO Auction (product_id, start_time, end_time, status, highest_current_price, bid_step_amount, winner_id) VALUES (2, '2023-08-10 09:22:31', '2025-10-24 09:22:31', 'open', 2048362, '20000', 7);
INSERT INTO Auction (product_id, start_time, end_time, status, highest_current_price, bid_step_amount, winner_id) VALUES (3, '2024-06-07 09:22:31', '2025-10-29 09:22:31', 'open', 4176339, '20000', 16);
INSERT INTO Auction (product_id, start_time, end_time, status, highest_current_price, bid_step_amount, winner_id) VALUES (4, '2025-05-28 09:22:31', '2025-11-11 09:22:31', 'cancelled', 589978, '50000', 6);
INSERT INTO Auction (product_id, start_time, end_time, status, highest_current_price, bid_step_amount, winner_id) VALUES (5, '2025-06-27 09:22:31', '2025-10-20 09:22:31', 'cancelled', 1693980, '20000', 6);
INSERT INTO Auction (product_id, start_time, end_time, status, highest_current_price, bid_step_amount, winner_id) VALUES (6, '2023-04-08 09:22:31', '2025-10-19 09:22:31', 'cancelled', 3633135, '20000', 18);
INSERT INTO Auction (product_id, start_time, end_time, status, highest_current_price, bid_step_amount, winner_id) VALUES (7, '2024-06-11 09:22:31', '2025-10-23 09:22:31', 'cancelled', 3247667, '20000', 16);
INSERT INTO Auction (product_id, start_time, end_time, status, highest_current_price, bid_step_amount, winner_id) VALUES (8, '2024-11-06 09:22:31', '2025-11-07 09:22:31', 'closed', 1662254, '10000', 8);
INSERT INTO Auction (product_id, start_time, end_time, status, highest_current_price, bid_step_amount, winner_id) VALUES (9, '2023-11-16 09:22:31', '2025-11-01 09:22:31', 'open', 1844351, '50000', 16);
INSERT INTO Auction (product_id, start_time, end_time, status, highest_current_price, bid_step_amount, winner_id) VALUES (10, '2025-07-23 09:22:31', '2025-10-27 09:22:31', 'closed', 1821751, '50000', 18);
INSERT INTO Auction (product_id, start_time, end_time, status, highest_current_price, bid_step_amount, winner_id) VALUES (11, '2024-05-26 09:22:31', '2025-11-11 09:22:31', 'closed', 2370632, '50000', 12);
INSERT INTO Auction (product_id, start_time, end_time, status, highest_current_price, bid_step_amount, winner_id) VALUES (12, '2023-10-03 09:22:31', '2025-10-24 09:22:31', 'open', 4936073, '10000', 16);
INSERT INTO Auction (product_id, start_time, end_time, status, highest_current_price, bid_step_amount, winner_id) VALUES (13, '2023-07-13 09:22:31', '2025-10-25 09:22:31', 'open', 1089639, '10000', 9);
INSERT INTO Auction (product_id, start_time, end_time, status, highest_current_price, bid_step_amount, winner_id) VALUES (14, '2024-10-31 09:22:31', '2025-11-10 09:22:31', 'cancelled', 4241822, '20000', 9);
INSERT INTO Auction (product_id, start_time, end_time, status, highest_current_price, bid_step_amount, winner_id) VALUES (15, '2025-05-12 09:22:31', '2025-10-29 09:22:31', 'open', 4655830, '50000', 6);
INSERT INTO Auction (product_id, start_time, end_time, status, highest_current_price, bid_step_amount, winner_id) VALUES (16, '2025-04-23 09:22:31', '2025-10-18 09:22:31', 'cancelled', 4003335, '50000', 16);
INSERT INTO Auction (product_id, start_time, end_time, status, highest_current_price, bid_step_amount, winner_id) VALUES (17, '2024-09-17 09:22:31', '2025-10-18 09:22:31', 'open', 3843770, '10000', 7);
INSERT INTO Auction (product_id, start_time, end_time, status, highest_current_price, bid_step_amount, winner_id) VALUES (18, '2023-11-30 09:22:31', '2025-10-24 09:22:31', 'open', 3598574, '50000', 17);
INSERT INTO Auction (product_id, start_time, end_time, status, highest_current_price, bid_step_amount, winner_id) VALUES (19, '2023-10-01 09:22:31', '2025-10-27 09:22:31', 'open', 1982122, '50000', 1);
INSERT INTO Auction (product_id, start_time, end_time, status, highest_current_price, bid_step_amount, winner_id) VALUES (20, '2025-01-19 09:22:31', '2025-10-19 09:22:31', 'cancelled', 2606085, '10000', 16);

-- (Bid)
INSERT INTO Bid (auction_id, bidder_id, bid_amount, created_at, max_autobid_amount, step_autobid_amount, is_auto, is_highest) VALUES (17, 18, 7156591.28, '2024-08-27 09:22:31', 8128156.28, 25017, 1, 0);
INSERT INTO Bid (auction_id, bidder_id, bid_amount, created_at, max_autobid_amount, step_autobid_amount, is_auto, is_highest) VALUES (8, 16, 7495307.87, '2023-10-04 09:22:31', 8116767.87, 7359, 1, 1);
INSERT INTO Bid (auction_id, bidder_id, bid_amount, created_at, max_autobid_amount, step_autobid_amount, is_auto, is_highest) VALUES (7, 2, 2111091.12, '2024-09-12 09:22:31', 2567433.12, 28981, 1, 0);
INSERT INTO Bid (auction_id, bidder_id, bid_amount, created_at, max_autobid_amount, step_autobid_amount, is_auto, is_highest) VALUES (15, 11, 5082631.75, '2025-08-14 09:22:31', 6054652.75, 28603, 0, 0);
INSERT INTO Bid (auction_id, bidder_id, bid_amount, created_at, max_autobid_amount, step_autobid_amount, is_auto, is_highest) VALUES (2, 15, 7665036.08, '2024-03-05 09:22:31', 7962031.08, 9684, 1, 0);
INSERT INTO Bid (auction_id, bidder_id, bid_amount, created_at, max_autobid_amount, step_autobid_amount, is_auto, is_highest) VALUES (4, 7, 1885651.49, '2024-12-02 09:22:31', 1915801.49, 25311, 1, 0);
INSERT INTO Bid (auction_id, bidder_id, bid_amount, created_at, max_autobid_amount, step_autobid_amount, is_auto, is_highest) VALUES (8, 8, 8383543.28, '2025-01-22 09:22:31', 9369262.280000001, 22128, 0, 0);
INSERT INTO Bid (auction_id, bidder_id, bid_amount, created_at, max_autobid_amount, step_autobid_amount, is_auto, is_highest) VALUES (17, 3, 7222465.9, '2023-09-05 09:22:31', 7786273.9, 35107, 0, 0);
INSERT INTO Bid (auction_id, bidder_id, bid_amount, created_at, max_autobid_amount, step_autobid_amount, is_auto, is_highest) VALUES (5, 5, 2522267.57, '2025-10-06 09:22:31', 2993873.57, 5485, 0, 1);
INSERT INTO Bid (auction_id, bidder_id, bid_amount, created_at, max_autobid_amount, step_autobid_amount, is_auto, is_highest) VALUES (1, 8, 2344405.76, '2023-10-01 09:22:31', 3205737.76, 39839, 0, 1);
INSERT INTO Bid (auction_id, bidder_id, bid_amount, created_at, max_autobid_amount, step_autobid_amount, is_auto, is_highest) VALUES (9, 15, 1720344.59, '2023-12-23 09:22:31', 2083776.59, 20481, 1, 1);
INSERT INTO Bid (auction_id, bidder_id, bid_amount, created_at, max_autobid_amount, step_autobid_amount, is_auto, is_highest) VALUES (18, 6, 8548376.33, '2024-01-23 09:22:31', 9409298.33, 10531, 1, 1);
INSERT INTO Bid (auction_id, bidder_id, bid_amount, created_at, max_autobid_amount, step_autobid_amount, is_auto, is_highest) VALUES (14, 11, 7169497.73, '2024-09-02 09:22:31', 8081200.73, 38988, 0, 1);
INSERT INTO Bid (auction_id, bidder_id, bid_amount, created_at, max_autobid_amount, step_autobid_amount, is_auto, is_highest) VALUES (2, 10, 7664459.21, '2025-01-09 09:22:31', 8077879.21, 24207, 1, 0);
INSERT INTO Bid (auction_id, bidder_id, bid_amount, created_at, max_autobid_amount, step_autobid_amount, is_auto, is_highest) VALUES (19, 7, 1616016.9, '2025-06-25 09:22:31', 2345918.9, 27809, 1, 0);
INSERT INTO Bid (auction_id, bidder_id, bid_amount, created_at, max_autobid_amount, step_autobid_amount, is_auto, is_highest) VALUES (7, 4, 2415236.72, '2023-12-27 09:22:31', 2513475.72, 28529, 0, 1);
INSERT INTO Bid (auction_id, bidder_id, bid_amount, created_at, max_autobid_amount, step_autobid_amount, is_auto, is_highest) VALUES (7, 14, 8091404.3, '2024-12-16 09:22:31', 8481854.3, 35941, 1, 0);
INSERT INTO Bid (auction_id, bidder_id, bid_amount, created_at, max_autobid_amount, step_autobid_amount, is_auto, is_highest) VALUES (11, 12, 6736494.93, '2023-08-31 09:22:31', 7411660.93, 23099, 0, 1);
INSERT INTO Bid (auction_id, bidder_id, bid_amount, created_at, max_autobid_amount, step_autobid_amount, is_auto, is_highest) VALUES (10, 12, 6640366.5, '2024-03-20 09:22:31', 6875234.5, 11532, 0, 1);
INSERT INTO Bid (auction_id, bidder_id, bid_amount, created_at, max_autobid_amount, step_autobid_amount, is_auto, is_highest) VALUES (11, 14, 215121.41, '2023-03-10 09:22:31', 476820.41000000003, 26882, 1, 0);

-- (Notification)
INSERT INTO Notification (user_id, message, type, is_read, created_at) VALUES (10, 'Amount none floor example back kitchen join letter.', 'bid_outbid', 0, '2024-02-11 09:22:31');
INSERT INTO Notification (user_id, message, type, is_read, created_at) VALUES (16, 'Professor nearly past treatment down significant final newspaper these charge address table.', 'system', 0, '2023-07-13 09:22:31');
INSERT INTO Notification (user_id, message, type, is_read, created_at) VALUES (13, 'Glass skin strategy government total so opportunity hour art.', 'auction_update', 1, '2025-05-04 09:22:31');
INSERT INTO Notification (user_id, message, type, is_read, created_at) VALUES (19, 'Sit down either sing goal information.', 'auction_update', 0, '2023-12-22 09:22:31');
INSERT INTO Notification (user_id, message, type, is_read, created_at) VALUES (10, 'Music food apply upon general physical region everybody.', 'system', 1, '2024-09-03 09:22:31');
INSERT INTO Notification (user_id, message, type, is_read, created_at) VALUES (4, 'Serve easy partner over nature me less right cost.', 'system', 0, '2023-12-02 09:22:31');
INSERT INTO Notification (user_id, message, type, is_read, created_at) VALUES (7, 'Person reveal none art skin character car improve break common such within.', 'auction_update', 0, '2023-03-22 09:22:31');
INSERT INTO Notification (user_id, message, type, is_read, created_at) VALUES (8, 'Per close there film one field set protect green.', 'auction_update', 1, '2024-04-23 09:22:31');
INSERT INTO Notification (user_id, message, type, is_read, created_at) VALUES (14, 'Ahead sport up line admit family such so include those reflect also.', 'system', 1, '2024-10-09 09:22:31');
INSERT INTO Notification (user_id, message, type, is_read, created_at) VALUES (14, 'Military newspaper night speech agreement office news each.', 'system', 0, '2023-09-02 09:22:31');
INSERT INTO Notification (user_id, message, type, is_read, created_at) VALUES (9, 'Enter stock usually finally office ten bring eight project investment responsibility company.', 'bid_outbid', 0, '2023-03-20 09:22:31');
INSERT INTO Notification (user_id, message, type, is_read, created_at) VALUES (10, 'Something senior five major care south discuss camera about officer me spend.', 'bid_outbid', 0, '2024-06-18 09:22:31');
INSERT INTO Notification (user_id, message, type, is_read, created_at) VALUES (3, 'Trouble into serve enjoy tell financial.', 'system', 0, '2024-01-19 09:22:31');
INSERT INTO Notification (user_id, message, type, is_read, created_at) VALUES (1, 'Society between task less bill behavior old.', 'system', 0, '2025-04-03 09:22:31');
INSERT INTO Notification (user_id, message, type, is_read, created_at) VALUES (5, 'Teach look with fire model list.', 'system', 0, '2024-07-04 09:22:31');
INSERT INTO Notification (user_id, message, type, is_read, created_at) VALUES (12, 'Itself little social improve Republican discussion little tax visit.', 'auction_update', 1, '2023-02-07 09:22:31');
INSERT INTO Notification (user_id, message, type, is_read, created_at) VALUES (8, 'Information across record yeah ball every mission with listen food bill.', 'auction_update', 1, '2024-03-11 09:22:31');
INSERT INTO Notification (user_id, message, type, is_read, created_at) VALUES (4, 'Yeah with knowledge least top on end defense address miss score course adult.', 'auction_update', 0, '2025-01-19 09:22:31');
INSERT INTO Notification (user_id, message, type, is_read, created_at) VALUES (5, 'Back another live control start point subject way pressure this upon dinner.', 'auction_update', 0, '2024-04-19 09:22:31');
INSERT INTO Notification (user_id, message, type, is_read, created_at) VALUES (5, 'Read case would trade nation player wrong.', 'auction_update', 1, '2023-12-02 09:22:31');

-- (Feedback)
INSERT INTO Feedback (auction_id, user_id, rating, comment, created_at) VALUES (18, 4, 2, 'Its college according eight wide west partner. Dark account style wind.', '2023-02-10 09:22:31');
INSERT INTO Feedback (auction_id, user_id, rating, comment, created_at) VALUES (2, 2, 2, 'Beyond to environmental two long government.', '2025-05-23 09:22:31');
INSERT INTO Feedback (auction_id, user_id, rating, comment, created_at) VALUES (7, 19, 5, 'Despite money watch tell lose. That rate although.', '2024-10-09 09:22:31');
INSERT INTO Feedback (auction_id, user_id, rating, comment, created_at) VALUES (6, 16, 3, 'Recently ability chair run physical get.', '2024-12-30 09:22:31');
INSERT INTO Feedback (auction_id, user_id, rating, comment, created_at) VALUES (11, 2, 2, 'Security knowledge every new field affect here. Leg notice major.', '2023-05-04 09:22:31');
INSERT INTO Feedback (auction_id, user_id, rating, comment, created_at) VALUES (17, 17, 2, 'Marriage hotel why up easy store my. Player perform second few player.', '2023-08-01 09:22:31');
INSERT INTO Feedback (auction_id, user_id, rating, comment, created_at) VALUES (15, 1, 4, 'Hard adult century current. Decision practice edge fly get fund.', '2025-02-20 09:22:31');
INSERT INTO Feedback (auction_id, user_id, rating, comment, created_at) VALUES (9, 6, 2, 'Ahead interest sign share energy.', '2025-08-26 09:22:31');
INSERT INTO Feedback (auction_id, user_id, rating, comment, created_at) VALUES (3, 7, 5, 'Realize action store son attention one enter push. Nothing west now so.', '2024-09-27 09:22:31');
INSERT INTO Feedback (auction_id, user_id, rating, comment, created_at) VALUES (18, 16, 4, 'Effort enjoy eat. Art can matter only seven.', '2024-05-30 09:22:31');
INSERT INTO Feedback (auction_id, user_id, rating, comment, created_at) VALUES (9, 3, 4, 'Fish late media miss chance wind shoulder.', '2023-06-05 09:22:31');
INSERT INTO Feedback (auction_id, user_id, rating, comment, created_at) VALUES (20, 11, 2, 'To allow four hit. Whether final service involve attack.', '2024-03-09 09:22:31');
INSERT INTO Feedback (auction_id, user_id, rating, comment, created_at) VALUES (7, 2, 4, 'Arm true method knowledge goal relate wonder.', '2024-02-08 09:22:31');
INSERT INTO Feedback (auction_id, user_id, rating, comment, created_at) VALUES (18, 4, 5, 'Step several imagine stand poor. Sister bill culture indeed early.', '2024-12-16 09:22:31');
INSERT INTO Feedback (auction_id, user_id, rating, comment, created_at) VALUES (2, 1, 2, 'Father yourself seven glass her over recognize. President back agree.', '2025-07-12 09:22:31');
INSERT INTO Feedback (auction_id, user_id, rating, comment, created_at) VALUES (20, 14, 4, 'Medical message focus point group day. Page mouth prepare certain.', '2024-12-22 09:22:31');
INSERT INTO Feedback (auction_id, user_id, rating, comment, created_at) VALUES (6, 18, 3, 'Weight campaign information respond.', '2024-09-11 09:22:31');
INSERT INTO Feedback (auction_id, user_id, rating, comment, created_at) VALUES (16, 7, 2, 'Believe may stop building tell customer mind.', '2025-05-26 09:22:31');
INSERT INTO Feedback (auction_id, user_id, rating, comment, created_at) VALUES (17, 8, 1, 'Explain receive you agree. Test star inside trip. Suddenly sort minute.', '2025-05-31 09:22:31');
INSERT INTO Feedback (auction_id, user_id, rating, comment, created_at) VALUES (8, 14, 1, 'Right nothing finish deal conference. Approach popular issue there ask.', '2025-09-11 09:22:31');

-- (TransactionAfterAuction)
INSERT INTO TransactionAfterAuction (auction_id, seller_id, buyer_id, amount, status, updated_at) VALUES (18, 16, 19, 1571189.47, 'completed', '2023-02-19 09:22:31');
INSERT INTO TransactionAfterAuction (auction_id, seller_id, buyer_id, amount, status, updated_at) VALUES (6, 2, 18, 3318395.81, 'pending', '2025-07-13 09:22:31');
INSERT INTO TransactionAfterAuction (auction_id, seller_id, buyer_id, amount, status, updated_at) VALUES (16, 1, 3, 9012015.45, 'cancelled', '2025-07-22 09:22:31');
INSERT INTO TransactionAfterAuction (auction_id, seller_id, buyer_id, amount, status, updated_at) VALUES (13, 16, 15, 7378931.17, 'pending', '2025-04-12 09:22:31');
INSERT INTO TransactionAfterAuction (auction_id, seller_id, buyer_id, amount, status, updated_at) VALUES (7, 18, 2, 4645736.23, 'cancelled', '2025-09-14 09:22:31');
INSERT INTO TransactionAfterAuction (auction_id, seller_id, buyer_id, amount, status, updated_at) VALUES (9, 7, 5, 6296299.95, 'pending', '2023-02-12 09:22:31');
INSERT INTO TransactionAfterAuction (auction_id, seller_id, buyer_id, amount, status, updated_at) VALUES (4, 18, 7, 3040313.92, 'cancelled', '2024-04-29 09:22:31');
INSERT INTO TransactionAfterAuction (auction_id, seller_id, buyer_id, amount, status, updated_at) VALUES (12, 18, 16, 5408700.83, 'cancelled', '2024-10-03 09:22:31');
INSERT INTO TransactionAfterAuction (auction_id, seller_id, buyer_id, amount, status, updated_at) VALUES (14, 15, 14, 2687090.99, 'completed', '2023-06-06 09:22:31');
INSERT INTO TransactionAfterAuction (auction_id, seller_id, buyer_id, amount, status, updated_at) VALUES (8, 8, 3, 9741346.3, 'cancelled', '2023-08-25 09:22:31');
INSERT INTO TransactionAfterAuction (auction_id, seller_id, buyer_id, amount, status, updated_at) VALUES (19, 10, 18, 7020051.53, 'pending', '2025-03-03 09:22:31');
INSERT INTO TransactionAfterAuction (auction_id, seller_id, buyer_id, amount, status, updated_at) VALUES (11, 7, 7, 3340246.96, 'pending', '2025-09-18 09:22:31');
INSERT INTO TransactionAfterAuction (auction_id, seller_id, buyer_id, amount, status, updated_at) VALUES (19, 12, 3, 5520216.86, 'pending', '2024-04-22 09:22:31');
INSERT INTO TransactionAfterAuction (auction_id, seller_id, buyer_id, amount, status, updated_at) VALUES (16, 6, 14, 8783299.03, 'completed', '2025-01-15 09:22:31');
INSERT INTO TransactionAfterAuction (auction_id, seller_id, buyer_id, amount, status, updated_at) VALUES (3, 1, 19, 3401672.74, 'pending', '2024-01-01 09:22:31');
INSERT INTO TransactionAfterAuction (auction_id, seller_id, buyer_id, amount, status, updated_at) VALUES (15, 18, 19, 272533.95, 'cancelled', '2023-04-16 09:22:31');
INSERT INTO TransactionAfterAuction (auction_id, seller_id, buyer_id, amount, status, updated_at) VALUES (13, 20, 20, 5776540.48, 'cancelled', '2023-07-03 09:22:31');
INSERT INTO TransactionAfterAuction (auction_id, seller_id, buyer_id, amount, status, updated_at) VALUES (1, 3, 2, 9742281.22, 'cancelled', '2024-05-01 09:22:31');
INSERT INTO TransactionAfterAuction (auction_id, seller_id, buyer_id, amount, status, updated_at) VALUES (17, 8, 1, 211501.52, 'completed', '2025-03-24 09:22:31');
INSERT INTO TransactionAfterAuction (auction_id, seller_id, buyer_id, amount, status, updated_at) VALUES (7, 6, 17, 5953242.44, 'completed', '2023-10-27 09:22:31');

-- (AdminLog)
INSERT INTO AdminLog (admin_id, action, ip_address, created_at) VALUES (14, 'Building marriage every hospital.', '190.17.223.239', '2025-05-21 09:22:31');
INSERT INTO AdminLog (admin_id, action, ip_address, created_at) VALUES (1, 'Identify member yeah conference difficult need.', '56.234.212.211', '2024-02-22 09:22:31');
INSERT INTO AdminLog (admin_id, action, ip_address, created_at) VALUES (15, 'Authority back produce police full meeting sort attention.', '163.36.208.253', '2024-02-03 09:22:31');
INSERT INTO AdminLog (admin_id, action, ip_address, created_at) VALUES (6, 'Air book yourself prepare turn alone card.', '35.143.14.81', '2024-04-16 09:22:31');
INSERT INTO AdminLog (admin_id, action, ip_address, created_at) VALUES (18, 'Indeed bag kind several performance prevent alone social crime.', '193.43.235.171', '2025-06-03 09:22:31');
INSERT INTO AdminLog (admin_id, action, ip_address, created_at) VALUES (6, 'Seven close beat expect though claim notice.', '196.54.151.237', '2023-04-06 09:22:31');
INSERT INTO AdminLog (admin_id, action, ip_address, created_at) VALUES (16, 'Guess difference for instead coach dark reduce learn.', '97.69.151.139', '2023-09-19 09:22:31');
INSERT INTO AdminLog (admin_id, action, ip_address, created_at) VALUES (10, 'Machine use them thought economy.', '129.52.209.125', '2023-04-14 09:22:31');
INSERT INTO AdminLog (admin_id, action, ip_address, created_at) VALUES (13, 'Traditional size per home another office.', '197.134.147.122', '2023-06-21 09:22:31');
INSERT INTO AdminLog (admin_id, action, ip_address, created_at) VALUES (14, 'Pull pass lead general upon data use.', '102.120.142.83', '2023-07-03 09:22:31');
INSERT INTO AdminLog (admin_id, action, ip_address, created_at) VALUES (14, 'Prepare personal performance north experience he become outside security effort.', '58.91.22.251', '2023-12-30 09:22:31');
INSERT INTO AdminLog (admin_id, action, ip_address, created_at) VALUES (1, 'Now usually alone low loss miss ten maybe.', '80.135.110.152', '2024-08-20 09:22:31');
INSERT INTO AdminLog (admin_id, action, ip_address, created_at) VALUES (19, 'Company those wonder begin accept Congress meet close white.', '114.102.138.119', '2023-10-02 09:22:31');
INSERT INTO AdminLog (admin_id, action, ip_address, created_at) VALUES (17, 'Style if security tree bill lot wonder color reality.', '62.204.125.99', '2024-11-13 09:22:31');
INSERT INTO AdminLog (admin_id, action, ip_address, created_at) VALUES (20, 'Increase military myself could something dark officer world account everything.', '167.171.242.233', '2024-04-23 09:22:31');
INSERT INTO AdminLog (admin_id, action, ip_address, created_at) VALUES (5, 'History full wish financial.', '176.12.242.112', '2023-02-20 09:22:31');
INSERT INTO AdminLog (admin_id, action, ip_address, created_at) VALUES (2, 'Heart since plan herself court long now price.', '61.70.228.171', '2024-04-13 09:22:31');
INSERT INTO AdminLog (admin_id, action, ip_address, created_at) VALUES (12, 'Policy good although like often rich television market up.', '189.176.1.143', '2024-06-02 09:22:31');
INSERT INTO AdminLog (admin_id, action, ip_address, created_at) VALUES (10, 'Republican blue laugh several season rise.', '206.147.34.30', '2023-04-03 09:22:31');
INSERT INTO AdminLog (admin_id, action, ip_address, created_at) VALUES (13, 'On drop than source part however idea appear.', '102.2.29.192', '2025-07-09 09:22:31');

-- (Permission)
INSERT INTO permission (permission_name, api_path, method, module, description) VALUES
-- Auth
('AUTH_REGISTER', '/api/auth/register', 'POST', 'auth', 'Đăng ký tài khoản'),
('AUTH_LOGIN', '/api/auth/login', 'POST', 'auth', 'Đăng nhập'),
('AUTH_VERIFY', '/api/auth/verify', 'GET', 'auth', 'Xác thực email'),
('AUTH_RESEND_VERIFICATION', '/api/auth/resend-verification', 'POST', 'auth', 'Gửi lại email xác thực'),

-- Roles
('ROLE_CREATE', '/api/roles', 'POST', 'role', 'Tạo role'),
('ROLE_LIST', '/api/roles', 'GET', 'role', 'Danh sách role'),
('ROLE_GET', '/api/roles/{id}', 'GET', 'role', 'Xem role'),
('ROLE_UPDATE', '/api/roles/{id}', 'PATCH', 'role', 'Cập nhật role'),
('ROLE_DELETE', '/api/roles/{id}', 'DELETE', 'role', 'Xóa role'),

-- Permissions
('PERMISSION_CREATE', '/api/permissions', 'POST', 'permission', 'Tạo permission'),
('PERMISSION_LIST', '/api/permissions', 'GET', 'permission', 'Danh sách permission'),
('PERMISSION_GET', '/api/permissions/{id}', 'GET', 'permission', 'Xem permission'),
('PERMISSION_UPDATE', '/api/permissions/{id}', 'PATCH', 'permission', 'Cập nhật permission'),
('PERMISSION_DELETE', '/api/permissions/{id}', 'DELETE', 'permission', 'Xóa permission'),

-- Auctions
('AUCTION_CREATE', '/api/auctions', 'POST', 'auction', 'Tạo phiên đấu giá'),
('AUCTION_LIST', '/api/auctions', 'GET', 'auction', 'Danh sách phiên đấu giá'),
('AUCTION_GET', '/api/auctions/{id}', 'GET', 'auction', 'Xem phiên đấu giá'),
('AUCTION_UPDATE', '/api/auctions/{id}', 'PUT', 'auction', 'Cập nhật phiên đấu giá'),
('AUCTION_DELETE', '/api/auctions/{id}', 'DELETE', 'auction', 'Xóa phiên đấu giá'),
('AUCTION_START', '/api/auctions/{auctionId}/start', 'POST', 'auction', 'Bắt đầu đấu giá'),
('AUCTION_CLOSE', '/api/auctions/{auctionId}/close', 'POST', 'auction', 'Đóng đấu giá'),

-- Bids
('BID_PLACE', '/api/bids', 'POST', 'bid', 'Đặt giá thầu'),
('BID_AUTO', '/api/bids/auto', 'POST', 'bid', 'Đặt giá thầu tự động'),
('BID_BY_AUCTION', '/api/bids/auction/{auctionId}', 'GET', 'bid', 'Danh sách bid theo auction'),
('BID_HIGHEST', '/api/bids/auction/{auctionId}/highest', 'GET', 'bid', 'Bid cao nhất của auction'),
('BID_BY_USER', '/api/bids/user/{userId}', 'GET', 'bid', 'Danh sách bid theo user'),

-- Upload
('UPLOAD_SINGLE', '/api/upload', 'POST', 'upload', 'Upload ảnh đơn'),
('UPLOAD_MULTIPLE', '/api/upload/multiple', 'POST', 'upload', 'Upload nhiều ảnh'),

-- Products
('PRODUCT_CREATE', '/api/products', 'POST', 'product', 'Tạo sản phẩm'),
('PRODUCT_UPDATE', '/api/products/{id}', 'PUT', 'product', 'Cập nhật sản phẩm'),
('PRODUCT_PAGE', '/api/products/page', 'GET', 'product', 'Danh sách sản phẩm phân trang'),
('PRODUCT_GET', '/api/products/{id}', 'GET', 'product', 'Xem sản phẩm'),
('PRODUCT_DELETE', '/api/products/{id}', 'DELETE', 'product', 'Xóa sản phẩm'),
('PRODUCT_MY_PAGE', '/api/products/seller/me/page', 'GET', 'product', 'Danh sách sản phẩm của tôi'),
('PRODUCT_APPROVE', '/api/products/{id}/approve', 'PUT', 'product', 'Duyệt sản phẩm'),
('PRODUCT_REQUEST_APPROVAL', '/api/products/{id}/approval-request', 'POST', 'product', 'Gửi yêu cầu duyệt'),

-- User warnings
('WARNING_CREATE', '/api/warnings', 'POST', 'warning', 'Tạo cảnh báo'),
('WARNING_LIST', '/api/warnings', 'GET', 'warning', 'Danh sách cảnh báo'),
('WARNING_BY_USER', '/api/warnings/user/{userId}', 'GET', 'warning', 'Cảnh báo theo user'),
('WARNING_BY_TXN', '/api/warnings/transaction/{txnId}', 'GET', 'warning', 'Cảnh báo theo giao dịch'),
('WARNING_AUTO', '/api/warnings/auto-warn', 'POST', 'warning', 'Tự động cảnh báo'),

-- User reports
('USER_REPORT_CREATE', '/api/user-reports', 'POST', 'user-report', 'Tạo báo cáo người dùng'),
('USER_REPORT_BY_USER', '/api/user-reports/user/{userId}', 'GET', 'user-report', 'Báo cáo theo user'),
('USER_REPORT_LIST', '/api/user-reports', 'GET', 'user-report', 'Danh sách báo cáo'),

-- Account transactions
('ACCOUNT_DEPOSIT', '/api/account/deposit', 'POST', 'account', 'Nạp tiền'),
('ACCOUNT_WITHDRAW', '/api/account/withdraw', 'POST', 'account', 'Rút tiền'),
('ACCOUNT_CONFIRM_WITHDRAW', '/api/account/withdraw/confirm/{id}', 'POST', 'account', 'Xác nhận rút'),
('ACCOUNT_BY_USER', '/api/account/user/{userId}', 'GET', 'account', 'Lịch sử giao dịch theo user'),
('ACCOUNT_WITHDRAWABLE', '/api/account/user/{userId}/withdrawable', 'GET', 'account', 'Số dư khả dụng để rút'),

-- Transactions after auction
('TXN_AFTER_PAY', '/api/transactions/after-auction/{txnId}/pay', 'POST', 'transaction', 'Thanh toán giao dịch sau đấu giá'),
('TXN_AFTER_UPDATE_STATUS', '/api/transactions/after-auction/{txnId}/status', 'PUT', 'transaction', 'Cập nhật trạng thái giao dịch'),
('TXN_AFTER_CANCEL', '/api/transactions/after-auction/{txnId}/cancel', 'PUT', 'transaction', 'Hủy giao dịch'),
('TXN_AFTER_BY_USER', '/api/transactions/after-auction/user/{userId}', 'GET', 'transaction', 'Giao dịch theo user'),
('TXN_AFTER_BY_AUCTION', '/api/transactions/after-auction/auction/{auctionId}', 'GET', 'transaction', 'Giao dịch theo phiên đấu'),

-- Users (self-service)
('USER_ME', '/api/users/me', 'GET', 'user', 'Xem thông tin của tôi'),
('USER_PUBLIC_PROFILE', '/api/users/{id}', 'GET', 'user', 'Xem public profile'),
('USER_UPDATE_ME', '/api/users/me', 'PUT', 'user', 'Cập nhật thông tin của tôi'),
('USER_CHANGE_PASSWORD', '/api/users/change-password', 'PATCH', 'user', 'Đổi mật khẩu'),
('USER_UPDATE_AVATAR', '/api/users/me/avatar', 'PUT', 'user', 'Cập nhật avatar'),

-- Admin users
('ADMIN_USERS_LIST', '/api/superadmin/users', 'GET', 'admin-user', 'Danh sách user'),
('ADMIN_USER_GET', '/api/superadmin/users/{id}', 'GET', 'admin-user', 'Xem user'),
('ADMIN_USER_UPDATE', '/api/superadmin/users/{id}', 'PUT', 'admin-user', 'Cập nhật user'),
('ADMIN_USER_BAN', '/api/superadmin/users/{id}/ban', 'PUT', 'admin-user', 'Khóa user'),
('ADMIN_USER_UNBAN', '/api/superadmin/users/{id}/unban', 'PUT', 'admin-user', 'Mở khóa user'),
('ADMIN_USER_DELETE', '/api/superadmin/users/{id}', 'DELETE', 'admin-user', 'Xóa user'),
('ADMIN_USER_SOFT_DELETE', '/api/superadmin/users/{id}/soft-delete', 'PUT', 'admin-user', 'Soft delete user'),
('ADMIN_USER_TRANSACTIONS', '/api/superadmin/users/{id}/transactions', 'GET', 'admin-user', 'Lịch sử giao dịch user');

-- (RolePermission)
-- gán tất cả permission cho role ADMIN
INSERT IGNORE INTO rolePermission (role_id, permission_id)
SELECT r.role_id, p.permission_id
FROM role r
CROSS JOIN permission p
WHERE UPPER(r.role_name) = 'ADMIN';