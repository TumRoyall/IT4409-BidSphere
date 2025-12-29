use auction_system;

-- (Role)
INSERT INTO role (role_name, description, is_active, is_deleted)
VALUES
  ('BIDDER', 'Người dùng đấu giá/bid', 1, 0),
  ('SELLER', 'Người đăng và quản lý sản phẩm', 1, 0),
  ('ADMIN', 'Quản trị hệ thống (super admin)', 1, 0),
  ('MODERATOR', 'Kiểm duyệt (quản lý auction, product, duyệt yêu cầu)', 1, 0);

-- (User)
-- (User)

INSERT INTO User (username, password_hash, email, phone, role_id, balance, status, created_at)
VALUES ('nguyenvana', 'aa77dcf3dc8e327a40950c09d8d772a720ae3d4e2fa25a2a87426efc00a552f6', 'nguyenvana@gmail.com', '0906059826', 2, 8755465.14, 'active', '2023-11-24 09:22:31');

INSERT INTO User (username, password_hash, email, phone, role_id, balance, status, created_at)
VALUES ('tranthibich', 'dce789a2b1e560ac2c7f995774557a0b0121e6e7e5dcdf2ef30ab5887ceba1ae', 'tranthibich@gmail.com', '0902376946', 2, 810151.87, 'banned', '2026-06-29 09:22:31');

INSERT INTO User (username, password_hash, email, phone, role_id, balance, status, created_at)
VALUES ('lehoangnam', 'a7c75fc69cc970b2dc33cb5daf417b93d617215597952ca4cab4af98f49dfddf', 'lehoangnam@gmail.com', '0909247366', 1, 8234969.85, 'pending', '2024-04-16 09:22:31');

INSERT INTO User (username, password_hash, email, phone, role_id, balance, status, created_at)
VALUES ('phamthilan', '1d91730ee2cbb5cfc6064562f87bcbc49951529c09d27a02d71521ee3f67a5f0', 'phamthilan@gmail.com', '0905816710', 1, 7960870.05, 'banned', '2026-07-28 09:22:31');

INSERT INTO User (username, password_hash, email, phone, role_id, balance, status, created_at)
VALUES ('vominhtuan', '24c57b81657fcefdc9fadbd00e39f3248f53a209cb9e66534b101d682b910853', 'vominhtuan@gmail.com', '0904412087', 1, 6083306.84, 'active', '2024-03-10 09:22:31');

INSERT INTO User (username, password_hash, email, phone, role_id, balance, status, created_at)
VALUES ('dangthanhson', '875109af682dc553750f1c924ae2bb49288ef09d72a96e7d3834f291ea79ce1a', 'dangthanhson@gmail.com', '0906603367', 3, 6963678.9, 'active', '2023-07-17 09:22:31');

INSERT INTO User (username, password_hash, email, phone, role_id, balance, status, created_at)
VALUES ('nguyenthuha', '8c3595b573feb3a0635bc593a92335d1ae2acbd067b771469b411523ac413b9f', 'nguyenthuha@gmail.com', '0904829476', 2, 8721229.94, 'active', '2023-05-20 09:22:31');

INSERT INTO User (username, password_hash, email, phone, role_id, balance, status, created_at)
VALUES ('buiducanh', '1756a1918b626bee0da6b1f96162d808c9933b53a6c8f49f1d7c4c543dfc897c', 'buiducanh@gmail.com', '0907321817', 2, 1761040.27, 'pending', '2025-06-06 09:22:31');

INSERT INTO User (username, password_hash, email, phone, role_id, balance, status, created_at)
VALUES ('phamquanghai', 'a1f6c0a15019f9d7cd65ae33f531530877d22618cea384175fc444fe556acf43', 'phamquanghai@gmail.com', '0904355934', 2, 3045521.1, 'banned', '2026-05-13 09:22:31');

INSERT INTO User (username, password_hash, email, phone, role_id, balance, status, created_at)
VALUES ('trankhanhlinh', '848244c3188b3bfc15473564ef7f0fad3d90f094ed33a22b459e5c105781dbaf', 'trankhanhlinh@gmail.com', '0903764831', 2, 569302.92, 'banned', '2026-09-13 09:22:31');

INSERT INTO User (username, password_hash, email, phone, role_id, balance, status, created_at)
VALUES ('hoangminhquan', 'a598a006b9d162f432e35b2014c274165e9a7f0968ead27b8ab45b26aa1384ee', 'hoangminhquan@gmail.com', '0903562008', 3, 1374273.73, 'banned', '2026-06-28 09:22:31');

INSERT INTO User (username, password_hash, email, phone, role_id, balance, status, created_at)
VALUES ('doanhthuong', 'c45f5884947ce6d0b75f909a25bb9660800e9cb675df3c2efda822bbb818f5f6', 'doanhthuong@gmail.com', '0903096981', 3, 2135387.07, 'pending', '2023-04-24 09:22:31');

INSERT INTO User (username, password_hash, email, phone, role_id, balance, status, created_at)
VALUES ('luongtuananh', '7b10d61e75b2d728c6d8fefac96ebfb6b153802feb53c0c837f83a7a19c379d9', 'luongtuananh@gmail.com', '0909158712', 1, 4705648.92, 'banned', '2024-12-08 09:22:31');

INSERT INTO User (username, password_hash, email, phone, role_id, balance, status, created_at)
VALUES ('nguyenphuongthao', 'ffb60b98d325729d305ffa377dacc4b6917d874f6c1a5a38a5c37b1bfb470665', 'nguyenphuongthao@gmail.com', '0902588889', 2, 2152791.52, 'banned', '2026-09-24 09:22:31');

