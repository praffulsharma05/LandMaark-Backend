-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: property_db
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bhk_options`
--

DROP TABLE IF EXISTS `bhk_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bhk_options` (
  `bhk` int NOT NULL,
  PRIMARY KEY (`bhk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bhk_options`
--

LOCK TABLES `bhk_options` WRITE;
/*!40000 ALTER TABLE `bhk_options` DISABLE KEYS */;
INSERT INTO `bhk_options` VALUES (1),(2),(3),(4),(5),(6);
/*!40000 ALTER TABLE `bhk_options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `construction_statuses`
--

DROP TABLE IF EXISTS `construction_statuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `construction_statuses` (
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `construction_statuses`
--

LOCK TABLES `construction_statuses` WRITE;
/*!40000 ALTER TABLE `construction_statuses` DISABLE KEYS */;
INSERT INTO `construction_statuses` VALUES ('Ready to Move'),('Under Construction');
/*!40000 ALTER TABLE `construction_statuses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `construction_types`
--

DROP TABLE IF EXISTS `construction_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `construction_types` (
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `construction_types`
--

LOCK TABLES `construction_types` WRITE;
/*!40000 ALTER TABLE `construction_types` DISABLE KEYS */;
INSERT INTO `construction_types` VALUES ('New'),('Resale');
/*!40000 ALTER TABLE `construction_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `owners`
--

DROP TABLE IF EXISTS `owners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `owners` (
  `owner_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`owner_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `owners`
--

LOCK TABLES `owners` WRITE;
/*!40000 ALTER TABLE `owners` DISABLE KEYS */;
INSERT INTO `owners` VALUES (1,'Default Owner','owner@example.com','123-456-7890');
/*!40000 ALTER TABLE `owners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `properties`
--

DROP TABLE IF EXISTS `properties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `properties` (
  `property_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `latitude` decimal(10,7) DEFAULT NULL,
  `longitude` decimal(10,7) DEFAULT NULL,
  `bhk` int DEFAULT NULL,
  `property_type` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `construction_type` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `construction_status` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` decimal(15,2) DEFAULT NULL,
  `area_sqft` int DEFAULT NULL,
  `verified` tinyint(1) DEFAULT '0',
  `owner_id` int DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`property_id`),
  KEY `fk_properties_bhk` (`bhk`),
  KEY `fk_properties_property_type` (`property_type`),
  KEY `fk_properties_construction_type` (`construction_type`),
  KEY `fk_properties_construction_status` (`construction_status`),
  KEY `fk_properties_owner` (`owner_id`),
  CONSTRAINT `fk_properties_bhk` FOREIGN KEY (`bhk`) REFERENCES `bhk_options` (`bhk`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_properties_construction_status` FOREIGN KEY (`construction_status`) REFERENCES `construction_statuses` (`name`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_properties_construction_type` FOREIGN KEY (`construction_type`) REFERENCES `construction_types` (`name`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_properties_owner` FOREIGN KEY (`owner_id`) REFERENCES `owners` (`owner_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_properties_property_type` FOREIGN KEY (`property_type`) REFERENCES `property_types` (`name`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `properties`
--

LOCK TABLES `properties` WRITE;
/*!40000 ALTER TABLE `properties` DISABLE KEYS */;
INSERT INTO `properties` VALUES (1,'Luxury 3BHK Apartment','Beautiful apartment with city view','Jaipur',26.9124000,75.7873000,3,'Apartment','New','Ready to Move',7500000.00,1450,1,1,NULL),(2,'Luxury 3BHK Apartment','Beautiful apartment with city view','Jaipur',26.9124000,75.7873000,3,'Apartment','New','Ready to Move',7500000.00,1450,1,1,NULL),(3,'vgvhhg','gvhvghgvh','vbhjvghvhg',23.0000000,67.0000000,1,'Apartment','New','Ready to Move',7677.00,6666,1,1,'1773398143833-Screenshot 2026-03-11 162921.png'),(4,'febfb','gfpr','kota',25.0000000,75.0000000,3,'Apartment','New','Ready to Move',10000000.00,3234,1,1,'1773408958447-Screenshot 2025-11-19 001757.png'),(5,'Mangail','fetaching','kota',12.0000000,20.0000000,1,'Villa','Resale','Under Construction',10000000.00,122,1,1,'1773409352542-Screenshot 2026-03-11 193536.png');
/*!40000 ALTER TABLE `properties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `property_types`
--

DROP TABLE IF EXISTS `property_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `property_types` (
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property_types`
--

LOCK TABLES `property_types` WRITE;
/*!40000 ALTER TABLE `property_types` DISABLE KEYS */;
INSERT INTO `property_types` VALUES ('Apartment'),('Villa');
/*!40000 ALTER TABLE `property_types` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-16 15:34:29
