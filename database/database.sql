-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Aug 30, 2021 at 09:57 AM
-- Server version: 8.0.21
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quick`
--

-- --------------------------------------------------------

--
-- Table structure for table `adonis_schema`
--

DROP TABLE IF EXISTS `adonis_schema`;
CREATE TABLE IF NOT EXISTS `adonis_schema` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `batch` int NOT NULL,
  `migration_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `adonis_schema`
--

INSERT INTO `adonis_schema` (`id`, `name`, `batch`, `migration_time`) VALUES
(1, 'database\\migrations\\1622813801032_t_customers', 1, '2021-06-04 15:20:11'),
(60, 'database\\migrations\\1622813802116_t_addresses', 20, '2021-08-15 10:14:39'),
(3, 'database\\migrations\\1622813803184_t_brands', 1, '2021-06-04 15:20:14'),
(4, 'database\\migrations\\1622813804254_t_childcategories', 1, '2021-06-04 15:20:16'),
(5, 'database\\migrations\\1622813805324_t_categories', 1, '2021-06-04 15:20:18'),
(6, 'database\\migrations\\1622813806409_t_subcategories', 1, '2021-06-04 15:20:20'),
(7, 'database\\migrations\\1622813807495_t_messages', 1, '2021-06-04 15:20:20'),
(8, 'database\\migrations\\1622813808576_t_coupons', 1, '2021-06-04 15:20:21'),
(10, 'database\\migrations\\1622813810734_t_file_managers', 1, '2021-06-04 15:20:23'),
(11, 'database\\migrations\\1622813811822_t_flash_deals', 1, '2021-06-04 15:20:23'),
(12, 'database\\migrations\\1622813812906_t_countries', 1, '2021-06-04 15:20:24'),
(14, 'database\\migrations\\1622813816149_t_sliders', 1, '2021-06-04 15:20:26'),
(15, 'database\\migrations\\1622813817223_t_invoices', 1, '2021-06-04 15:20:27'),
(16, 'database\\migrations\\1622813818320_t_orders', 1, '2021-06-04 15:20:29'),
(62, 'database\\migrations\\1622813819400_t_order_addresses', 21, '2021-08-17 10:06:14'),
(18, 'database\\migrations\\1622813820495_t_order_products', 1, '2021-06-04 15:20:31'),
(19, 'database\\migrations\\1622813821572_t_order_product_variants', 1, '2021-06-04 15:20:32'),
(20, 'database\\migrations\\1622813822646_t_password_tokens', 1, '2021-06-04 15:20:33'),
(21, 'database\\migrations\\1622813823727_t_payments_histories', 1, '2021-06-04 15:20:34'),
(22, 'database\\migrations\\1622813824853_t_products', 1, '2021-06-04 15:20:38'),
(23, 'database\\migrations\\1622813825952_t_product_galleries', 1, '2021-06-04 15:20:38'),
(24, 'database\\migrations\\1622813827074_t_product_reviews', 1, '2021-06-04 15:20:40'),
(25, 'database\\migrations\\1622813828187_t_product_seos', 1, '2021-06-04 15:20:40'),
(26, 'database\\migrations\\1622813829294_t_product_variants', 1, '2021-06-04 15:20:41'),
(27, 'database\\migrations\\1622813830409_t_product_variant_attributes', 1, '2021-06-04 15:20:42'),
(28, 'database\\migrations\\1622813831506_t_product_visitors', 1, '2021-06-04 15:20:43'),
(29, 'database\\migrations\\1622813832634_t_search_histories', 1, '2021-06-04 15:20:43'),
(30, 'database\\migrations\\1622813833743_t_wishlists', 1, '2021-06-04 15:20:44'),
(31, 'database\\migrations\\1622819223316_brand_translations', 1, '2021-06-04 15:20:45'),
(32, 'database\\migrations\\1622819224410_childcategory_translations', 1, '2021-06-04 15:20:45'),
(33, 'database\\migrations\\1622819225565_category_translations', 1, '2021-06-04 15:20:46'),
(34, 'database\\migrations\\1622819226682_subcategory_translations', 1, '2021-06-04 15:20:46'),
(35, 'database\\migrations\\1622819227790_product_translations', 1, '2021-06-04 15:20:46'),
(36, 'database\\migrations\\1622914279728_api_tokens', 2, '2021-06-05 17:33:04'),
(38, 'database\\migrations\\1622988002929_settings_generals', 4, '2021-06-06 14:48:23'),
(39, 'database\\migrations\\1623178258675_settings_languages', 5, '2021-06-08 19:02:24'),
(40, 'database\\migrations\\1624626122824_service_paypals', 6, '2021-06-25 14:00:36'),
(41, 'database\\migrations\\1624626123994_service_stripes', 6, '2021-06-25 14:00:37'),
(42, 'database\\migrations\\1624626125153_service_offlines', 6, '2021-06-25 14:00:38'),
(43, 'database\\migrations\\1624626126340_service_cods', 6, '2021-06-25 14:00:38'),
(44, 'database\\migrations\\1624629732475_settings_payments', 7, '2021-06-25 14:02:59'),
(45, 'database\\migrations\\1624803493534_settings_footers', 8, '2021-06-27 14:28:56'),
(46, 'database\\migrations\\1624808447557_pages', 9, '2021-06-27 16:10:30'),
(47, 'database\\migrations\\1624808897519_page_translations', 9, '2021-06-27 16:10:31'),
(48, 'database\\migrations\\1625316268534_settings_auths', 10, '2021-07-03 12:53:52'),
(49, 'database\\migrations\\1625386463640_settings_securities', 11, '2021-07-04 08:17:30'),
(50, 'database\\migrations\\1625555332777_settings_smtps', 12, '2021-07-06 07:18:10'),
(51, 'database\\migrations\\1625663834319_settings_currencies', 13, '2021-07-07 13:26:17'),
(52, 'database\\migrations\\1626004781652_settings_seos', 14, '2021-07-11 12:18:56'),
(53, 'database\\migrations\\1626004789058_settings_checkouts', 14, '2021-07-11 12:18:57'),
(54, 'database\\migrations\\1626721048854_settings_sms', 15, '2021-07-19 19:09:06'),
(55, 'database\\migrations\\1626766106714_service_twilios', 16, '2021-07-20 07:29:57'),
(56, 'database\\migrations\\1626977004244_settings_refunds', 17, '2021-07-22 18:20:06'),
(57, 'database\\migrations\\1626977019828_refunds_requests', 17, '2021-07-22 18:20:09'),
(58, 'database\\migrations\\1627483686491_settings_analytics', 18, '2021-07-28 15:04:56'),
(59, 'database\\migrations\\1627674301701_verifications', 19, '2021-07-30 19:46:26'),
(61, 'database\\migrations\\1622972519837_moderators', 20, '2021-08-15 10:14:40');

-- --------------------------------------------------------

--
-- Table structure for table `t_addresses`
--