INSERT INTO User (username, password_hash, email, phone, role_id, balance, status, created_at)
VALUES ('phamductrung', '4034b526b3904fbe89367f9709ecdb9fe4629ff5142fb35e02e2d9ca13de72ac', 'phamductrung@gmail.com', '0908048002', 1, 9228732.73, 'active', '2024-01-30 09:22:31');

INSERT INTO User (username, password_hash, email, phone, role_id, balance, status, created_at)
VALUES ('tranhoainam', '8bb38d410b9925255a6a35ac4f2925aed868e224322af665e8ef14282abe7f2f', 'tranhoainam@gmail.com', '0909861084', 2, 2041390.33, 'pending', '2025-05-14 09:22:31');

INSERT INTO User (username, password_hash, email, phone, role_id, balance, status, created_at)
VALUES ('vuquocviet', '1206ca9a614919e8e06119403acdac4b67c80abb6fdf73bdeba17f30fea77da7', 'vuquocviet@gmail.com', '0903144117', 2, 3337677.42, 'pending', '2025-07-12 09:22:31');

INSERT INTO User (username, password_hash, email, phone, role_id, balance, status, created_at)
VALUES ('nguyenthanhdat', '0c105699355ab70ef62d5562adfc9af526e9f17430e0a9f9ad64cf157b7c1982', 'nguyenthanhdat@gmail.com', '0908704126', 2, 9058717.19, 'active', '2024-06-19 09:22:31');

INSERT INTO User (username, password_hash, email, phone, role_id, balance, status, created_at)
VALUES ('leminhtri', 'f36c6d2692826bf6fd0e69a789f3fba2397ffc93902c32c8056e062d938b4a6b', 'leminhtri@gmail.com', '0901492493', 2, 6230250.17, 'banned', '2026-01-12 09:22:31');

INSERT INTO User (username, password_hash, email, phone, role_id, balance, status, created_at)
VALUES ('danghoanglong', 'c2b6496549a8d243c97335836f90e0f1d767fd20a808d9f2d44036f25bdc7e62', 'danghoanglong@gmail.com', '0903668795', 1, 7385479.66, 'pending', '2024-05-28 09:22:31');

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
-- Product 1 (Điện tử)
INSERT INTO Product (seller_id, name, categories, description, start_price, estimate_price, deposit, image_url, status, created_at) 
VALUES (
  17,
  'Điện thoại Samsung Galaxy S25',
  'Điện tử',
  'Điện thoại cao cấp với màn hình AMOLED 6.7 inch, camera 108MP và pin 5000mAh.',
  3750598.04,
  '5902509',
  375059.8,
  'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766441194/auction_images/udxcgvfq9htxkvlcvgkr.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766441195/auction_images/rmxqnljlhaxsoa9pbizk.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766441198/auction_images/kzinchuhuhvj2c738x9v.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766441200/auction_images/u8w1omzxamlettjstsaw.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766441201/auction_images/jbfonr130muwmqwbmx70.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766441203/auction_images/ehz51hkpme3eissie2vs.jpg',
  'cancelled',
  '2025-08-21 09:22:31'
);

-- Product 2 (Điện tử)
INSERT INTO Product (seller_id, name, categories, description, start_price, estimate_price, deposit, image_url, status, created_at) 
VALUES (
  6,
  'Laptop Dell XPS 15',
  'Điện tử',
  'Laptop hiệu năng cao với chip Intel i9, RAM 32GB, SSD 1TB và màn hình 4K.',
  4388954.75,
  '8184622',
  438895.48,
  'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766441194/auction_images/udxcgvfq9htxkvlcvgkr.jpg'  ,
  'approved',
  '2024-01-01 09:22:31'
);

-- Product 3 (Thời trang)
INSERT INTO Product (seller_id, name, categories, description, start_price, estimate_price, deposit, image_url, status, created_at) 
VALUES (
  8,
  'Áo khoác nam mùa đông',
  'Thời trang',
  'Áo khoác dáng dài, chống thấm nước, lót nỉ giữ ấm tuyệt vời cho mùa lạnh.',
  1475846.1,
  '2417798',
  147584.61,
  'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766447312/auction_images/cpce8cgwwrjscyhwrtst.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766447314/auction_images/f40gchliupyofg6twufc.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766447316/auction_images/wmvaou9bykecw3cefbum.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766447317/auction_images/r2fj7twbbwdaxpkiwgmx.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766447319/auction_images/wdbqwxzxiu4fqjfvkgl7.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766447321/auction_images/icszk93t63ikblgfivd6.jpg',
  'sold',
  '2025-03-21 09:22:31'
);

-- Product 4 (Điện tử)
INSERT INTO Product (seller_id, name, categories, description, start_price, estimate_price, deposit, image_url, status, created_at) 
VALUES (
  19,
  'Tai nghe Sony WH-1000XM5',
  'Điện tử',
  'Tai nghe chống ồn chủ động, pin 30 giờ, kết nối Bluetooth ổn định.',
  257087.23,
  '314243',
  25708.72,
  'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766477506/auction_images/av6ggt81so03jysbuvsz.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766477508/auction_images/wmll0shpwvsiqogyg3j2.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766477511/auction_images/w71ogacx9l7xtkammjs8.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766477513/auction_images/uyy4kbwteoohw5cylv0g.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766477515/auction_images/rcmp1krhot3ke5p53rgl.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766477517/auction_images/bbcksox2h7yn7b0imzad.jpg',
  'pending',
  '2024-05-19 09:22:31'
);

