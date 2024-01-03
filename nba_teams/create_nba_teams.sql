CREATE DATABASE IF NOT EXISTS `nba_teams`;
USE `nba_teams`;

DROP TABLE `teams`;

CREATE TABLE `teams` IF NOT EXISTS (
  `team_id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `full_name` varchar(50) NOT NULL,
  `city` varchar(255) NOT NULL,
  `acronym` varchar(3) NOT NULL,
  `conference` varchar(50) NOT NULL,
  `division` varchar(50) NOT NULL, 
  PRIMARY KEY (`team_id`)
);
INSERT INTO `teams` VALUES (1, 'Lakers', 'Los Angeles Lakers', 'Los Angeles', 'LAL', 'Western', 'Pacific');