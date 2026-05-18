-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 18, 2026 at 06:31 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bookstore_hisa`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `judul` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `author` varchar(100) NOT NULL,
  `tahun` year(4) DEFAULT NULL,
  `sinopsis` text DEFAULT NULL,
  `genre` varchar(255) DEFAULT NULL,
  `harga` decimal(15,2) NOT NULL,
  `stock` int(11) NOT NULL,
  `gambar` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `judul`, `image`, `author`, `tahun`, `sinopsis`, `genre`, `harga`, `stock`, `gambar`, `created_at`) VALUES
(5, 'BUMI - Tere', 'books/WTedCJBuzE1RPQYNx5PlGLtvidCoeNZMnut0v4WO.jpg', 'Tere Liye', NULL, 'Novel Bumi menceritakan tentang seorang remaja bernama Raib yang memiliki kemampuan menghilang. Suatu hari, ia mengetahui bahwa dirinya bukan manusia biasa dan berasal dari dunia lain. Bersama dua sahabatnya, Seli dan Ali, Raib memulai petualangan untuk memahami kekuatan mereka serta menghadapi berbagai ancaman dari dunia paralel. Cerita ini penuh misteri, persahabatan, dan pertarungan yang seru.', 'Fantasi, petualangan, dan fiksi remaja.', 50000.00, 49, NULL, '2026-05-18 11:51:42'),
(6, 'MATAHARI - Tere', 'books/pUnUMmN7FgZgQ3Szj5Vt19a3bXOP0X7X98q41fRw.jpg', 'Tere Liye', NULL, 'Novel Matahari menceritakan petualangan Raib, Seli, dan Ali yang melakukan perjalanan ke Klan Matahari untuk menyelidiki berbagai kejadian misterius. Dalam perjalanan tersebut, mereka menghadapi tantangan berbahaya, bertemu tokoh-tokoh baru, dan menemukan rahasia besar tentang dunia paralel. Cerita ini menampilkan persahabatan, keberanian, serta pengorbanan dalam menghadapi ancaman yang semakin besar.', 'Fantasi, petualangan, dan fiksi remaja.', 50000.00, 48, NULL, '2026-05-18 11:53:19'),
(7, 'BULAN - Tere', 'books/twmTkYwMbQCr0AhN71HNFFEZx7v2yfUwRR8u3eTV.jpg', 'Tere Liye', NULL, 'Novel Bulan menceritakan perjalanan Raib, Seli, dan Ali ke Klan Bulan untuk menghadapi ancaman besar yang dapat mengganggu keseimbangan dunia paralel. Dalam petualangan tersebut, mereka harus bekerja sama, menggunakan kemampuan masing-masing, dan menghadapi berbagai rintangan berbahaya. Cerita ini menonjolkan persahabatan, keberanian, serta rahasia-rahasia baru tentang dunia paralel yang semakin menarik untuk diungkap.', 'Fantasi, petualangan, dan fiksi remaja.', 50000.00, 50, NULL, '2026-05-18 11:54:41'),
(8, 'SELENA - Tere', 'books/LCd98lK70Ee0Pni7EYdywKmGd5jhuXaOsWIWyzrq.jpg', 'Tere Liye', NULL, 'Novel Selena menceritakan kisah masa lalu Selena saat masih muda dan menjalani pendidikan di Akademi Bayangan Tingkat Tinggi. Cerita ini memperlihatkan perjalanan hidup Selena, persahabatannya dengan Tazk, serta berbagai konflik yang membentuk dirinya menjadi sosok kuat dan misterius. Novel ini juga mengungkap banyak rahasia dunia paralel yang sebelumnya belum diketahui.', 'Fantasi, petualangan, dan fiksi remaja.', 50000.00, 50, NULL, '2026-05-18 11:56:06'),
(9, 'NEBULA - Tere', 'books/BhJyv2nChan1MEAmKhCP4i5YJZhL6cr3K39LmFhI.jpg', 'Tere Liye', NULL, 'Novel Nebula melanjutkan kisah petualangan di dunia paralel dengan fokus pada Selena dan Tazk. Cerita ini mengungkap berbagai rahasia besar tentang kekuatan, persahabatan, dan konflik yang terjadi di dunia paralel. Dalam perjalanan mereka, banyak kejadian menegangkan yang memperlihatkan sisi lain dari tokoh-tokoh penting dalam serial ini. Novel ini juga menjadi penghubung berbagai misteri yang muncul pada buku-buku sebelumnya.', 'Fantasi, petualangan, dan fiksi remaja.', 50000.00, 49, NULL, '2026-05-18 11:58:40'),
(10, 'KOMET MINOR - Tere', 'books/2yU06jQk9VKwGwdiut1toBmJ24joecx4pKCgdMpK.jpg', 'Tere Liye', NULL, 'Novel Komet Minor menceritakan petualangan Raib, Seli, dan Ali yang kembali menghadapi ancaman besar di dunia paralel. Mereka melakukan perjalanan ke tempat-tempat baru yang penuh bahaya untuk menghentikan kekuatan jahat yang dapat merusak keseimbangan antar klan. Dalam cerita ini, persahabatan, keberanian, dan pengorbanan menjadi hal penting dalam menghadapi konflik yang semakin rumit.', 'Fantasi, petualangan, dan fiksi remaja.', 50000.00, 50, NULL, '2026-05-18 12:00:24'),
(11, 'BINTANG - Tere', 'books/JZeSPZddgYRXEJbTBVsa1fudld7OGjKSmYpqpzsg.jpg', 'Tere Liye', NULL, 'Novel Bintang menceritakan petualangan Raib, Seli, dan Ali yang semakin menegangkan dalam menghadapi kekuatan besar yang mengancam dunia paralel. Mereka harus mencari cara untuk menghentikan musuh berbahaya sambil mengungkap rahasia penting tentang klan-klan dan masa lalu dunia paralel. Cerita ini dipenuhi aksi, persahabatan, serta pengorbanan demi menjaga keseimbangan dunia.', 'Fantasi, petualangan, dan fiksi remaja.', 50000.00, 50, NULL, '2026-05-18 12:01:53'),
(12, 'HANA TARA HATA -Tere', 'books/AeKCDSoKKOc0zoRCMm54DhkfttmI64cihsk5wo8H.jpg', 'Tere Liye', NULL, 'mengisahkan petualangan Mata Hanatara, anak dari Hana. Cerita ini berfokus pada perjalanan Mata di Festival Bunga Matahari yang mematikan dan tanah misterius bersama teman-temannya, sekaligus mengangkat tema mendalam tentang hubungan ibu-anak, pengorbanan, dan ikatan keluarga.', 'Fantasi, petualangan, dan fiksi remaja.', 50000.00, 50, NULL, '2026-05-18 12:04:39');

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `book_id` int(11) DEFAULT NULL,
  `jumlah` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `user_id`, `book_id`, `jumlah`) VALUES
(5, 3, 5, 1),
(6, 3, 6, 2),
(7, 3, 10, 2);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2026_05_14_150732_create_personal_access_tokens_table', 1),
(2, '2026_05_15_061401_add_details_to_books_table', 2),
(3, '2026_05_15_083649_add_timestamps_to_transactions_table', 3);

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'auth_token', '3397efd6b35453c519d77be54546d23552b0da182990c4c58b8c2136f959ea19', '[\"*\"]', NULL, NULL, '2026-05-14 08:47:55', '2026-05-14 08:47:55'),
(2, 'App\\Models\\User', 1, 'auth_token', '240399e00014e24ae7c51d9acf8a55aac8ba43231a737f2a2cdba0fe5154fb38', '[\"*\"]', NULL, NULL, '2026-05-14 08:59:59', '2026-05-14 08:59:59'),
(3, 'App\\Models\\User', 2, 'auth_token', 'db6dbdc8048d46a0601e59ac25874f0bc4ded4e10ed5858b9e18273d1145103b', '[\"*\"]', '2026-05-14 09:18:08', NULL, '2026-05-14 09:03:55', '2026-05-14 09:18:08'),
(4, 'App\\Models\\User', 1, 'auth_token', '0739860c781a420a3f24d5687d15b7dd04090358ce1b5c55a45104ba4522af02', '[\"*\"]', NULL, NULL, '2026-05-14 09:04:32', '2026-05-14 09:04:32'),
(5, 'App\\Models\\User', 1, 'auth_token', '5050e0077a1f49983a5a33daa69425006a88371892ba53e6f918166c8bb9a5ee', '[\"*\"]', '2026-05-14 09:22:20', NULL, '2026-05-14 09:09:19', '2026-05-14 09:22:20'),
(6, 'App\\Models\\User', 1, 'auth_token', 'dbc8cc86ec17f32fe04bb51d38b77b8f10579dfbf2263a8ae046d002d09ef3e9', '[\"*\"]', '2026-05-14 09:28:54', NULL, '2026-05-14 09:28:37', '2026-05-14 09:28:54'),
(7, 'App\\Models\\User', 1, 'auth_token', 'c33962b0ad4c97e48fef797e0bbbaea441406385e28845e6799a5cf279e885a3', '[\"*\"]', '2026-05-14 09:30:45', NULL, '2026-05-14 09:30:24', '2026-05-14 09:30:45'),
(8, 'App\\Models\\User', 2, 'auth_token', 'cace9ffbe8d1b337f19b05b263541a279f75ac11de5c8974df43aeb36bcd0691', '[\"*\"]', '2026-05-14 10:02:55', NULL, '2026-05-14 09:59:04', '2026-05-14 10:02:55'),
(9, 'App\\Models\\User', 2, 'auth_token', 'd835b36eac48f5c1c758dacc271efaeb3830ecfb76b728333ff8baece33108f7', '[\"*\"]', '2026-05-14 10:14:52', NULL, '2026-05-14 10:12:03', '2026-05-14 10:14:52'),
(10, 'App\\Models\\User', 1, 'auth_token', 'd1b8732bb6965f0d6db4017d9d3d78bb607c5dd7f1240f7ef5229a281d70a1d8', '[\"*\"]', '2026-05-14 10:18:06', NULL, '2026-05-14 10:17:03', '2026-05-14 10:18:06'),
(11, 'App\\Models\\User', 2, 'auth_token', '0fadc56989d16a642c36cde5902f2acc385bd35677acf42256233fc87835aa33', '[\"*\"]', NULL, NULL, '2026-05-14 18:01:09', '2026-05-14 18:01:09'),
(12, 'App\\Models\\User', 2, 'auth_token', '93adb5a1878787c809268549db18f73c7b4c957ef507d899b2cb4bd37e63b03a', '[\"*\"]', '2026-05-14 18:10:07', NULL, '2026-05-14 18:04:06', '2026-05-14 18:10:07'),
(13, 'App\\Models\\User', 1, 'auth_token', '514a2f631603e99c13d415860abf22a79189de6d8a97a2fc89df504b8cad4bc3', '[\"*\"]', '2026-05-14 18:10:17', NULL, '2026-05-14 18:05:03', '2026-05-14 18:10:17'),
(14, 'App\\Models\\User', 2, 'auth_token', '4b66de0bfd023920c6dc92b345c5230ca9eb33c2f4c67df9ad8de3e438353d23', '[\"*\"]', '2026-05-14 19:13:41', NULL, '2026-05-14 19:13:40', '2026-05-14 19:13:41'),
(15, 'App\\Models\\User', 1, 'auth_token', 'deb626fbf9cfe54e1ae594824ae7fa62c4d5dfaaf4f21f69d973a21f033900c1', '[\"*\"]', '2026-05-14 19:22:28', NULL, '2026-05-14 19:14:31', '2026-05-14 19:22:28'),
(16, 'App\\Models\\User', 2, 'auth_token', 'ae6d94a3b72db90b6f85fbf9e7c4b7445efbd90fbca8944f3aec87402fa9913c', '[\"*\"]', '2026-05-14 19:58:26', NULL, '2026-05-14 19:24:40', '2026-05-14 19:58:26'),
(17, 'App\\Models\\User', 2, 'auth_token', '32cdb0d37b1d55596add901c56c8e5b1ecc91d287f6d83b8e6a060030f496ee1', '[\"*\"]', NULL, NULL, '2026-05-14 20:05:01', '2026-05-14 20:05:01'),
(18, 'App\\Models\\User', 1, 'auth_token', '88da6b0e2b4bec644ee0d5537fb6a12d54ec6260184fc4a85759a7c33f303cb2', '[\"*\"]', NULL, NULL, '2026-05-14 20:05:51', '2026-05-14 20:05:51'),
(19, 'App\\Models\\User', 2, 'auth_token', '476ed88c7fca2241266ff45897c6ede4059c51e920e8d5e8a5050c94710bf14a', '[\"*\"]', NULL, NULL, '2026-05-14 20:09:57', '2026-05-14 20:09:57'),
(20, 'App\\Models\\User', 1, 'auth_token', 'ba53c0d18007b78f7611c6910dfad00f0be263e479b9b70c9bcaaac981cde1bd', '[\"*\"]', '2026-05-14 20:13:42', NULL, '2026-05-14 20:10:40', '2026-05-14 20:13:42'),
(21, 'App\\Models\\User', 2, 'auth_token', '11d7f31d26f7d6e378cf19504d1a4fe0163683095ffa0e5d449232e9b5b26550', '[\"*\"]', '2026-05-14 20:19:27', NULL, '2026-05-14 20:14:01', '2026-05-14 20:19:27'),
(22, 'App\\Models\\User', 2, 'auth_token', 'd3203e27fc4bd6508c40284c099509d1e41d4444930c701a8d8ea7ffe6488039', '[\"*\"]', '2026-05-14 20:24:18', NULL, '2026-05-14 20:19:50', '2026-05-14 20:24:18'),
(23, 'App\\Models\\User', 2, 'auth_token', '2b4cf70c2de640c97837ff415e480841362aa6458394ad9f1fa612635536ad3c', '[\"*\"]', '2026-05-14 20:29:09', NULL, '2026-05-14 20:25:58', '2026-05-14 20:29:09'),
(24, 'App\\Models\\User', 1, 'auth_token', '98fd60c5c020c9cd8e169b5a530cc629ad08b30eba6c855b4becc59a4f7c07e7', '[\"*\"]', '2026-05-14 20:33:46', NULL, '2026-05-14 20:29:39', '2026-05-14 20:33:46'),
(25, 'App\\Models\\User', 2, 'auth_token', '5448a21f0530c3f4d061adaa8e816ad43e281a6df6fe4fc31fcd4207084aad72', '[\"*\"]', '2026-05-14 20:48:12', NULL, '2026-05-14 20:34:01', '2026-05-14 20:48:12'),
(26, 'App\\Models\\User', 1, 'auth_token', 'f18f9463ba628badfb35dfc7ad30561dd838298c020aae8b4693844d7e8adaec', '[\"*\"]', '2026-05-14 20:50:28', NULL, '2026-05-14 20:48:37', '2026-05-14 20:50:28'),
(27, 'App\\Models\\User', 2, 'auth_token', '17d117a5635d9190615299dbb57df8d32cf27f888e06348c357363127f356d43', '[\"*\"]', '2026-05-14 20:55:06', NULL, '2026-05-14 20:50:47', '2026-05-14 20:55:06'),
(28, 'App\\Models\\User', 1, 'auth_token', '4b95c4f5e2537f198301167b24c3fb7effcf7e82ce253cacdc2a60ad2475d4fe', '[\"*\"]', '2026-05-14 20:56:41', NULL, '2026-05-14 20:55:35', '2026-05-14 20:56:41'),
(29, 'App\\Models\\User', 2, 'auth_token', 'ec997224ba7d459cf1dd738857d927f8622f61918a3658ab5d96c9628c3e8aee', '[\"*\"]', '2026-05-14 23:28:58', NULL, '2026-05-14 20:58:03', '2026-05-14 23:28:58'),
(30, 'App\\Models\\User', 2, 'auth_token', '52660fe50c8ff613ea85d3b01d3e1e09100d2b0133534b3f364ede7aa9d6747e', '[\"*\"]', '2026-05-15 00:46:32', NULL, '2026-05-14 23:29:19', '2026-05-15 00:46:32'),
(31, 'App\\Models\\User', 1, 'auth_token', '9ff038c301bdb3ccdb9764db67bb1d1f70565477b6d5b81fdd2ee8738e01c0bb', '[\"*\"]', '2026-05-15 02:41:02', NULL, '2026-05-15 00:46:54', '2026-05-15 02:41:02'),
(32, 'App\\Models\\User', 1, 'auth_token', '63c054d3874856e2ff880b82acffa26d35560832d25d7fc157d3c6d1826233c3', '[\"*\"]', '2026-05-17 03:42:11', NULL, '2026-05-17 02:56:38', '2026-05-17 03:42:11'),
(33, 'App\\Models\\User', 2, 'auth_token', 'ab6004ff93b3f790def7263c03bd0790882f396df2fb2f4870543f2df84ad410', '[\"*\"]', '2026-05-17 08:22:48', NULL, '2026-05-17 08:10:49', '2026-05-17 08:22:48'),
(34, 'App\\Models\\User', 1, 'auth_token', 'ddeab220f453ff1315efa0a57ff012ac20ccaa787b1a2dbc69b22d81fb014c7b', '[\"*\"]', '2026-05-17 08:48:55', NULL, '2026-05-17 08:23:09', '2026-05-17 08:48:55'),
(35, 'App\\Models\\User', 4, 'auth_token', '347f6fde8b6c1fd5a133fd32169020c6a9697a6314a4f3977891706d18a823f2', '[\"*\"]', NULL, NULL, '2026-05-17 08:52:14', '2026-05-17 08:52:14'),
(36, 'App\\Models\\User', 3, 'auth_token', '516e5c0228087ce9a0f1a8fa17e168042445d8c00ea975a082d828cd59c0367b', '[\"*\"]', '2026-05-17 08:59:13', NULL, '2026-05-17 08:52:24', '2026-05-17 08:59:13'),
(37, 'App\\Models\\User', 3, 'auth_token', '266593b12e4e7c1d09a8e96cf320aeee82fe57aa5f6a79c93570264f7f290b73', '[\"*\"]', '2026-05-18 03:44:20', NULL, '2026-05-18 03:44:18', '2026-05-18 03:44:20'),
(38, 'App\\Models\\User', 4, 'auth_token', '9ff79cb0e57c0015b8038073942a77e1cbedd136896e80fd3734ecba266e40d6', '[\"*\"]', '2026-05-18 04:31:03', NULL, '2026-05-18 03:45:59', '2026-05-18 04:31:03'),
(39, 'App\\Models\\User', 4, 'auth_token', '50697b69edc9600456faca8e3a469aa606564e8a7a1fa5dd8b116f1ade796d21', '[\"*\"]', '2026-05-18 04:46:41', NULL, '2026-05-18 04:31:21', '2026-05-18 04:46:41'),
(40, 'App\\Models\\User', 3, 'auth_token', '0aa89e4a0a0eb9a8458e911bad086d26afa2f4ab7604e9bfd12fedfb21774ede', '[\"*\"]', '2026-05-18 08:32:38', NULL, '2026-05-18 04:49:12', '2026-05-18 08:32:38');

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `id` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `no_hp` varchar(15) DEFAULT NULL,
  `pesan` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`id`, `nama`, `email`, `no_hp`, `pesan`, `created_at`) VALUES
(1, 'Hisa User', 'hisa@example.com', '08123456789', 'Halo admin, apakah buku Laravel versi 12 sudah tersedia?', '2026-05-15 01:10:08'),
(3, 'Arya Yusuf', 'aryayusuf@gmail.com', NULL, 'tolong perbanyak lagi buku nya terutama tentang keuangan', '2026-05-18 12:38:30');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `book_id` int(11) DEFAULT NULL,
  `jumlah` int(11) DEFAULT 1,
  `tanggal_pemesanan` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('proses','berhasil','ditolak') DEFAULT 'proses',
  `total_harga` decimal(15,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `user_id`, `book_id`, `jumlah`, `tanggal_pemesanan`, `status`, `total_harga`, `created_at`, `updated_at`) VALUES
(12, 3, 5, 1, '2026-05-18 12:22:44', 'berhasil', 50000.00, '2026-05-18 05:22:44', '2026-05-18 05:25:56'),
(13, 3, 6, 2, '2026-05-18 12:25:29', 'proses', 100000.00, '2026-05-18 05:25:29', '2026-05-18 05:25:29'),
(14, 3, 9, 1, '2026-05-18 12:25:45', 'ditolak', 50000.00, '2026-05-18 05:25:45', '2026-05-18 05:26:02');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `nama`, `email`, `password`, `role`, `created_at`) VALUES
(3, 'Fahisa Muhammad', 'fahisamuhammadpangestu@gmail.com', '$2y$12$ErMv43ntzjERJc4A3Cjwwu339637mH64ql6ECXUstw8vMwniuMS1a', 'admin', '2026-05-17 15:50:37'),
(4, 'arya yusuf', 'aryayusuf@gmail.com', '$2y$12$Pr.Tjaj9ESSj.I5vzPGSiegByMAoWstw7GRAIotCLce2iT.o/1qr.', 'user', '2026-05-17 15:52:04');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `book_id` (`book_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `book_id` (`book_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `carts_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