-- Product 5 (Thời trang)
INSERT INTO Product (seller_id, name, categories, description, start_price, estimate_price, deposit, image_url, status, created_at) 
VALUES (
  6,
  'Váy nữ dạ hội',
  'Thời trang',
  'Váy satin dài, kiểu dáng sang trọng, phù hợp cho sự kiện và tiệc tối.',
  3583916.77,
  '4154489',
  358391.68,
  'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766501778/auction_images/blg9l4ua6oey99sw4squ.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766501781/auction_images/htuawd443pm6znigbzge.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766501783/auction_images/bfs1fibpht0ebcnmco9o.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766501784/auction_images/f6dy9d0ln1a0xgi4gut9.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766501786/auction_images/nyebv4myighpdz76pqih.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766501788/auction_images/uoxjgborh0vorphmfpy0.jpg',
  'cancelled',
  '2023-04-09 09:22:31'
);

-- Product 6 (Thời trang)
INSERT INTO Product (seller_id, name, categories, description, start_price, estimate_price, deposit, image_url, status, created_at) 
VALUES (
  7,
  'Giày thể thao nam Nike Air Max 1',
  'Thời trang',
  'Giày thể thao êm chân, thiết kế trẻ trung, phù hợp tập luyện và đi dạo hàng ngày.',
  2487313.5,
  '2843168',
  248731.35,
  'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766502020/auction_images/uvlsicje6nbhj8sue7wu.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766502026/auction_images/gpimoduu7gkf3l4eokrg.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766502030/auction_images/grvxyocaltcxlcyhxftv.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766502034/auction_images/xmtzesqvpzdrm7ild2gs.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766502036/auction_images/g7fjcvjpq5yir57myaxw.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766502038/auction_images/oia9omzx9barpunsn19s.jpg',
  'approved',
  '2025-08-02 09:22:31'
);

-- Product 7 (Nội thất)
INSERT INTO Product (seller_id, name, categories, description, start_price, estimate_price, deposit, image_url, status, created_at) 
VALUES (
  2,
  'Bàn làm việc gỗ sồi',
  'Nội thất',
  'Bàn làm việc bằng gỗ sồi tự nhiên, chắc chắn, thiết kế hiện đại, phù hợp văn phòng và gia đình.',
  1310095.29,
  '1632905',
  131009.53,
  'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766502367/auction_images/ooixfvmotqaq0m4ubj9u.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766502373/auction_images/mlvzynhk4gedwxaf8nfl.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766502375/auction_images/hqluaqdvqqggh8kigmuf.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766502377/auction_images/pkxqpxqv3hu4zkg15yfv.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766502380/auction_images/szenqxuvbeqyamcnh3ov.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766502384/auction_images/belb3ylt4hmdupie27vs.jpg',
  'approved',
  '2024-09-09 09:22:31'
);

-- Product 8 (Thời trang)
INSERT INTO Product (seller_id, name, categories, description, start_price, estimate_price, deposit, image_url, status, created_at) 
VALUES (
  11,
  'Đầm dạ tiệc nữ',
  'Thời trang',
  'Đầm thiết kế sang trọng, chất liệu mềm mại, màu sắc trang nhã, thích hợp dự tiệc và sự kiện đặc biệt.',
  2954481.45,
  '4132622',
  295448.15,
  'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766502651/auction_images/m3vpg2gglxgzk5sqlwl1.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766502653/auction_images/dtyhmbu9ezddpocynrp0.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766502655/auction_images/oqbjzazza7gu3hrcqo2x.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766502658/auction_images/xgiwnhw5cunf2emgerua.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766502660/auction_images/dykomkxi9we9yrubiubz.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766502662/auction_images/dqubewykvu4xdzp7bm88.jpg',
  'sold',
  '2024-12-07 09:22:31'
);

-- Product 9 (Nội thất)
INSERT INTO Product (seller_id, name, categories, description, start_price, estimate_price, deposit, image_url, status, created_at) 
VALUES (
  2,
  'Ghế sofa phòng khách',
  'Nội thất',
  'Ghế sofa da bò, cấu trúc nhẹ và bay bổng, màu be nhạt, phù hợp phòng khách hiện đại.',
  4340734.17,
  '5986819',
  434073.42,
  'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766445481/auction_images/shqjsthyjoka4skiy15n.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766445484/auction_images/cyel0scnrkety37sgwks.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766445486/auction_images/fgo1kl4refht0fv9i2mq.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766445488/auction_images/chzairocxu5bzdnrficr.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766445490/auction_images/jrocv0bizz8li177rman.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766445491/auction_images/lbopdroyvbppr3xscyuh.jpg',
  'pending',
  '2023-05-29 09:22:31'
);

-- Product 10 (Nội thất)
INSERT INTO Product (seller_id, name, categories, description, start_price, estimate_price, deposit, image_url, status, created_at) 
VALUES (
  19,
  'Tủ sách gỗ Vân Sồi',
  'Nội thất',
  'Tủ sách gỗ Vân Sồi chắc chắn, nhiều tầng, tiện lợi, phù hợp trưng bày sách và đồ trang trí.',
  2454366.06,
  '4819743',
  245436.61,
  'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766506811/auction_images/ocvchtv6jjsboiqpa21v.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766506814/auction_images/xh7xn2dxqotfxkgsygoy.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766506817/auction_images/fomodp8wliyizt14ljse.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766506819/auction_images/ij2rk81wrv4ontp7w9ro.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766506821/auction_images/s5nk8tbucavbd2mkcwu4.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766506824/auction_images/nxv7axkpyatdpprepp4x.jpg',
  'approved',
  '2025-01-23 09:22:31'
);