DROP TABLE IF EXISTS `t_addresses`;
CREATE TABLE IF NOT EXISTS `t_addresses` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `uid` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `customer_id` int UNSIGNED DEFAULT NULL,
  `name` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `country_id` int UNSIGNED DEFAULT NULL,
  `state` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `city` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `zipcode` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `t_addresses_uid_unique` (`uid`),
  KEY `t_addresses_customer_id_foreign` (`customer_id`),
  KEY `t_addresses_country_id_foreign` (`country_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `t_api_tokens`
--

DROP TABLE IF EXISTS `t_api_tokens`;
CREATE TABLE IF NOT EXISTS `t_api_tokens` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `customer_id` int UNSIGNED DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ip_address` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `t_api_tokens_token_unique` (`token`),
  KEY `t_api_tokens_customer_id_foreign` (`customer_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `t_brands`
--

DROP TABLE IF EXISTS `t_brands`;
CREATE TABLE IF NOT EXISTS `t_brands` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `uid` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `handler` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `logo_id` int UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `t_brands_uid_unique` (`uid`),
  UNIQUE KEY `t_brands_handler_unique` (`handler`),
  KEY `t_brands_logo_id_foreign` (`logo_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `t_brand_translation`
--

DROP TABLE IF EXISTS `t_brand_translation`;
CREATE TABLE IF NOT EXISTS `t_brand_translation` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `brand_id` int UNSIGNED DEFAULT NULL,
  `name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`id`),
  KEY `t_brand_translation_brand_id_foreign` (`brand_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `t_categories`
--

DROP TABLE IF EXISTS `t_categories`;
CREATE TABLE IF NOT EXISTS `t_categories` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `uid` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `handler` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `og_image_id` int UNSIGNED DEFAULT NULL,
  `icon_id` int UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `t_categories_uid_unique` (`uid`),
  UNIQUE KEY `t_categories_handler_unique` (`handler`),
  KEY `t_categories_og_image_id_foreign` (`og_image_id`),
  KEY `t_categories_icon_id_foreign` (`icon_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `t_category_translation`
--

DROP TABLE IF EXISTS `t_category_translation`;
CREATE TABLE IF NOT EXISTS `t_category_translation` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `category_id` int UNSIGNED DEFAULT NULL,
  `title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`id`),
  KEY `t_category_translation_category_id_foreign` (`category_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `t_childcategories`
--

DROP TABLE IF EXISTS `t_childcategories`;
CREATE TABLE IF NOT EXISTS `t_childcategories` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `uid` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `parent_id` int UNSIGNED DEFAULT NULL,
  `subcategory_id` int UNSIGNED DEFAULT NULL,
  `handler` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `og_image_id` int UNSIGNED DEFAULT NULL,
  `icon_id` int UNSIGNED DEFAULT NULL,
  `is_featured` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `t_childcategories_uid_unique` (`uid`),
  UNIQUE KEY `t_childcategories_handler_unique` (`handler`),
  KEY `t_childcategories_parent_id_foreign` (`parent_id`),
  KEY `t_childcategories_subcategory_id_foreign` (`subcategory_id`),
  KEY `t_childcategories_og_image_id_foreign` (`og_image_id`),
  KEY `t_childcategories_icon_id_foreign` (`icon_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `t_childcategory_translation`
--

DROP TABLE IF EXISTS `t_childcategory_translation`;
CREATE TABLE IF NOT EXISTS `t_childcategory_translation` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `childcategory_id` int UNSIGNED DEFAULT NULL,
  `title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`id`),
  KEY `t_childcategory_translation_childcategory_id_foreign` (`childcategory_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `t_countries`
--

DROP TABLE IF EXISTS `t_countries`;
CREATE TABLE IF NOT EXISTS `t_countries` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `uid` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `name` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `code` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `t_countries_uid_unique` (`uid`),
  UNIQUE KEY `t_countries_name_unique` (`name`),
  UNIQUE KEY `t_countries_code_unique` (`code`)
) ENGINE=MyISAM AUTO_INCREMENT=250 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `t_countries`
--

INSERT INTO `t_countries` (`id`, `uid`, `name`, `code`, `is_active`) VALUES
(1, '5mxAzXaeyZQpuFdAIXhh35Wv2zvfDx9L', 'Afghanistan', 'AF', 1),
(2, '6r3NO15ZONkpbwoZIVHT64eTPa77yT9J', 'Åland Islands', 'AX', 1),
(3, '42grY4GQuDRvBoIu3ASzDKKKhbpyyjxG', 'Albania', 'AL', 1),
(4, 'jTFDlx4cTHXatY0Vbive7ZWaJFIuYox6', 'Algeria', 'DZ', 1),
(5, 'ooK4OGeiXYpQ00WZ8jiSJ8jy6rtOKqDp', 'American Samoa', 'AS', 1),
(6, '7nbeMNHh3dW3eHvvixW5TU9Ad9lbBOga', 'Andorra', 'AD', 1),
(7, 'USfyP48Y9QOHad21S8hpKxKLDnUsaDEw', 'Angola', 'AO', 1),
(8, 'sah0qOLhZx7AREi7quvmpL2MKAMVE7r6', 'Anguilla', 'AI', 1),
(9, 'IoDwLZrDe1qP4IiEE22ka4uTjvEeJSR8', 'Antarctica', 'AQ', 1),
(10, 'jjvh7HKgxH816Pyy95YezL9rU9MbM077', 'Antigua & Barbuda', 'AG', 1),
(11, 'MBfENuPukLjNfDztSsYGc5Sl3joCf8aI', 'Argentina', 'AR', 1),
(12, 'FzvdeYjWi6yISyePGtaCdHruu1JwqQqh', 'Armenia', 'AM', 1),
(13, 'PzAPyaI6XKTHoei4QGQOZPlXOMjm1FVz', 'Aruba', 'AW', 1),
(14, 'fhsnx64BOG64UAGrPjPDU49PKWZP7zXw', 'Australia', 'AU', 1),
(15, '92EvnJ5qr4Ebpdk4ITVeUgcAme2nS7ug', 'Austria', 'AT', 1),
(16, '2LpTwyhdgVuCm4VnUYWehKMnX9np3cgG', 'Azerbaijan', 'AZ', 1),
(17, '4odAHW9ZVn6lqqOH1BH46e4nhynYQjLj', 'Bahamas', 'BS', 1),
(18, 'jeSmKxJIqT9mPolerssBIpA7cyP8e2Q2', 'Bahrain', 'BH', 1),
(19, 'wwX8EXABjOCbIJ2ZQkmoEMNorwJH2aOY', 'Bangladesh', 'BD', 1),
(20, 'osoKti8qXND0NYYzJJ2ZbFjezTqurHAp', 'Barbados', 'BB', 1),
(21, '4F7pqlZvJ1fXq5vKdzVeWvfxlc2IGLJf', 'Belarus', 'BY', 1),
(22, 'Jc0zDjtpRXl0GDf3HD6MJAEnNdxUirde', 'Belgium', 'BE', 1),
(23, 'Gp7n16sA9VaXt9OCA9sc1stGBWYwp6N8', 'Belize', 'BZ', 1),
(24, 'ZvIerktz6vmE35VNqB8Bt6fSoC7WkZl0', 'Benin', 'BJ', 1),
(25, 'CQlqg4H7nmD8Xm8PwrWAccb6krpsqbVL', 'Bermuda', 'BM', 1),
(26, 'ifwTBJfXGoWHAgH2ntd44GCvaGkMcVkR', 'Bhutan', 'BT', 1),
(27, 'VxElveuN2b7SL5GcAnE5EygoFR5i64O8', 'Bolivia', 'BO', 1),
(28, 'zs5Gs9JhRZeSslHtAjWeHN2xm6FcmEh1', 'Bosnia & Herzegovina', 'BA', 1),
(29, 'wqZZxx93boHhTApZb989U11RT0imVYFk', 'Botswana', 'BW', 1),
(30, 'PlFrWUPZzxax5kjU9CZgSZ3Q28A7sUHa', 'Bouvet Island', 'BV', 1),
(31, 'tRBHB0L69CqFybxqnyPs5PAjFlSvyYge', 'Brazil', 'BR', 1),
(32, '7NNnajX3oIyRHUu8RvXxeLHv5ThDVJqS', 'British Indian Ocean Territory', 'IO', 1),
(33, 's5fjTASqsTBqrJWsRj2ESwlYtmUS9XXo', 'British Virgin Islands', 'VG', 1),
(34, 'bW07QPatLn86RoA9X0S1mhZMnv23ffaR', 'Brunei', 'BN', 1),
(35, 'kUjbYqfIDAumuSW792XkcmqBAp1BCqoN', 'Bulgaria', 'BG', 1),
(36, 'pfFgB6dwLGGMP46pZaI7kiqQ7hQIHom7', 'Burkina Faso', 'BF', 1),
(37, 'Ru636kIXQmp3minOqnBW4EBxV236YXfA', 'Burundi', 'BI', 1),
(38, 'STnXNGj8UaV7cDYQtxVKDISqwVov6Kx1', 'Cambodia', 'KH', 1),
(39, '6X4Dgjzhw4PM494JUd2hETgt5vQFVSzy', 'Cameroon', 'CM', 1),
(40, '3PnTvIiOWZ1K69U4CdOKcu1v22ChKVaL', 'Canada', 'CA', 1),
(41, 'VsBRQycmvvZQyFqn3CBt88wlAAjSjmBE', 'Cape Verde', 'CV', 1),
(42, 'z4m2MK5RZMPlmdGAd8p8VSYx6MqrdPJD', 'Caribbean Netherlands', 'BQ', 1),
(43, 'fErSBF4XCsVwL4FycB4La4K63rUd1SNX', 'Cayman Islands', 'KY', 1),
(44, 'jkCChE1RTtH0k3iLyiLlI1LHHSZWV8xl', 'Central African Republic', 'CF', 1),
(45, '0Fl16cGykm0HpvKLyoieK61ZIh2gLpNE', 'Chad', 'TD', 1),
(46, '4uryg6mDEU2NSnaixMqfhKeuSFGW74ZV', 'Chile', 'CL', 1),
(47, 'c6bQLgqSgcceRqYO2pGaSubie6UXdd4u', 'China', 'CN', 1),
(48, 'JEs9TTHUVGlVDMKuR1cVrRRVgjYGvxsB', 'Christmas Island', 'CX', 1),
(49, 'CpBBpSEwCjhXRX7TPR9rCh757UmvG0Ch', 'Cocos (Keeling) Islands', 'CC', 1),
(50, 'yYir8DRtOr5GgX1oiU5QJux9xnDGj3GG', 'Colombia', 'CO', 1),
(51, 'VSuDOvXV8ohZnlz460zQ9Bc4vS9DPRB4', 'Comoros', 'KM', 1),
(52, '4Uwt0Xx73F2TIUfI0N1mvfENiSU8Rr13', 'Congo - Brazzaville', 'CG', 1),
(53, 'NTo357vy2RYQ3L31cLIaj4NTmNOCsj9j', 'Congo - Kinshasa', 'CD', 1),
(54, 'yXMugf899YOn2UjABatsVmitTEIhF5nC', 'Cook Islands', 'CK', 1),
(55, 'KUyF4bhpGfH7pDOYhcwXXWvNHjTEU551', 'Costa Rica', 'CR', 1),
(56, 'd9oiBLhWuTDBhHqGAMcEiNNK6IcOvrIJ', 'Côte d’Ivoire', 'CI', 1),
(57, 'D0KpkKdMU0hY1AZbrYJ81zcIFX4BBfOK', 'Croatia', 'HR', 1),
(58, '55qGQbHjH1PB1bxzHWr4DjahSebBfjir', 'Cuba', 'CU', 1),
(59, 'yyNZiN5X7jksYvuAQO0htjF6o7iRgwh3', 'Curaçao', 'CW', 1),
(60, 'pqF5MWRsmP1wtTtnrBoWPSi39Fyepp8M', 'Cyprus', 'CY', 1),
(61, 'DuLn2NOpL0Rc8UmrCYzeTcCVVITPVFhr', 'Czechia', 'CZ', 1),
(62, 'qBTxhhVyZTd7nsGCKMU37tOfbuTByRZf', 'Denmark', 'DK', 1),
(63, 'iiVUnJXOcS0gFzLFNwGfQnjmuLWXUBOB', 'Djibouti', 'DJ', 1),
(64, 'PtbtRZl7suPo4sg3pxdLG5tyskQcDJ2Z', 'Dominica', 'DM', 1),
(65, '6t13gmK5oL8Zk3KuzH7j8lLE0JYFLstA', 'Dominican Republic', 'DO', 1),
(66, 'AYmKMVZZqdogADDBWnAWBeIfWg55seIb', 'Ecuador', 'EC', 1),
(67, 'Ult8v7iffrvvCg1MtVy8I5yDMUWPCBvu', 'Egypt', 'EG', 1),
(68, 'FOYwhaJSoL7Ndg7pLWVOpvNdma7Axftz', 'El Salvador', 'SV', 1),
(69, '7lyo6GnBaK0ZkjyeTSlvx72QE2HSRpnR', 'Equatorial Guinea', 'GQ', 1),
(70, 'YPHttZd1zIgwWUFx4l0imrSQKURXRog9', 'Eritrea', 'ER', 1),
(71, 'KQnsfb52RUMTyqvdLeooainDLEZ6rxL4', 'Estonia', 'EE', 1),
(72, 'huonwYsBpGdpBLhKTB7C2mHxhOuTU6ZK', 'Eswatini', 'SZ', 1),
(73, 'NeDheoY2qxWgKCIkQXLApdidQ77BP1Dx', 'Ethiopia', 'ET', 1),
(74, 'DDdi2yNbxJThawG9YLHjyYIN4UdxwvJB', 'Falkland Islands', 'FK', 1),
(75, 'ZYGf8GU6GayfmXqQ13IfVcDhiCWcLka5', 'Faroe Islands', 'FO', 1),
(76, '4FHQJswWcWf4Mxx1msidLt18oshdf1kQ', 'Fiji', 'FJ', 1),
(77, 'U824jBL845958NIR6Lgp0AVLaNClUR4B', 'Finland', 'FI', 1),
(78, 'ynq9g50lTqs2Bn797Ry2jPIUiS1SZ6BH', 'France', 'FR', 1),
(79, 'NUMzBAVPWaM9z7tuCcF1pdUzwLqW5q7u', 'French Guiana', 'GF', 1),
(80, 'y1vQLJBFWW6JzujD5Qg6BBOmjPl6LfrE', 'French Polynesia', 'PF', 1),
(81, 'tE4gE91Ds2AUswkffInKSKH3GaUon0X5', 'French Southern Territories', 'TF', 1),
(82, 'Omp5b6b8DdPH7S8bSMyfZ5yPJUphvX1A', 'Gabon', 'GA', 1),
(83, 'PhYXdGfv7LgJYUddrjGpuFeDBwPSfpOf', 'Gambia', 'GM', 1),
(84, '27a7aVbjSOhWog3m44lL6VvMrzZAWHof', 'Georgia', 'GE', 1),
(85, '3t5DPn8lpRem6Gm72V3hzhdrhMsNHrmG', 'Germany', 'DE', 1),
(86, 'wqktU3mpSkQn29gMQ9jPu6cvcdvMBUlm', 'Ghana', 'GH', 1),
(87, 's8wZxlhcXQifixvZGb2xya2Cr10eFMNM', 'Gibraltar', 'GI', 1),
(88, 'sHFgUAEYtOqLQTV1lEqPMPYv2v1kx6Rx', 'Greece', 'GR', 1),
(89, 'NTcZEzyEzTqHlIdI1toKiaRF7ubMbmro', 'Greenland', 'GL', 1),
(90, '5hWHdOh2S0Ylf9NQGVOgpujzekugjWuc', 'Grenada', 'GD', 1),
(91, 'sOURS6iRL6dnk8eflMf95lN1VEI4vbkx', 'Guadeloupe', 'GP', 1),
(92, '63PDbqj2sEiuieEZkvK4JWMhEjpO14W0', 'Guam', 'GU', 1),
(93, '3Crk3V5NWYMVhvtXfF7kgvVroRvKOsSG', 'Guatemala', 'GT', 1),
(94, '4umrxVGUFarR2C3wsho4IgcAG8TIcAxJ', 'Guernsey', 'GG', 1),
(95, 'bMpjel8Aa4u6HIK8OCq5GQjeMuG8Aw0V', 'Guinea', 'GN', 1),
(96, '3HJl1uvtnEA2ntq14qHXBw0DT5jWGLpE', 'Guinea-Bissau', 'GW', 1),
(97, 'C8G3ZW6HpRWHFiCXiY1Egtbsd1M3LsRO', 'Guyana', 'GY', 1),
(98, 'YcE0aVELwWUHIFp7aCkzv1SkS1AyXOvn', 'Haiti', 'HT', 1),
(99, 'Wuf59OmY39WgCrPKkyewKXUwh7ACQvBE', 'Heard & McDonald Islands', 'HM', 1),
(100, 'ZvbYXvcnhnoUYBcqln2xl75iCsbJYDut', 'Honduras', 'HN', 1),
(101, 'rQCXaFvVlFZZDjsGDF4q9tgGMgRSQ7PS', 'Hong Kong SAR China', 'HK', 1),
(102, '8HKqMGG2Zj8tKYQaBpCRbkZD1EVT2B0b', 'Hungary', 'HU', 1),
(103, 'RiBppRFkQ4bqkrnq2CctIKZNc9D2mIca', 'Iceland', 'IS', 1),
(104, 'sjHfdQHd67xQfpFB0hO3KBMIfrCYYoOH', 'India', 'IN', 1),
(105, 'DVyROuMjS2Q2L1zAAnQIEWDBjVbbRW6l', 'Indonesia', 'ID', 1),
(106, 'Iz3AqZbit21qNBFhA3QHLLVNbIpBK4hn', 'Iran', 'IR', 1),
(107, '0glBJ3Yemr4s5et3fqmF3NvKgi8MPMug', 'Iraq', 'IQ', 1),
(108, 'GMFylm4HmFSGrAZB687FpUV3bLWMTnjr', 'Ireland', 'IE', 1),
(109, 'l7Bje0sXW8CCJJ83YK3DBwnmADFBN9Hi', 'Isle of Man', 'IM', 1),
(110, 'HCzu7dhpsiXgtvU5th8AVL6UAkaHy9ZZ', 'Israel', 'IL', 1),
(111, 'SFut4oGj1V4eU5jGulyDYIlnwDd8gTS5', 'Italy', 'IT', 1),
(112, 'NChDC23QBOXD5485Ck8fxAbD6e4DSgtH', 'Jamaica', 'JM', 1),
(113, '2RFk0R11ZJ4fSyQVY7JmGY97MZvNbkl3', 'Japan', 'JP', 1),
(114, 'j09OQogVe1gYviP27iAv3xAlKHhKHhY6', 'Jersey', 'JE', 1),
(115, 'GSzlMhdukvpwWMtdIkfHlzQIJJXrKHPu', 'Jordan', 'JO', 1),
(116, 'xP7KVD7dzgYqusiMiFCpL7rLtVsUCzh0', 'Kazakhstan', 'KZ', 1),
(117, '4C6mtmDP8p5LgiKgQ03Np07bSoC5coWc', 'Kenya', 'KE', 1),
(118, 'b7fL7m9r9loqCDg4OZQK1vuAP7ElhZSP', 'Kiribati', 'KI', 1),
(119, 'MRLMTXSLcseqH6KZJrisOveB4xoRHNPZ', 'Kuwait', 'KW', 1),
(120, 'fn6m5tvuVdVADQ8SzREWsZ5Tk9eD6kHj', 'Kyrgyzstan', 'KG', 1),
(121, 'yg4ZAL2WutpbzANuxQRKShWkupqDr6yJ', 'Laos', 'LA', 1),
(122, '2BMe8TP55kDiGGnjRobC8yFXApNcQmJ2', 'Latvia', 'LV', 1),
(123, 'D2QeE6fDCfeb6SPBerQY9nXdiHGxF4DS', 'Lebanon', 'LB', 1),
(124, 'kBiam7WDv66bffomg3z2e0Onw9g8Ojho', 'Lesotho', 'LS', 1),
(125, 'gdO4d79NaRR4EQFLR9S5zW5tGaNhbsMZ', 'Liberia', 'LR', 1),
(126, 'v4769cF4kG6Sm6UK7nClDaFg6ld9itRb', 'Libya', 'LY', 1),
(127, 'y2ASRFSBlJvWxxIYUUR2RXkUBmJXRhtd', 'Liechtenstein', 'LI', 1),
(128, '4UoMKDDJQ0OX2gT91QuesLicf2HPgFTe', 'Lithuania', 'LT', 1),
(129, '4AyVlmK392K1tXnVklKp587ccitbFdHK', 'Luxembourg', 'LU', 1),
(130, 'EDcLzPvHdxcpkmn1p0f1pM5bHZMBDUWZ', 'Macao SAR China', 'MO', 1),
(131, 'W4gtT0LVHLPk0M1wRTOtEX5kG2XWrdS5', 'Madagascar', 'MG', 1),
(132, 'llrMosNy7NT2MNFyi93UCpsnhlPi2fYp', 'Malawi', 'MW', 1),
(133, 'cUMi3Po5eMqOZH9LzPCsXqVImlX6q4OD', 'Malaysia', 'MY', 1),
(134, 'slIWbrsSXGpOb3nTfQFMNgyH5Aq7fkIM', 'Maldives', 'MV', 1),
(135, 'fsU1ozFSWgCyQtxnFSI4aOzrmdLZwyiY', 'Mali', 'ML', 1),
(136, 'yPxlyFPObZgfZarKLHCRDi20KWQ2R0nY', 'Malta', 'MT', 1),
(137, 'YTi5db5FT8qe7P8fU2S4Oa4ld5BstvWj', 'Marshall Islands', 'MH', 1),
(138, 'ZfUfFS52tFiv60YSrlsrTLie7ggievhf', 'Martinique', 'MQ', 1),
(139, 'GufYzQPugipiXtqW4zZodopEPRUyknON', 'Mauritania', 'MR', 1),
(140, 'inpJOsca2i20iqYoxMBnrs5zaFudjvJs', 'Mauritius', 'MU', 1),
(141, 'usLmlwDwbYx8GZ5Mt8SRtFQWuorP9Vi8', 'Mayotte', 'YT', 1),
(142, 'w8g1OQ2dg4QkfsQ2q0OwDuPhLxYkCI9t', 'Mexico', 'MX', 1),
(143, '3xBM6J2PNxlKOGdkhp2DWNnvMqmQv0Nf', 'Micronesia', 'FM', 1),
(144, 'hNXPrLT1WZFHmcZJAv6vNRTusVLhjGd4', 'Moldova', 'MD', 1),
(145, 'A49sSq2axhIEIhkGxFzD9KNsa35ZlxSY', 'Monaco', 'MC', 1),
(146, 'hCCB7xGkOj0n3BXI5T9D14jqXRizJtCc', 'Mongolia', 'MN', 1),
(147, '3d0bbyQwC0IoVtnPe4qz3DN3Qctqiy3L', 'Montenegro', 'ME', 1),
(148, 'brUnCdLYXtxlB5CDG7BgKF0s5eA21EuP', 'Montserrat', 'MS', 1),
(149, 'tz8A0hlT33kDG4Tju0KOO97nF9XrBlWf', 'Morocco', 'MA', 1),
(150, 'ox8nAQaS7pYwjR4M37H7PRcvBn6MDhFC', 'Mozambique', 'MZ', 1),
(151, 'or9nM2KZPhoYbCqJDXn3Uin2VqfUmyVo', 'Myanmar (Burma)', 'MM', 1),
(152, 'QlM3m6h3E4vDBMZqDw8y6kGWVXR7hh5G', 'Namibia', 'NA', 1),
(153, 'ABMcJVlDJT3eg5a8whpH1zJLlW0IvGQz', 'Nauru', 'NR', 1),
(154, 'k26aWfpCrBKqxDKnlf1hkgEGZKSsYtUT', 'Nepal', 'NP', 1),
(155, 'XllOposRA5EuGs4UDQ3KF9TXtbJhzRwG', 'Netherlands', 'NL', 1),
(156, 'PeZjFBAKE0U5x5NWEPPjFyOGRV45KAz4', 'New Caledonia', 'NC', 1),
(157, 'UZplXvpTOdOy6ay5uyTsIXxwqyDd6G8p', 'New Zealand', 'NZ', 1),
(158, '3yNXgkVdxtEXW8TF1hckPhoMcVpgP0zF', 'Nicaragua', 'NI', 1),
(159, 'yUfbFMvMN4eHM5lSvaUjqBiEUv9jDGcZ', 'Niger', 'NE', 1),
(160, 'KZv3fFewY0wBQkEXjT0LD6NQG7sOnGaA', 'Nigeria', 'NG', 1),
(161, 'x8MChePAFy5EiGNKPZfn6OaxYCz7ZAL6', 'Niue', 'NU', 1),
(162, '6cSxb27ukzMvjOBYDFBok3pX6zxaWoC2', 'Norfolk Island', 'NF', 1),
(163, 'z1UzmVBv3459Jkw63mq9U3mnecqRpRFg', 'North Korea', 'KP', 1),
(164, '0lryZBWyaLA3gJQZWJJXMvTa8yD4ciHQ', 'North Macedonia', 'MK', 1),
(165, 'uG2lme2y9xjXb7Dha4VcO3TmPWJOBAH1', 'Northern Mariana Islands', 'MP', 1),
(166, 'tzJXEX3GJrZXnTHisDZ8ePKb5rxzhqp5', 'Norway', 'NO', 1),
(167, 'SoviYdYhctfTCdiElR1XiWbV9Krc328F', 'Oman', 'OM', 1),
(168, 'If91PhbO9yfANhUdv6nbkn5RcXXDYzvv', 'Pakistan', 'PK', 1),
(169, '7X81QJIKqhghUyUFUgwvNcrS3tvFKvae', 'Palau', 'PW', 1),
(170, 'fzF1nuyq9Z344IIzWtcUSRz2PqmYjnYv', 'Palestinian Territories', 'PS', 1),
(171, 'VIeDE7DYcJN5i3vdlms10RLYkG3Nfc0L', 'Panama', 'PA', 1),
(172, 'K6BGQOL4V6x5ZHbZWH46ezEGNygBjdLR', 'Papua New Guinea', 'PG', 1),
(173, 't7kAsTROKyAp0ru4n3u3QMQDwqjKcklj', 'Paraguay', 'PY', 1),
(174, 'Kjk9pNHAFKlw5c3wtAjPvcJHGfEjRl4e', 'Peru', 'PE', 1),
(175, 'bWSx0RegHaWDW2bnrOYRWSmwgwcgL2Jp', 'Philippines', 'PH', 1),
(176, 'PesLxKn0q4gSEO4MRDEs4FKNiyp5QOb8', 'Pitcairn Islands', 'PN', 1),
(177, 'rnYYf1Novj35gwmcoamzDTG7irDmJon5', 'Poland', 'PL', 1),
(178, 'uoPBfKCBcQGWYcvGn6Bg4928JWaf2WnQ', 'Portugal', 'PT', 1),
(179, 'iAPLcPgqS7VRZtp3VeEUnDDQ1JGndhwW', 'Puerto Rico', 'PR', 1),
(180, 'tm9IJHJJACZ1f76jviTdbutqLxRR8XdW', 'Qatar', 'QA', 1),
(181, 'q7reYqtc65GIkBRXDgorWKNSoFQmqZSD', 'Réunion', 'RE', 1),
(182, 'EpF8eaazYhXcG81gKRsaoiEPR3LCJanA', 'Romania', 'RO', 1),
(183, 'onGxfSmQyLncVhvWEI0cxLN4gfjK8vOO', 'Russia', 'RU', 1),
(184, 'hPcXPAdfM7V2eVmtw2lbmcGy3fFvk9kL', 'Rwanda', 'RW', 1),
(185, 'Hbay013QEC5kQjLGSQsM1KGgStlLCnfL', 'Samoa', 'WS', 1),
(186, 'KkG72KfgFnSL9H0Y4iA20RgvKxshmuZg', 'San Marino', 'SM', 1),
(187, 'jNLnE3vYV4UE5gMQDDGV11ViOI85yOEj', 'São Tomé & Príncipe', 'ST', 1),
(188, 'QFirEcB5lg5Blajud5J5xwwzWfr6D2dH', 'Saudi Arabia', 'SA', 1),
(189, '0Vep4HquNTPWK0wNMVush4a4sQu4EYh0', 'Senegal', 'SN', 1),
(190, 'jmszbbthpGdpvMBkcYfqrVzs6nDQFvfx', 'Serbia', 'RS', 1),
(191, 'M5e3nSSGI6vhsAcSOUGb4rQTwrHS08E7', 'Seychelles', 'SC', 1),
(192, 'pQHXuqit5j523f2IB99XJeJSU60gylID', 'Sierra Leone', 'SL', 1),
(193, 'sSUTAN7S8vx9UM99w4PATbzFO00w6FC8', 'Singapore', 'SG', 1),
(194, 'fSrVhSMcigacrhNGXGpMyge8Yq4zUmQ4', 'Sint Maarten', 'SX', 1),
(195, 'jxp5Fdz9JpdMCuNJ3tALDSSbV3Q4RRfm', 'Slovakia', 'SK', 1),
(196, 'y0epJ0gp5PrVCibPHzwhhxLVUljwxGld', 'Slovenia', 'SI', 1),
(197, 'd02T9XwNMIREYWUoVvP6rwBL8h3JGjrr', 'Solomon Islands', 'SB', 1),
(198, '7uZhupCM99nZQArABVv0DIdk9YpEczhb', 'Somalia', 'SO', 1),
(199, 'spztKRVXxcdMny2vdgJhNSe7sd0dIQmq', 'South Africa', 'ZA', 1),
(200, 'NrG6GRn7c60kF2VOekmZVOy6CVBNeeXn', 'South Georgia & South Sandwich Islands', 'GS', 1),
(201, 'llAxAPJLDjbIkIFks60YXbNngYE7xFuy', 'South Korea', 'KR', 1),
(202, 'F0K7lgfq61RF6eVfhRjIZCs8WU1XgDZ7', 'South Sudan', 'SS', 1),
(203, 'fFHpMddU97ZB57SCPQn6ty1CtrlobMvS', 'Spain', 'ES', 1),
(204, 'Bagjp6gko1uLPEzNrkk4SiNRZLytoq7j', 'Sri Lanka', 'LK', 1),
(205, 'bR9TeSoQvNUNB3qRwOaI04U3sAWBRt8k', 'St. Barthélemy', 'BL', 1),
(206, 'lrQf54Na2olPA4QYRTUIJPHYtscafDJo', 'St. Helena', 'SH', 1),
(207, '3wIMn5WfuYpha0l7cLK88hXWzz020YlA', 'St. Kitts & Nevis', 'KN', 1),
(208, '9zOtLibLt3441mLQexTl3KkpBYuDlhCN', 'St. Lucia', 'LC', 1),
(209, 'ZsRQetoNpgLNgy0WrLRWpWBChS0iFPKb', 'St. Martin', 'MF', 1),
(210, 'mTh1IQ5gWpkn4omslOErkJl2BhGbFIXJ', 'St. Pierre & Miquelon', 'PM', 1),
(211, 'CH7TssBR5XnxJTBYVywpcp5z2RXYCqmT', 'St. Vincent & Grenadines', 'VC', 1),
(212, 'GYTzIP3OpcGQcPg5BCsEuX0AIcQM7nsu', 'Sudan', 'SD', 1),
(213, 'qD8hIy7MSZmRK2ZqDsHUIP0bKm5MYzOB', 'Suriname', 'SR', 1),
(214, 'S28p6nqzXOjiCp1PaIEFTKPmIfzN5Khu', 'Svalbard & Jan Mayen', 'SJ', 1),
(215, 'vHVIaCEnzdsqKHoHNmBNglnhtpEYCl8H', 'Sweden', 'SE', 1),
(216, 'EK9LAlPKvDwItLnsVLzdtbgy02ECfG8E', 'Switzerland', 'CH', 1),
(217, 'Erc9M2baFg8Q55GYUC9lOdKv8NLwO2Kv', 'Syria', 'SY', 1),
(218, 'kvUPg3zGaRY0REyMAh1vTmhWqv7r8Apz', 'Taiwan', 'TW', 1),
(219, 'KfbsFyu4rUIw5qCHMfzROtGmu8WY56yI', 'Tajikistan', 'TJ', 1),
(220, 'AzUyKjMAZ8kVbAWiZ118q9ows9HlTj4B', 'Tanzania', 'TZ', 1),
(221, 'EUhlYbTm6h32GqO4Qb5ShMEqQVfXSH1k', 'Thailand', 'TH', 1),
(222, 'v7PH1VybXs0XK5GRHHREfaOYOpke0jRy', 'Timor-Leste', 'TL', 1),
(223, 'pw9NBcY0cOD8jis54cUCs7D14XfQsmKC', 'Togo', 'TG', 1),
(224, 'qqT5mmMtHFFgJ28gkeLcCtMc6LqrOZOl', 'Tokelau', 'TK', 1),
(225, '70v4yrMEEQTWeLFUxsaSTmXjWfb5Kz4Q', 'Tonga', 'TO', 1),
(226, '8p359IcffUXfo041CYUVlUr5iEin9Tj0', 'Trinidad & Tobago', 'TT', 1),
(227, 'yTFobj2YQvBezN28h6UcsghDxmWvdnG6', 'Tunisia', 'TN', 1),
(228, 'js0xDoQIvwXghjtYrfGJ5qcUphRCXqUb', 'Turkey', 'TR', 1),
(229, 'C6Bl3DdkljgDK3oH7iFUqMmG5Dqwm4HZ', 'Turkmenistan', 'TM', 1),
(230, 'cidCMebSRsB81XkD6cojOwJhG9ONyDU7', 'Turks & Caicos Islands', 'TC', 1),
(231, 'HoY4tY89CdzTxf4wbYld8M2H8f08uIFa', 'Tuvalu', 'TV', 1),
(232, 'yL25IOltU2oUwOjtDTVj0tg5xAcAbfET', 'U.S. Outlying Islands', 'UM', 1),
(233, 'PwDBNHtRjSZWByZIGZ9uK8ORM5mkJX6O', 'U.S. Virgin Islands', 'VI', 1),
(234, 'p1tJomHxDEDtoJ38FaedwjMR47wqX0q3', 'Uganda', 'UG', 1),
(235, 'Ej0tVnXT44bGRu53sNGLKrh3VjczslJD', 'Ukraine', 'UA', 1),
(236, 'HJSzDcWNJHFC491lyvqIgzP3IqmAPKQf', 'United Arab Emirates', 'AE', 1),
(237, '0TGjYvHFpJSPlkR2uMmHQXdYLhsynaE1', 'United Kingdom', 'GB', 1),
(238, 'VgFTCyBAb7Clj7uM5HqVd6nAS5mfpRHp', 'United States', 'US', 1),
(239, 'vnwZ28cfv0Qs6vYdl9ScjPAtqxkNhb9T', 'Uruguay', 'UY', 1),
(240, 'nvA3lfeTq8ugEh9kCcM12eJ0rrWQuosf', 'Uzbekistan', 'UZ', 1),
(241, 'mLFPxhJc35n7wKpC9MhaD4FlZdF2M1sj', 'Vanuatu', 'VU', 1),
(242, 'CMYjVSwP1syYDDccFWh2w0bdRYmHSQK1', 'Vatican City', 'VA', 1),
(243, 'bapAuh2nJLorKFtGIslQtbi6MBrq83XF', 'Venezuela', 'VE', 1),
(244, '7SUNDzYXjT7GTWYonhC7Ueap0Fzd2eFz', 'Vietnam', 'VN', 1),
(245, '0Aef1e7aTcWASqMmLBExy4tbuI33Cpqs', 'Wallis & Futuna', 'WF', 1),
(246, '8urxShaV2T538zmC9qLexzPj4o1iI5UD', 'Western Sahara', 'EH', 1),
(247, 'NffVtbGXAb3HiTXpAqLnUpkMZPv00zJ1', 'Yemen', 'YE', 1),
(248, 'qqImDHAqWq7FOt7GmRE0fl6l2VmP4Ick', 'Zambia', 'ZM', 1),
(249, 'vqiJ37DdxRmoOA0DwLCasAg2ExU7Mysg', 'Zimbabwe', 'ZW', 1);

-- --------------------------------------------------------

--
-- Table structure for table `t_coupons`
--

DROP TABLE IF EXISTS `t_coupons`;
CREATE TABLE IF NOT EXISTS `t_coupons` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `uid` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `coupon_code` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `coupon_type` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'amount',
  `discount_value` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `is_unlimited` tinyint(1) DEFAULT '0',
  `usage_times` int DEFAULT NULL,
  `used_times` int DEFAULT '0',
  `start_date` timestamp NULL DEFAULT NULL,
  `ends_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `t_coupons_uid_unique` (`uid`),
  UNIQUE KEY `t_coupons_coupon_code_unique` (`coupon_code`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `t_customers`
--

DROP TABLE IF EXISTS `t_customers`;
CREATE TABLE IF NOT EXISTS `t_customers` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `uid` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `username` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `provider_name` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `provider_id` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_verified` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `t_customers_uid_unique` (`uid`),
  UNIQUE KEY `t_customers_username_unique` (`username`),
  UNIQUE KEY `t_customers_email_unique` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `t_customers`
--

INSERT INTO `t_customers` (`id`, `uid`, `username`, `email`, `password`, `provider_name`, `provider_id`, `is_verified`, `created_at`, `updated_at`) VALUES
(1, 'zhA4mBwi5LDah7XBp9WICVdLyCSP7q8I', 'admin', 'mralexandertolson@gmail.com', '$argon2id$v=19$t=3,m=4096,p=1$1nEys/SJaXb445sk+zA/Ww$KE/mhCtad9Uw2GLSkARSbhayWtU/Ukrgi4cHo0LJwaI', NULL, NULL, 1, '2021-08-06 12:51:19', '2021-08-07 16:22:42');

-- --------------------------------------------------------

--
-- Table structure for table `t_file_manager`
--

DROP TABLE IF EXISTS `t_file_manager`;
CREATE TABLE IF NOT EXISTS `t_file_manager` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `uid` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `file_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `file_extension` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `file_type` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `file_size` bigint DEFAULT NULL,
  `file_folder` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `uploader_id` int UNSIGNED DEFAULT NULL,
  `is_private` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `t_file_manager_uid_unique` (`uid`),
  KEY `t_file_manager_uploader_id_foreign` (`uploader_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `t_flash_deals`
--

DROP TABLE IF EXISTS `t_flash_deals`;
CREATE TABLE IF NOT EXISTS `t_flash_deals` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `uid` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `product_id` int UNSIGNED DEFAULT NULL,
  `ends_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `t_flash_deals_uid_unique` (`uid`),
  KEY `t_flash_deals_product_id_foreign` (`product_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `t_invoices`
--

DROP TABLE IF EXISTS `t_invoices`;
CREATE TABLE IF NOT EXISTS `t_invoices` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `uid` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `order_id` int UNSIGNED DEFAULT NULL,
  `invoice_name` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `invoice_status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'pending',
  `invoice_amount` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `t_invoices_uid_unique` (`uid`),
  UNIQUE KEY `t_invoices_invoice_name_unique` (`invoice_name`),
  KEY `t_invoices_order_id_foreign` (`order_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `t_messages`
--

DROP TABLE IF EXISTS `t_messages`;
CREATE TABLE IF NOT EXISTS `t_messages` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `uid` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `name` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `subject` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `ip` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_seen` tinyint(1) DEFAULT '0',
  `is_replied` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `t_messages_uid_unique` (`uid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `t_moderators`
--

DROP TABLE IF EXISTS `t_moderators`;
CREATE TABLE IF NOT EXISTS `t_moderators` (
  `uuid` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `role` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'admin',
  `verification_pin` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  UNIQUE KEY `t_moderators_username_unique` (`username`),
  UNIQUE KEY `t_moderators_email_unique` (`email`),
  UNIQUE KEY `t_moderators_password_unique` (`password`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `t_orders`
--

DROP TABLE IF EXISTS `t_orders`;
CREATE TABLE IF NOT EXISTS `t_orders` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `uid` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `customer_id` int UNSIGNED DEFAULT NULL,
  `customer_ip` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `order_number` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `order_status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'pending',
  `cancel_reason` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `payment_id` int UNSIGNED DEFAULT NULL,
  `total_price` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `subtotal_price` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `shipping_cost` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `taxes_cost` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `discount_code` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `discount_type` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `discount_value` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `invoice_id` int UNSIGNED DEFAULT NULL,
  `invoice_tracking_code` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `order_notes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `order_source_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'desktop',
  `placed_at` timestamp NULL DEFAULT NULL,
  `processed_at` timestamp NULL DEFAULT NULL,
  `shipped_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `cancelled_at` timestamp NULL DEFAULT NULL,
  `delivered_at` timestamp NULL DEFAULT NULL,
  `refunded_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `t_orders_uid_unique` (`uid`),
  UNIQUE KEY `t_orders_order_number_unique` (`order_number`),
  KEY `t_orders_customer_id_foreign` (`customer_id`),
  KEY `t_orders_payment_id_foreign` (`payment_id`),
  KEY `t_orders_invoice_id_foreign` (`invoice_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `t_order_address`
--

DROP TABLE IF EXISTS `t_order_address`;
CREATE TABLE IF NOT EXISTS `t_order_address` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `uid` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `customer_id` int UNSIGNED DEFAULT NULL,
  `order_id` int UNSIGNED DEFAULT NULL,
  `name` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `country_id` int UNSIGNED DEFAULT NULL,
  `state` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `city` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `zipcode` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `t_order_address_uid_unique` (`uid`),
  KEY `t_order_address_customer_id_foreign` (`customer_id`),
  KEY `t_order_address_order_id_foreign` (`order_id`),
  KEY `t_order_address_country_id_foreign` (`country_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `t_order_products`
--

DROP TABLE IF EXISTS `t_order_products`;
CREATE TABLE IF NOT EXISTS `t_order_products` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `uid` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `order_id` int UNSIGNED DEFAULT NULL,
  `product_id` int UNSIGNED DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `single_price` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `total_price` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `t_order_products_uid_unique` (`uid`),
  KEY `t_order_products_order_id_foreign` (`order_id`),
  KEY `t_order_products_product_id_foreign` (`product_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `t_order_product_variants`
--

DROP TABLE IF EXISTS `t_order_product_variants`;
CREATE TABLE IF NOT EXISTS `t_order_product_variants` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `uid` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `order_id` int UNSIGNED DEFAULT NULL,
  `product_id` int UNSIGNED DEFAULT NULL,
  `variants` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `t_order_product_variants_uid_unique` (`uid`),
  KEY `t_order_product_variants_order_id_foreign` (`order_id`),
  KEY `t_order_product_variants_product_id_foreign` (`product_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `t_pages`
--

DROP TABLE IF EXISTS `t_pages`;
CREATE TABLE IF NOT EXISTS `t_pages` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `column` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'first',
  `handler` varchar(140) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `seo_title` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `seo_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `og_image_id` int UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `t_pages_handler_unique` (`handler`),
  KEY `t_pages_media_small_id_foreign` (`og_image_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `t_page_translation`
--

DROP TABLE IF EXISTS `t_page_translation`;
CREATE TABLE IF NOT EXISTS `t_page_translation` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `page_id` int UNSIGNED DEFAULT NULL,
  `title_ar` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `title_az` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `title_cn` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `title_de` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `title_en` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `title_es` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `title_fr` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `title_hi` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `title_hu` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `title_jp` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `title_nl` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `title_po` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `title_pt` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `title_ro` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `title_ru` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `title_th` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `title_tr` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `title_ua` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `content_ar` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `content_az` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `content_cn` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `content_de` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `content_en` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `content_es` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `content_fr` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `content_hi` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `content_hu` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `content_jp` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `content_nl` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `content_po` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `content_pt` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `content_ro` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `content_ru` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `content_th` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `content_tr` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `content_ua` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`id`),
  KEY `t_page_translation_page_id_foreign` (`page_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `t_password_tokens`
--

DROP TABLE IF EXISTS `t_password_tokens`;
CREATE TABLE IF NOT EXISTS `t_password_tokens` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ip` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `t_payments_history`
--

DROP TABLE IF EXISTS `t_payments_history`;
CREATE TABLE IF NOT EXISTS `t_payments_history` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `uid` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `customer_id` int UNSIGNED DEFAULT NULL,
  `order_id` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `transaction_id` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `payment_method` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'paypal',
  `payment_amount` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `payment_currency` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `payment_currency_locale` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `payment_details` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `t_payments_history_uid_unique` (`uid`),
  UNIQUE KEY `t_payments_history_transaction_id_unique` (`transaction_id`),
  KEY `t_payments_history_customer_id_foreign` (`customer_id`),
  KEY `t_payments_history_order_id_foreign` (`order_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `t_products`
--

DROP TABLE IF EXISTS `t_products`;
CREATE TABLE IF NOT EXISTS `t_products` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `uid` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `pid` bigint DEFAULT NULL,
  `media_small_id` int UNSIGNED DEFAULT NULL,
  `media_medium_id` int UNSIGNED DEFAULT NULL,
  `media_large_id` int UNSIGNED DEFAULT NULL,
  `is_product_zoomer` tinyint(1) NOT NULL DEFAULT '1',
  `handler` varchar(160) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tags` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `stock` int DEFAULT '0',
  `video_provider` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `video_link` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `discount_type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `discount_value` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `category_id` int UNSIGNED DEFAULT NULL,
  `subcategory_id` int UNSIGNED DEFAULT NULL,
  `childcategory_id` int UNSIGNED DEFAULT NULL,
  `visits` bigint DEFAULT '0',
  `sales` bigint DEFAULT '0',
  `rating` bigint DEFAULT '0',
  `brand_id` int UNSIGNED DEFAULT NULL,
  `price` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `purchase_unit` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tax_value` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tax_type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `shipping_type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `shipping_cost` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `product_barcode` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `original_source` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `t_products_uid_unique` (`uid`),
  UNIQUE KEY `t_products_pid_unique` (`pid`),
  UNIQUE KEY `t_products_handler_unique` (`handler`),
  KEY `t_products_media_small_id_foreign` (`media_small_id`),
  KEY `t_products_media_medium_id_foreign` (`media_medium_id`),
  KEY `t_products_media_large_id_foreign` (`media_large_id`),
  KEY `t_products_category_id_foreign` (`category_id`),
  KEY `t_products_subcategory_id_foreign` (`subcategory_id`),
  KEY `t_products_childcategory_id_foreign` (`childcategory_id`),
  KEY `t_products_brand_id_foreign` (`brand_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `t_product_gallery`
--

DROP TABLE IF EXISTS `t_product_gallery`;
CREATE TABLE IF NOT EXISTS `t_product_gallery` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `uid` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `product_id` int UNSIGNED DEFAULT NULL,
  `large_images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `medium_images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `small_images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `t_product_gallery_uid_unique` (`uid`),
  KEY `t_product_gallery_product_id_foreign` (`product_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `t_product_reviews`
--

DROP TABLE IF EXISTS `t_product_reviews`;
CREATE TABLE IF NOT EXISTS `t_product_reviews` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `uid` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `product_id` int UNSIGNED DEFAULT NULL,
  `customer_id` int UNSIGNED DEFAULT NULL,
  `rating_value` int DEFAULT NULL,
  `review_comment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `is_private` tinyint(1) DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '0',
  `is_seen` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `t_product_reviews_uid_unique` (`uid`),
  KEY `t_product_reviews_product_id_foreign` (`product_id`),
  KEY `t_product_reviews_customer_id_foreign` (`customer_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `t_product_seo`
--

DROP TABLE IF EXISTS `t_product_seo`;
CREATE TABLE IF NOT EXISTS `t_product_seo` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `uid` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `product_id` int UNSIGNED DEFAULT NULL,
  `title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `t_product_seo_uid_unique` (`uid`),
  KEY `t_product_seo_product_id_foreign` (`product_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `t_product_translation`
--

DROP TABLE IF EXISTS `t_product_translation`;
CREATE TABLE IF NOT EXISTS `t_product_translation` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_id` int UNSIGNED DEFAULT NULL,
  `title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `description_ar` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `description_az` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `description_cn` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `description_de` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `description_en` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `description_es` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `description_fr` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `description_hi` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `description_hu` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `description_jp` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `description_nl` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `description_po` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `description_pt` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `description_ro` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `description_ru` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `description_th` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `description_tr` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `description_ua` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`id`),
  KEY `t_product_translation_product_id_foreign` (`product_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `t_product_variants`
--

DROP TABLE IF EXISTS `t_product_variants`;
CREATE TABLE IF NOT EXISTS `t_product_variants` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `uid` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `product_id` int UNSIGNED DEFAULT NULL,
  `name` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `type` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `options` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `t_product_variants_uid_unique` (`uid`),
  KEY `t_product_variants_product_id_foreign` (`product_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `t_product_variant_attributes`
--

DROP TABLE IF EXISTS `t_product_variant_attributes`;
CREATE TABLE IF NOT EXISTS `t_product_variant_attributes` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `uid` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `product_id` int UNSIGNED DEFAULT NULL,
  `attributes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `t_product_variant_attributes_uid_unique` (`uid`),
  KEY `t_product_variant_attributes_product_id_foreign` (`product_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `t_product_visitors`
--

DROP TABLE IF EXISTS `t_product_visitors`;
CREATE TABLE IF NOT EXISTS `t_product_visitors` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `uid` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `product_id` int UNSIGNED DEFAULT NULL,
  `ip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `country` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `country_code` varchar(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `region` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `region_code` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `city` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `zip_code` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `timezone` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `latitude` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `longitude` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_agent` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `browser_name` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `browser_version` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `browser_language` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `os_name` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `os_version` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `engine_name` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `engine_version` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `device_name` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `device_model` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `device_type` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `cpu_architecture` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `bot_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `bot_category` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `bot_url` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `bot_producer_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `bot_producer_url` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `utm_medium` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `utm_campaign` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `utm_source` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `url_queries` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `visit_from` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `referrer` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `first_visit` timestamp NULL DEFAULT NULL,
  `last_visit` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `t_product_visitors_uid_unique` (`uid`),
  KEY `t_product_visitors_product_id_foreign` (`product_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `t_refunds_requests`
--

DROP TABLE IF EXISTS `t_refunds_requests`;
CREATE TABLE IF NOT EXISTS `t_refunds_requests` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `customer_id` int UNSIGNED DEFAULT NULL,
  `order_id` int UNSIGNED DEFAULT NULL,
  `refund_reason` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `is_seen` tinyint(1) NOT NULL DEFAULT '0',
  `is_processed` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `t_refunds_requests_customer_id_foreign` (`customer_id`),
  KEY `t_refunds_requests_order_id_foreign` (`order_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `t_search_history`
--

DROP TABLE IF EXISTS `t_search_history`;
CREATE TABLE IF NOT EXISTS `t_search_history` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `uid` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `keyword` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `counter` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `t_search_history_uid_unique` (`uid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `t_service_cod`
--

DROP TABLE IF EXISTS `t_service_cod`;
CREATE TABLE IF NOT EXISTS `t_service_cod` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'Cash on delivery',
  `description` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'Pay upon delivery',
  `logo_id` int UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `t_service_cod_logo_id_foreign` (`logo_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `t_service_cod`
--

INSERT INTO `t_service_cod` (`id`, `title`, `description`, `logo_id`) VALUES
(1, 'Cash on delivery', 'Pay upon delivery', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `t_service_offline`
--

DROP TABLE IF EXISTS `t_service_offline`;
CREATE TABLE IF NOT EXISTS `t_service_offline` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'Offline',
  `description` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'Bank, Check payment',
  `details` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `logo_id` int UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `t_service_offline_logo_id_foreign` (`logo_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `t_service_offline`
--

INSERT INTO `t_service_offline` (`id`, `title`, `description`, `details`, `logo_id`) VALUES
(1, 'Bank transfer', 'Bank, Check payment', 'Put your bank account information here', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `t_service_paypal`
--

DROP TABLE IF EXISTS `t_service_paypal`;
CREATE TABLE IF NOT EXISTS `t_service_paypal` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `env` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'sandbox',
  `title` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'PayPal',
  `description` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'Pay using your PayPal account',
  `public_key` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `secret_key` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `logo_id` int UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `t_service_paypal_logo_id_foreign` (`logo_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `t_service_paypal`
--

INSERT INTO `t_service_paypal` (`id`, `env`, `title`, `description`, `public_key`, `secret_key`, `logo_id`) VALUES
(1, 'sandbox', 'PayPal', 'Pay using your PayPal account', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `t_service_stripe`
--

DROP TABLE IF EXISTS `t_service_stripe`;
CREATE TABLE IF NOT EXISTS `t_service_stripe` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'Stripe',
  `description` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'Credit Card Payment',
  `public_key` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `secret_key` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `logo_id` int UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `t_service_stripe_logo_id_foreign` (`logo_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `t_service_stripe`
--

INSERT INTO `t_service_stripe` (`id`, `title`, `description`, `public_key`, `secret_key`, `logo_id`) VALUES
(1, 'Stripe', 'Credit Card Payment', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `t_service_twilio`
--

DROP TABLE IF EXISTS `t_service_twilio`;
CREATE TABLE IF NOT EXISTS `t_service_twilio` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `account_sid` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `auth_token` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `phone` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `t_service_twilio`
--

INSERT INTO `t_service_twilio` (`id`, `account_sid`, `auth_token`, `phone`) VALUES
(1, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `t_settings_analytics`
--

DROP TABLE IF EXISTS `t_settings_analytics`;
CREATE TABLE IF NOT EXISTS `t_settings_analytics` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `google_gtm_id` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `facebook_pixel_id` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `snapchat_pixel_id` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tiktok_pixel_id` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `t_settings_analytics`
--

INSERT INTO `t_settings_analytics` (`id`, `google_gtm_id`, `facebook_pixel_id`, `snapchat_pixel_id`, `tiktok_pixel_id`) VALUES
(1, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `t_settings_auth`
--

DROP TABLE IF EXISTS `t_settings_auth`;
CREATE TABLE IF NOT EXISTS `t_settings_auth` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `enable_facebook_login` tinyint(1) DEFAULT '0',
  `enable_twitter_login` tinyint(1) DEFAULT '0',
  `enable_google_login` tinyint(1) DEFAULT '0',
  `facebook_client_id` varchar(140) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `facebook_secret_id` varchar(140) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `twitter_client_id` varchar(140) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `twitter_secret_id` varchar(140) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `google_client_id` varchar(140) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `google_secret_id` varchar(140) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `verification_required` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `t_settings_auth`
--

INSERT INTO `t_settings_auth` (`id`, `enable_facebook_login`, `enable_twitter_login`, `enable_google_login`, `facebook_client_id`, `facebook_secret_id`, `twitter_client_id`, `twitter_secret_id`, `google_client_id`, `google_secret_id`, `verification_required`) VALUES
(1, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `t_settings_checkout`
--

DROP TABLE IF EXISTS `t_settings_checkout`;
CREATE TABLE IF NOT EXISTS `t_settings_checkout` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `is_guest_checkout` tinyint(1) DEFAULT '1',
  `field_name` tinyint(1) NOT NULL DEFAULT '1',
  `field_phone` tinyint(1) NOT NULL DEFAULT '1',
  `field_state` tinyint(1) NOT NULL DEFAULT '1',
  `field_city` tinyint(1) NOT NULL DEFAULT '1',
  `field_address` tinyint(1) NOT NULL DEFAULT '1',
  `field_zipcode` tinyint(1) NOT NULL DEFAULT '1',
  `is_whatsapp_order` tinyint(1) NOT NULL DEFAULT '1',
  `whatsapp_btn_mobile` tinyint(1) NOT NULL DEFAULT '1',
  `whatsapp_btn_desktop` tinyint(1) NOT NULL DEFAULT '1',
  `whatsapp_number` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `t_settings_checkout`
--

INSERT INTO `t_settings_checkout` (`id`, `is_guest_checkout`, `field_name`, `field_phone`, `field_state`, `field_city`, `field_address`, `field_zipcode`, `is_whatsapp_order`, `whatsapp_btn_mobile`, `whatsapp_btn_desktop`, `whatsapp_number`) VALUES
(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `t_settings_currency`
--

DROP TABLE IF EXISTS `t_settings_currency`;
CREATE TABLE IF NOT EXISTS `t_settings_currency` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `locale` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'en-US',
  `code` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'USD',
  `symbol` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '$',
  `symbol_native` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '$',
  `name` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'US dollar',
  `name_plural` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'US dollars',
  `exchange_rate` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `t_settings_currency`
--

INSERT INTO `t_settings_currency` (`id`, `locale`, `code`, `symbol`, `symbol_native`, `name`, `name_plural`, `exchange_rate`) VALUES
(1, 'en-US', 'USD', 'US', '$', 'US dollar', 'US dollars', '1');

-- --------------------------------------------------------

--
-- Table structure for table `t_settings_footer`
--

DROP TABLE IF EXISTS `t_settings_footer`;
CREATE TABLE IF NOT EXISTS `t_settings_footer` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `copyrights` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `first_column` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `second_column` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `third_column` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `facebook_url` varchar(140) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `twitter_url` varchar(140) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `instagram_url` varchar(140) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `whatsapp_url` varchar(140) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `telegram_url` varchar(140) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `pinterest_url` varchar(140) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `vk_url` varchar(140) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `youtube_url` varchar(140) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `footer_image_id` int UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `t_settings_footer_footer_image_id_foreign` (`footer_image_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `t_settings_footer`
--

INSERT INTO `t_settings_footer` (`id`, `copyrights`, `first_column`, `second_column`, `third_column`, `facebook_url`, `twitter_url`, `instagram_url`, `whatsapp_url`, `telegram_url`, `pinterest_url`, `vk_url`, `youtube_url`, `footer_image_id`) VALUES
(1, 'LionStore copyrights', 'Company', 'Customer', 'Help', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `t_settings_general`
--

DROP TABLE IF EXISTS `t_settings_general`;
CREATE TABLE IF NOT EXISTS `t_settings_general` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `site_title` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `site_tagline` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `site_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `title_separator` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '|',
  `is_global` tinyint(1) DEFAULT '0',
  `default_country` int UNSIGNED DEFAULT NULL,
  `default_currency` int UNSIGNED DEFAULT NULL,
  `default_language` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'en',
  `desktop_logo_id` int UNSIGNED DEFAULT NULL,
  `mobile_logo_id` int UNSIGNED DEFAULT NULL,
  `favicon_id` int UNSIGNED DEFAULT NULL,
  `site_email` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `site_phone` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `site_address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `is_rtl` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `t_settings_general_default_country_foreign` (`default_country`),
  KEY `t_settings_general_default_currency_foreign` (`default_currency`),
  KEY `t_settings_general_desktop_logo_id_foreign` (`desktop_logo_id`),
  KEY `t_settings_general_mobile_logo_id_foreign` (`mobile_logo_id`),
  KEY `t_settings_general_favicon_id_foreign` (`favicon_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `t_settings_general`
--

INSERT INTO `t_settings_general` (`id`, `site_title`, `site_tagline`, `site_description`, `title_separator`, `is_global`, `default_country`, `default_currency`, `default_language`, `desktop_logo_id`, `mobile_logo_id`, `favicon_id`, `site_email`, `site_phone`, `site_address`, `is_rtl`) VALUES
(1, 'LIONSTORE', 'Online Shopping Platform', 'Site description here', '|', 0, 238, 1, 'en', NULL, NULL, NULL, NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `t_settings_languages`
--

DROP TABLE IF EXISTS `t_settings_languages`;
CREATE TABLE IF NOT EXISTS `t_settings_languages` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `is_english` tinyint(1) DEFAULT '1',
  `is_arabic` tinyint(1) DEFAULT '0',
  `is_french` tinyint(1) DEFAULT '0',
  `is_spanish` tinyint(1) DEFAULT '0',
  `is_russian` tinyint(1) DEFAULT '0',
  `is_chinese` tinyint(1) DEFAULT '0',
  `is_hindi` tinyint(1) DEFAULT '0',
  `is_portuguese` tinyint(1) DEFAULT '0',
  `is_japanese` tinyint(1) DEFAULT '0',
  `is_turkish` tinyint(1) DEFAULT '0',
  `is_ukrainian` tinyint(1) DEFAULT '0',
  `is_polish` tinyint(1) DEFAULT '0',
  `is_romanian` tinyint(1) DEFAULT '0',
  `is_dutch` tinyint(1) DEFAULT '0',
  `is_thai` tinyint(1) DEFAULT '0',
  `is_hungarian` tinyint(1) DEFAULT '0',
  `is_azerbaijani` tinyint(1) DEFAULT '0',
  `is_german` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `t_settings_languages`
--

INSERT INTO `t_settings_languages` (`id`, `is_english`, `is_arabic`, `is_french`, `is_spanish`, `is_russian`, `is_chinese`, `is_hindi`, `is_portuguese`, `is_japanese`, `is_turkish`, `is_ukrainian`, `is_polish`, `is_romanian`, `is_dutch`, `is_thai`, `is_hungarian`, `is_azerbaijani`, `is_german`) VALUES
(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `t_settings_payment`
--

DROP TABLE IF EXISTS `t_settings_payment`;
CREATE TABLE IF NOT EXISTS `t_settings_payment` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `is_paypal` tinyint(1) DEFAULT '0',
  `is_stripe` tinyint(1) DEFAULT '0',
  `is_offline` tinyint(1) DEFAULT '0',
  `is_cod` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `t_settings_payment`
--

INSERT INTO `t_settings_payment` (`id`, `is_paypal`, `is_stripe`, `is_offline`, `is_cod`) VALUES
(1, 1, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `t_settings_refunds`
--

DROP TABLE IF EXISTS `t_settings_refunds`;
CREATE TABLE IF NOT EXISTS `t_settings_refunds` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `is_enabled` tinyint(1) DEFAULT '1',
  `message_to_customer` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `t_settings_refunds`
--

INSERT INTO `t_settings_refunds` (`id`, `is_enabled`, `message_to_customer`) VALUES
(1, 1, 'Put your message to customer here');

-- --------------------------------------------------------

--
-- Table structure for table `t_settings_security`
--

DROP TABLE IF EXISTS `t_settings_security`;
CREATE TABLE IF NOT EXISTS `t_settings_security` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `is_recaptcha` tinyint(1) DEFAULT '0',
  `recaptcha_site_key` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `recaptcha_secret_key` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `t_settings_security`
--

INSERT INTO `t_settings_security` (`id`, `is_recaptcha`, `recaptcha_site_key`, `recaptcha_secret_key`) VALUES
(1, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `t_settings_seo`
--

DROP TABLE IF EXISTS `t_settings_seo`;
CREATE TABLE IF NOT EXISTS `t_settings_seo` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `is_sitemap` tinyint(1) DEFAULT '0',
  `facebook_app_id` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `facebook_page_id` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `twitter_username` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `default_ogimage_id` int UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `t_settings_seo_default_ogimage_id_foreign` (`default_ogimage_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `t_settings_seo`
--

INSERT INTO `t_settings_seo` (`id`, `is_sitemap`, `facebook_app_id`, `facebook_page_id`, `twitter_username`, `default_ogimage_id`) VALUES
(1, 1, 'FacebookAppId', 'FacebookPageID', 'TwitterUsername', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `t_settings_sms`
--

DROP TABLE IF EXISTS `t_settings_sms`;
CREATE TABLE IF NOT EXISTS `t_settings_sms` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `is_active` tinyint(1) DEFAULT '0',
  `default_gateway` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'twilio',
  `template_order_confirmed` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `template_order_delivered` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `template_order_shipped` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `template_order_refunded` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `template_order_canceled` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `t_settings_sms`
--

INSERT INTO `t_settings_sms` (`id`, `is_active`, `default_gateway`, `template_order_confirmed`, `template_order_delivered`, `template_order_shipped`, `template_order_refunded`, `template_order_canceled`) VALUES
(1, 0, 'twilio', 'Dear {fullname}, your order  {orderNumber} has been confirmed {amount}', 'Dear {fullname}, your order  {orderNumber} has been delivered {amount}', 'Dear {fullname}, your order  {orderNumber} has been shipped {amount}', 'Dear {fullname}, your order  {orderNumber} has been refunded {amount}', 'Dear {fullname}, your order  {orderNumber} has been canceled {amount}');

-- --------------------------------------------------------

--
-- Table structure for table `t_settings_smtp`
--

DROP TABLE IF EXISTS `t_settings_smtp`;
CREATE TABLE IF NOT EXISTS `t_settings_smtp` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `host` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `port` int DEFAULT NULL,
  `is_secure` tinyint(1) DEFAULT '0',
  `username` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `password` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `from_email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `from_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `t_settings_smtp`
--

INSERT INTO `t_settings_smtp` (`id`, `host`, `port`, `is_secure`, `username`, `password`, `from_email`, `from_name`) VALUES
(1, NULL, NULL, 0, NULL, NULL, 'contact@site.com', 'Site name');

-- --------------------------------------------------------

--
-- Table structure for table `t_sliders`
--

DROP TABLE IF EXISTS `t_sliders`;
CREATE TABLE IF NOT EXISTS `t_sliders` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `uid` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `desktop_slider_id` int UNSIGNED DEFAULT NULL,
  `mobile_slider_id` int UNSIGNED DEFAULT NULL,
  `link_type` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'inside',
  `link_value` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `t_sliders_uid_unique` (`uid`),
  KEY `t_sliders_desktop_slider_id_foreign` (`desktop_slider_id`),
  KEY `t_sliders_mobile_slider_id_foreign` (`mobile_slider_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `t_subcategories`
--

DROP TABLE IF EXISTS `t_subcategories`;
CREATE TABLE IF NOT EXISTS `t_subcategories` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `uid` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `parent_id` int UNSIGNED DEFAULT NULL,
  `handler` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `og_image_id` int UNSIGNED DEFAULT NULL,
  `icon_id` int UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `t_subcategories_uid_unique` (`uid`),
  UNIQUE KEY `t_subcategories_handler_unique` (`handler`),
  KEY `t_subcategories_parent_id_foreign` (`parent_id`),
  KEY `t_subcategories_og_image_id_foreign` (`og_image_id`),
  KEY `t_subcategories_icon_id_foreign` (`icon_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `t_subcategory_translation`
--

DROP TABLE IF EXISTS `t_subcategory_translation`;
CREATE TABLE IF NOT EXISTS `t_subcategory_translation` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `subcategory_id` int UNSIGNED DEFAULT NULL,
  `title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`id`),
  KEY `t_subcategory_translation_subcategory_id_foreign` (`subcategory_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `t_verifications`
--

DROP TABLE IF EXISTS `t_verifications`;
CREATE TABLE IF NOT EXISTS `t_verifications` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `customer_id` int UNSIGNED DEFAULT NULL,
  `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `t_verifications_token_unique` (`token`),
  KEY `t_verifications_customer_id_foreign` (`customer_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `t_wishlist`
--

DROP TABLE IF EXISTS `t_wishlist`;
CREATE TABLE IF NOT EXISTS `t_wishlist` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `customer_id` int UNSIGNED DEFAULT NULL,
  `product_id` int UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `t_wishlist_customer_id_foreign` (`customer_id`),
  KEY `t_wishlist_product_id_foreign` (`product_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
