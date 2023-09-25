-- MySQL dump 10.13  Distrib 8.0.34, for Linux (x86_64)
--
-- Host: localhost    Database: trajects
-- ------------------------------------------------------
-- Server version	8.0.34-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `selectable_stations`
--

DROP TABLE IF EXISTS `selectable_stations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `selectable_stations` (
  `station_id` int NOT NULL DEFAULT '0',
  `station_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `selectable_stations`
--

LOCK TABLES `selectable_stations` WRITE;
/*!40000 ALTER TABLE `selectable_stations` DISABLE KEYS */;
INSERT INTO `selectable_stations` VALUES (1,'Amersfoort'),(2,'Den Bosch'),(3,'Haarlem');
/*!40000 ALTER TABLE `selectable_stations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stations`
--

DROP TABLE IF EXISTS `stations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stations` (
  `station_id` int NOT NULL AUTO_INCREMENT,
  `station_name` varchar(255) NOT NULL,
  PRIMARY KEY (`station_id`),
  KEY `idx_station_name` (`station_name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stations`
--

LOCK TABLES `stations` WRITE;
/*!40000 ALTER TABLE `stations` DISABLE KEYS */;
INSERT INTO `stations` VALUES (1,'Amersfoort'),(4,'Amsterdam'),(2,'Den Bosch'),(3,'Haarlem'),(5,'Utrecht');
/*!40000 ALTER TABLE `stations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `train_tracks`
--

DROP TABLE IF EXISTS `train_tracks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `train_tracks` (
  `track_id` int NOT NULL AUTO_INCREMENT,
  `start_station_name` varchar(255) DEFAULT NULL,
  `end_station_name` varchar(255) DEFAULT NULL,
  `timeOfDeparture` datetime DEFAULT NULL,
  `timeOfArrival` datetime DEFAULT NULL,
  `departurePlatform` varchar(4) DEFAULT NULL,
  `arrivalPlatform` varchar(4) DEFAULT NULL,
  PRIMARY KEY (`track_id`),
  KEY `start_station_name` (`start_station_name`),
  KEY `end_station_name` (`end_station_name`),
  CONSTRAINT `train_tracks_ibfk_1` FOREIGN KEY (`start_station_name`) REFERENCES `stations` (`station_name`),
  CONSTRAINT `train_tracks_ibfk_2` FOREIGN KEY (`end_station_name`) REFERENCES `stations` (`station_name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `train_tracks`
--

LOCK TABLES `train_tracks` WRITE;
/*!40000 ALTER TABLE `train_tracks` DISABLE KEYS */;
INSERT INTO `train_tracks` VALUES (2,'Amersfoort','Utrecht','2023-09-20 12:10:00','2023-09-20 12:23:00','6','8'),(3,'Utrecht','Den Bosch','2023-09-20 12:33:00','2023-09-20 13:01:00','15','6'),(4,'Amersfoort','Utrecht','2023-09-20 13:10:00','2023-09-20 13:23:00','6','8'),(5,'Utrecht','Den Bosch','2023-09-20 13:33:00','2023-09-20 14:01:00','18','6'),(6,'Haarlem','Amsterdam','2023-09-22 12:02:00','2023-09-22 12:20:00','3','1'),(7,'Amsterdam','Utrecht','2023-09-22 12:24:00','2023-09-22 12:51:00','4','19'),(8,'Utrecht','Den Bosch','2023-09-22 12:54:00','2023-09-22 13:22:00','18','6');
/*!40000 ALTER TABLE `train_tracks` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-25 13:53:33