-- Product 11 (Nội thất)
INSERT INTO Product (seller_id, name, categories, description, start_price, estimate_price, deposit, image_url, status, created_at) 
VALUES (
  4,
  'Bàn trà gỗ óc chó',
  'Nội thất',
  'Bàn trà kích thước vừa, bề mặt gỗ óc chó bóng mịn, chân sắt chắc chắn, phù hợp phòng khách hiện đại.',
  6647060.24,
  '1159904',
  366470.62,
  'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766507332/auction_images/jgzcsr6z9mdhvqh7nmwv.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766507334/auction_images/hs2ncpnwlgwyq99uvnhp.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766507337/auction_images/k8n2g0kyryfmfwlqlt8o.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766507339/auction_images/wkqa5igdgnd4uc47ss8b.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766507342/auction_images/sf0ruvi3qexwz10j3dag.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766507346/auction_images/dgop0bl0p9ppy39lspkd.jpg',
  'cancelled',
  '2023-04-23 09:22:31'
);

-- Product 12 (Trang Sức)
INSERT INTO Product (seller_id, name, categories, description, start_price, estimate_price, deposit, image_url, status, created_at) 
VALUES (
  17,
  'Dây chuyền bạc nữ đính đá Carbon tổng hợp cao cấp',
  'Sưu tầm',
  'Chiếc dây chuyền được làm từ bạc S925 đính đá Carbon tổng hợp cao cấp với thiết kế hình những bông hoa mặt trời nối tiếp nhau tỉ mỉ và tinh tế.',
  8816504.04,
  '15721116',
  481650.4,
  'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766444529/auction_images/uskdpndlejalrg5gcfty.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766444531/auction_images/mrjzvkwmnrnlzpxwwbwo.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766444532/auction_images/htmzsk0hsdzvxiaaliyn.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766444534/auction_images/cjy9pzewr8trebauelwz.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766444536/auction_images/bvzxc7fmk21qf80srqbf.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766444537/auction_images/t7dtosneaeiym3d6q0ih.jpg',
  'sold',
  '2025-03-03 09:22:31'
);

-- Product 13 (Điện tử)
INSERT INTO Product (seller_id, name, categories, description, start_price, estimate_price, deposit, image_url, status, created_at) 
VALUES (
  15,
  'Router Wi-Fi 6 TP-Link',
  'Điện tử',
  'Router hỗ trợ chuẩn Wi-Fi 6, tốc độ 3000Mbps, nhiều băng tần, bảo mật WPA3.',
  1408840.66,
  '2776439',
  140884.07,
  'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766440200/auction_images/m1uzpfoiw9evwyecptjc.jpg',
  'approved',
  '2025-01-07 09:22:31'
);

-- Product 14 (Xe cộ)
INSERT INTO Product (seller_id, name, categories, description, start_price, estimate_price, deposit, image_url, status, created_at) 
VALUES (
  20,
  'Xe máy Honda Winner X',
  'Xe cộ',
  'Xe máy thể thao Honda, động cơ 150cc, thiết kế năng động, tiết kiệm nhiên liệu, thích hợp đi phố.',
  26514076.14,
  '3616311',
  565140.71,
  'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766508057/auction_images/ltmroixi6hh8rsiwpjgl.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766508062/auction_images/y4ejy1od426zu7ze9awo.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766508067/auction_images/jq5makhu2gosxq9d9diw.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766508071/auction_images/sujgzoqavzzlpgwborq5.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766508074/auction_images/urjxruxj7pnaiv2gi6x0.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766508078/auction_images/cqcwlwt3zmfucgbrq7lr.jpg',
  'sold',
  '2024-07-05 09:22:31'
);

-- Product 15 (Điện tử)
INSERT INTO Product (seller_id, name, categories, description, start_price, estimate_price, deposit, image_url, status, created_at) 
VALUES (
  19,
  'Máy ảnh Canon EOS R6',
  'Điện tử',
  'Máy ảnh mirrorless, cảm biến full-frame, quay video 4K, thích hợp nhiếp ảnh chuyên nghiệp.',
  2793287.11,
  '1395202',
  593286.71,
  'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766508334/auction_images/vdeuvjfphkpga4odatbb.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766508336/auction_images/mpuckdkxjlidayn3i9rw.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766508337/auction_images/pdrss8cfyy374khkykxh.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766508338/auction_images/rhxanrpmknn2xm3ve7nm.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766508340/auction_images/obadwsbmcf5g6fnml3la.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766508341/auction_images/xuzgn5x8pwdcs2vd2qzs.jpg ',
  'sold',
  '2025-03-18 09:22:31'
);

-- Product 16 (Thời trang)
INSERT INTO Product (seller_id, name, categories, description, start_price, estimate_price, deposit, image_url, status, created_at) 
VALUES (
  12,
  'Áo thun unisex',
  'Thời trang',
  'Áo thun cotton 100%, kiểu dáng unisex, màu sắc trẻ trung, phù hợp mặc hàng ngày.',
  4256874.1,
  '6295708',
  425687.41,
  'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766508702/auction_images/qp53ebab49u3wz68wggm.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766508704/auction_images/bhikzi4gddol1dxtyrlt.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766508706/auction_images/h3gfuyvcjueprkymm4bd.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766508708/auction_images/dzov0yvfryyebythaws0.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766508711/auction_images/locmfroxr87sla3y1upz.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766508712/auction_images/zyvdjmcvpxt24tvcjg8h.jpg',
  'approved',
  '2025-02-17 09:22:31'
);

