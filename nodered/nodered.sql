-- --------------------------------------------------------
-- Host:                         xxxxxxxxxxxxxx
-- Server version:               10.11.6-MariaDB-0+deb12u1 - Debian 12
-- Server OS:                    debian-linux-gnu
-- HeidiSQL Version:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb3 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for nodered
CREATE DATABASE IF NOT EXISTS `nodered` /*!40100 DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci */;
USE `nodered`;

-- Dumping structure for table nodered.data
CREATE TABLE IF NOT EXISTS `data` (
  `idtopics` int(10) unsigned DEFAULT NULL,
  `horodatage` timestamp(3) NULL DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3),
  `value` double DEFAULT NULL,
  KEY `Khorodatage` (`idtopics`,`horodatage`) USING BTREE,
  CONSTRAINT `FK_data_topics` FOREIGN KEY (`idtopics`) REFERENCES `topics` (`IdTopics`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table nodered.topics
CREATE TABLE IF NOT EXISTS `topics` (
  `IdTopics` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Path` varchar(255) DEFAULT NULL,
  UNIQUE KEY `keyPath` (`Path`) USING BTREE,
  KEY `FK_topics_data` (`IdTopics`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- Data exporting was unselected.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