-- Product 17 (Nội thất)
INSERT INTO Product (seller_id, name, categories, description, start_price, estimate_price, deposit, image_url, status, created_at) 
VALUES (
  16,
  'Giường ngủ bọc da bò phong cách Ý',
  'Nội thất',
  'Giường được bọc bằng da bò thật nhập khẩu, đường nét tinh tế, tạo điểm nhấn thanh lịch cho không gian phòng ngủ.',
  13207644.22,
  '24630360',
  320764.42,
  'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766446564/auction_images/xrnxejf1neevhb6to8oc.jpg',
  'approved',
  '2024-08-17 09:22:31'
);

-- Product 18 (Điện tử)
INSERT INTO Product (seller_id, name, categories, description, start_price, estimate_price, deposit, image_url, status, created_at) 
VALUES (
  11,
  'Máy tính bảng iPad Pro M5 13 inch',
  'Điện tử',
  'iPad Pro màn hình Liquid Retina XDR 13 inch, chip M5 nhân 9, dung lượng 512GB, hỗ trợ Apple Pencil.',
  29323515.85,
  '36073931',
  293351.59,
  'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766446129/auction_images/lpzdki8ysh9tjqha2qll.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766446130/auction_images/zeagpmezvlghoxfxt4si.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766446131/auction_images/upbt6jhrratfot3sp8ch.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766446132/auction_images/dl1uvlgykgd9u5p7adzn.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766446134/auction_images/a0gesiw3j2onoqfivvj1.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766446135/auction_images/g2zvk9k4fmvjbvfsfppl.jpg',
  'cancelled',
  '2024-09-16 09:22:31'
);

-- Product 19 (Nội thất)
INSERT INTO Product (seller_id, name, categories, description, start_price, estimate_price, deposit, image_url, status, created_at) 
VALUES (
  9,
  'Tủ quần áo 6 cánh',
  'Nội thất',
  'Tủ quần áo bằng MDF, 6 cánh mở, màu trắng hiện đại, ngăn kéo tiện lợi cùng bề mặt chống thấm.',
  507009.96,
  '633693',
  50701.0,
  'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766443205/auction_images/vb62sdnecs76kgmrskal.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766443207/auction_images/zwbmjaod5lsbadmqdbqc.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766443209/auction_images/ktuau871dtcmuvskamsa.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766443211/auction_images/wstfkdnxjjctvqynklw8.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766443212/auction_images/z9dtjhiankg8uxmkfwhy.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766443214/auction_images/tehyrpuatyinvq9s75aa.jpg',
  'cancelled',
  '2024-04-24 09:22:31'
);

-- Product 20 (Sưu tầm)
INSERT INTO Product (seller_id, name, categories, description, start_price, estimate_price, deposit, image_url, status, created_at) 
VALUES (
  9,
  'Đồng hồ cổ Seiko 1965',
  'Sưu tầm',
  'Đồng hồ Seiko cổ, còn hoạt động tốt, thiết kế kinh điển, giá trị sưu tầm cao.',
  4819758.42,
  '7571984',
  481975.84,
  'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766507683/auction_images/yyoynf5cshjstbqpoput.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766507685/auction_images/zkdvtstcp7pbozv8gir2.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766507687/auction_images/lxlvznmojpkm6w189ytq.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766507689/auction_images/beyhuyb2f1jas5kqtm5k.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766507691/auction_images/elbup9wb025k3hpt51ls.jpg,https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766507694/auction_images/xbhgni4dpqeycxgxeauw.jpg',
  'cancelled',
  '2024-08-23 09:22:31'
);


-- (Image)
-- Product 1
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (1, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766441194/auction_images/udxcgvfq9htxkvlcvgkr.jpg', 1);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (1, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766441195/auction_images/rmxqnljlhaxsoa9pbizk.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (1, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766441198/auction_images/kzinchuhuhvj2c738x9v.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (1, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766441200/auction_images/u8w1omzxamlettjstsaw.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (1, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766441201/auction_images/jbfonr130muwmqwbmx70.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (1, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766441203/auction_images/ehz51hkpme3eissie2vs.jpg', 0);

-- Product 2
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (2, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766441642/auction_images/ulc4m7mfnwlwgotabh0m.jpg', 1);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (2, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766441643/auction_images/bccxtuf5or36n0rc0vhx.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (2, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766441645/auction_images/dgmn6plpadgsh5dmbino.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (2, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766441648/auction_images/yc9jpwead3jkikxk7iwm.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (2, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766441650/auction_images/of2jaarwp0bljrotorjk.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (2, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766441652/auction_images/coszhhyrimtkmlzoin79.jpg', 0);

-- Product 3
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (3, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766447312/auction_images/cpce8cgwwrjscyhwrtst.jpg', 1);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (3, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766447314/auction_images/f40gchliupyofg6twufc.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (3, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766447316/auction_images/wmvaou9bykecw3cefbum.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (3, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766447317/auction_images/r2fj7twbbwdaxpkiwgmx.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (3, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766447319/auction_images/wdbqwxzxiu4fqjfvkgl7.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (3, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766447321/auction_images/icszk93t63ikblgfivd6.jpg', 0);

-- Product 4
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (4, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766477506/auction_images/av6ggt81so03jysbuvsz.jpg', 1);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (4, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766477508/auction_images/wmll0shpwvsiqogyg3j2.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (4, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766477511/auction_images/w71ogacx9l7xtkammjs8.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (4, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766477513/auction_images/uyy4kbwteoohw5cylv0g.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (4, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766477515/auction_images/rcmp1krhot3ke5p53rgl.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (4, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766477517/auction_images/bbcksox2h7yn7b0imzad.jpg', 0);

-- Product 5
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (5, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766501778/auction_images/blg9l4ua6oey99sw4squ.jpg', 1);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (5, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766501781/auction_images/htuawd443pm6znigbzge.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (5, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766501783/auction_images/bfs1fibpht0ebcnmco9o.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (5, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766501784/auction_images/f6dy9d0ln1a0xgi4gut9.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (5, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766501786/auction_images/nyebv4myighpdz76pqih.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (5, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766501788/auction_images/uoxjgborh0vorphmfpy0.jpg', 0);

-- Product 6
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (6, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766502020/auction_images/uvlsicje6nbhj8sue7wu.jpg', 1);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (6, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766502026/auction_images/gpimoduu7gkf3l4eokrg.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (6, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766502030/auction_images/grvxyocaltcxlcyhxftv.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (6, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766502034/auction_images/xmtzesqvpzdrm7ild2gs.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (6, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766502036/auction_images/g7fjcvjpq5yir57myaxw.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (6, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766502038/auction_images/oia9omzx9barpunsn19s.jpg', 0);

-- Product 7
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (7, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766502367/auction_images/ooixfvmotqaq0m4ubj9u.jpg', 1);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (7, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766502373/auction_images/mlvzynhk4gedwxaf8nfl.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (7, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766502375/auction_images/hqluaqdvqqggh8kigmuf.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (7, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766502377/auction_images/pkxqpxqv3hu4zkg15yfv.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (7, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766502380/auction_images/szenqxuvbeqyamcnh3ov.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (7, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766502384/auction_images/belb3ylt4hmdupie27vs.jpg', 0);

-- Product 8
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (8, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766502651/auction_images/m3vpg2gglxgzk5sqlwl1.jpg', 1);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (8, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766502653/auction_images/dtyhmbu9ezddpocynrp0.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (8, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766502655/auction_images/oqbjzazza7gu3hrcqo2x.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (8, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766502658/auction_images/xgiwnhw5cunf2emgerua.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (8, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766502660/auction_images/dykomkxi9we9yrubiubz.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (8, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766502662/auction_images/dqubewykvu4xdzp7bm88.jpg', 0);

-- Product 9
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (9, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766445481/auction_images/shqjsthyjoka4skiy15n.jpg', 1);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (9, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766445484/auction_images/cyel0scnrkety37sgwks.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (9, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766445486/auction_images/fgo1kl4refht0fv9i2mq.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (9, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766445488/auction_images/chzairocxu5bzdnrficr.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (9, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766445490/auction_images/jrocv0bizz8li177rman.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (9, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766445491/auction_images/lbopdroyvbppr3xscyuh.jpg', 0);

-- Product 10
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (10, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766506811/auction_images/ocvchtv6jjsboiqpa21v.jpg', 1);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (10, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766506814/auction_images/xh7xn2dxqotfxkgsygoy.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (10, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766506817/auction_images/fomodp8wliyizt14ljse.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (10, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766506819/auction_images/ij2rk81wrv4ontp7w9ro.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (10, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766506821/auction_images/s5nk8tbucavbd2mkcwu4.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (10, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766506824/auction_images/nxv7axkpyatdpprepp4x.jpg', 0);

-- Product 11
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (11, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766507332/auction_images/jgzcsr6z9mdhvqh7nmwv.jpg', 1);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (11, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766507334/auction_images/hs2ncpnwlgwyq99uvnhp.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (11, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766507337/auction_images/k8n2g0kyryfmfwlqlt8o.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (11, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766507339/auction_images/wkqa5igdgnd4uc47ss8b.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (11, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766507342/auction_images/sf0ruvi3qexwz10j3dag.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (11, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766507346/auction_images/dgop0bl0p9ppy39lspkd.jpg', 0);

-- Product 12
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (12, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766444529/auction_images/uskdpndlejalrg5gcfty.jpg', 1);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (12, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766444531/auction_images/mrjzvkwmnrnlzpxwwbwo.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (12, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766444532/auction_images/htmzsk0hsdzvxiaaliyn.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (12, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766444534/auction_images/cjy9pzewr8trebauelwz.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (12, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766444536/auction_images/bvzxc7fmk21qf80srqbf.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (12, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766444537/auction_images/t7dtosneaeiym3d6q0ih.jpg', 0);

-- Product 13
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (13, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766440200/auction_images/m1uzpfoiw9evwyecptjc.jpg', 1);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (13, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766440202/auction_images/uau5lbwrpzjblxlooyqu.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (13, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766440204/auction_images/umfagepnyvwdhgjqw1vh.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (13, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766440207/auction_images/fycaoq7omjf8viml3eik.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (13, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766440209/auction_images/k0nzlrj5ze56bzklljej.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (13, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766440212/auction_images/hlbn3ogprydrc3jk6r1t.jpg', 0);

-- Product 14
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (14, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766508057/auction_images/ltmroixi6hh8rsiwpjgl.jpg', 1);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (14, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766508062/auction_images/y4ejy1od426zu7ze9awo.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (14, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766508067/auction_images/jq5makhu2gosxq9d9diw.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (14, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766508071/auction_images/sujgzoqavzzlpgwborq5.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (14, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766508074/auction_images/urjxruxj7pnaiv2gi6x0.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (14, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766508078/auction_images/cqcwlwt3zmfucgbrq7lr.jpg', 0);

-- Product 15
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (15, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766508334/auction_images/vdeuvjfphkpga4odatbb.jpg', 1);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (15, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766508336/auction_images/mpuckdkxjlidayn3i9rw.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (15, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766508337/auction_images/pdrss8cfyy374khkykxh.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (15, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766508338/auction_images/rhxanrpmknn2xm3ve7nm.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (15, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766508340/auction_images/obadwsbmcf5g6fnml3la.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (15, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766508341/auction_images/xuzgn5x8pwdcs2vd2qzs.jpg', 0);

-- Product 16
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (16, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766508702/auction_images/qp53ebab49u3wz68wggm.jpg', 1);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (16, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766508704/auction_images/bhikzi4gddol1dxtyrlt.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (16, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766508706/auction_images/h3gfuyvcjueprkymm4bd.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (16, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766508708/auction_images/dzov0yvfryyebythaws0.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (16, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766508711/auction_images/locmfroxr87sla3y1upz.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (16, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766508712/auction_images/zyvdjmcvpxt24tvcjg8h.jpg', 0);

-- Product 17
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (17, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766446564/auction_images/xrnxejf1neevhb6to8oc.jpg', 1);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (17, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766446566/auction_images/rbebiv8pulkxnngbeulj.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (17, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766446568/auction_images/huzpbtlgh1jubbsykeed.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (17, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766446569/auction_images/pc3qj2qz0jbthhnam3ov.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (17, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766446571/auction_images/vovmq0lisnafk4ksqmlf.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (17, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766446573/auction_images/p0bfprfoe9a3fmimjo0k.jpg', 0);

-- Product 18
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (18, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766446129/auction_images/lpzdki8ysh9tjqha2qll.jpg', 1);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (18, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766446130/auction_images/zeagpmezvlghoxfxt4si.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (18, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766446131/auction_images/upbt6jhrratfot3sp8ch.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (18, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766446132/auction_images/dl1uvlgykgd9u5p7adzn.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (18, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766446134/auction_images/a0gesiw3j2onoqfivvj1.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (18, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766446135/auction_images/g2zvk9k4fmvjbvfsfppl.jpg', 0);

-- Product 19
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (19, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766443205/auction_images/vb62sdnecs76kgmrskal.jpg', 1);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (19, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766443207/auction_images/zwbmjaod5lsbadmqdbqc.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (19, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766443209/auction_images/ktuau871dtcmuvskamsa.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (19, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766443211/auction_images/wstfkdnxjjctvqynklw8.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (19, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766443212/auction_images/z9dtjhiankg8uxmkfwhy.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (19, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766443214/auction_images/tehyrpuatyinvq9s75aa.jpg', 0);

-- Product 20
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (20, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766507683/auction_images/yyoynf5cshjstbqpoput.jpg', 1);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (20, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766507685/auction_images/zkdvtstcp7pbozv8gir2.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (20, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766507687/auction_images/lxlvznmojpkm6w189ytq.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (20, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766507689/auction_images/beyhuyb2f1jas5kqtm5k.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (20, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766507691/auction_images/elbup9wb025k3hpt51ls.jpg', 0);
INSERT INTO Image (product_id, image_url, is_thumbnail) VALUES (20, 'https://res.cloudinary.com/dzoz7ngp5/image/upload/v1766507694/auction_images/xbhgni4dpqeycxgxeauw.jpg', 0);

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

-- Auctions (bổ sung)
INSERT INTO permission (permission_name, api_path, method, module, description) VALUES
('AUCTION_APPROVE', '/api/auctions/{auctionId}/approve', 'PUT', 'auction', 'Duyệt phiên đấu giá'),
('AUCTION_ME', '/api/auctions/me', 'GET', 'auction', 'Danh sách auction của tôi'),
-- Transactions after auction (bổ sung)
('TXN_AFTER_BY_SELLER', '/api/transactions/after-auction/seller/{sellerId}', 'GET', 'transaction', 'Giao dịch theo seller'),
('TXN_AFTER_WON_PRODUCTS', '/api/transactions/after-auction/{userId}/won-products', 'GET', 'transaction', 'Sản phẩm đã thắng'),
-- Users (bổ sung)
('USER_PARTICIPATING_AUCTIONS', '/api/users/{userId}/auctions/participating', 'GET', 'user', 'Auctions đang tham gia');

-- (RolePermission)
INSERT INTO rolePermission (role_id, permission_id)
SELECT 3, permission_id FROM permission WHERE permission_id BETWEEN 1 AND 72;
-- ====================================
-- BIDDER (role_id = 1)
-- Chỉ view, tìm kiếm, tham gia auction, đặt bid, xem profile seller
-- Quản lý account transactions của mình
-- ====================================
INSERT INTO rolePermission (role_id, permission_id) VALUES
-- Bids - đặt giá thầu
(1, 22),  -- BID_PLACE
(1, 23),  -- BID_AUTO
(1, 24),  -- BID_BY_AUCTION
(1, 25),  -- BID_HIGHEST
(1, 26),  -- BID_BY_USER
-- Upload (để upload avatar)
(1, 27),  -- UPLOAD_SINGLE
(1, 28),  -- UPLOAD_MULTIPLE
-- Account transactions - quản lý tiền của mình
(1, 45),  -- ACCOUNT_DEPOSIT
(1, 46),  -- ACCOUNT_WITHDRAW
(1, 47),  -- ACCOUNT_CONFIRM_WITHD
(1, 48),  -- ACCOUNT_BY_USER
(1, 49),  -- ACCOUNT_WITHDRAWABLE
-- Transaction after auction - thanh toán khi thắng
(1, 50),  -- TXN_AFTER_PAY
(1, 53),  -- TXN_AFTER_BY_USER
(1, 71),  -- TXN_AFTER_WON_PRODUCTS
-- User profile - quản lý chính mình
(1, 55),  -- USER_ME
(1, 56),  -- USER_PUBLIC_PROFILE (xem seller profile)
(1, 57),  -- USER_UPDATE_ME
(1, 58),  -- USER_CHANGE_PASSWORD
(1, 59),  -- USER_UPDATE_AVATAR
(1, 72);  -- USER_PARTICIPATING_AUCTIONS
-- User reports - tạo report người dùng khác
(1, 42);  -- USER_REPORT_CREATE
-- ====================================
-- SELLER (role_id = 2)
-- Tất cả quyền BIDDER + tạo/sửa product, yêu cầu tạo auction
-- KHÔNG có quyền duyệt (approve)
-- ====================================
INSERT INTO rolePermission (role_id, permission_id) VALUES
-- Bids - SELLER cũng có thể bid (nếu cho phép)
(2, 22),  -- BID_PLACE
(2, 23),  -- BID_AUTO
(2, 24),  -- BID_BY_AUCTION
(2, 25),  -- BID_HIGHEST
(2, 26),  -- BID_BY_USER
-- Upload
(2, 27),  -- UPLOAD_SINGLE
(2, 28),  -- UPLOAD_MULTIPLE
-- Products - SELLER tạo/sửa/xóa products của mình
(2, 29),  -- PRODUCT_CREATE
(2, 30),  -- PRODUCT_UPDATE
(2, 33),  -- PRODUCT_DELETE
(2, 34),  -- PRODUCT_MY_PAGE
(2, 36),  -- PRODUCT_REQUEST_APPROVAL (yêu cầu duyệt)
-- Auctions - SELLER tạo/sửa auctions (KHÔNG duyệt)
(2, 15),  -- AUCTION_CREATE
(2, 18),  -- AUCTION_UPDATE
(2, 19),  -- AUCTION_DELETE
(2, 69),  -- AUCTION_ME (danh sách auction của tôi)
-- Account transactions
(2, 45),  -- ACCOUNT_DEPOSIT
(2, 46),  -- ACCOUNT_WITHDRAW
(2, 47),  -- ACCOUNT_CONFIRM_WITHD
(2, 48),  -- ACCOUNT_BY_USER
(2, 49),  -- ACCOUNT_WITHDRAWABLE
-- Transaction after auction - SELLER cập nhật trạng thái giao hàng
(2, 50),  -- TXN_AFTER_PAY
(2, 51),  -- TXN_AFTER_UPDATE_STATUS (cập nhật SHIPPED, etc.)
(2, 53),  -- TXN_AFTER_BY_USER
(2, 70),  -- TXN_AFTER_BY_SELLER
(2, 71),  -- TXN_AFTER_WON_PRODUCTS
-- User profile
(2, 55),  -- USER_ME
(2, 56),  -- USER_PUBLIC_PROFILE
(2, 57),  -- USER_UPDATE_ME
(2, 58),  -- USER_CHANGE_PASSWORD
(2, 59),  -- USER_UPDATE_AVATAR
(2, 72);  -- USER_PARTICIPATING_AUCTIONS
-- User reports - tạo report người dùng khác
(2, 42);  -- USER_REPORT_CREATE
-- ====================================
-- MODERATOR (role_id = 4)
-- Quản lý product và auction: xóa, đóng, duyệt
-- Quản lý warnings và reports
-- ====================================
INSERT INTO rolePermission (role_id, permission_id) VALUES
-- Products - MODERATOR duyệt, xóa products
(4, 31),  -- PRODUCT_PAGE (xem danh sách)
(4, 32),  -- PRODUCT_GET
(4, 33),  -- PRODUCT_DELETE (xóa product vi phạm)
(4, 35),  -- PRODUCT_APPROVE (duyệt product)
-- Auctions - MODERATOR duyệt, đóng, xóa auctions
(4, 16),  -- AUCTION_LIST
(4, 17),  -- AUCTION_GET
(4, 19),  -- AUCTION_DELETE (xóa auction vi phạm)
(4, 21),  -- AUCTION_CLOSE (đóng auction lập tức)
(4, 68),  -- AUCTION_APPROVE (duyệt yêu cầu tạo auction)
-- Warnings - quản lý cảnh báo user
(4, 37),  -- WARNING_CREATE
(4, 38),  -- WARNING_LIST
(4, 39),  -- WARNING_BY_USER
(4, 40),  -- WARNING_BY_TXN
(4, 41),  -- WARNING_AUTO
-- User reports - xem reports từ users
(4, 42),  -- USER_REPORT_CREATE
(4, 43),  -- USER_REPORT_BY_USER
(4, 44),  -- USER_REPORT_LIST
-- User profile (self)
(4, 55),  -- USER_ME
(4, 57),  -- USER_UPDATE_ME
(4, 58),  -- USER_CHANGE_PASSWORD
(4, 59);  -- USER_UPDATE_AVATAR