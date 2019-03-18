/*
 Navicat Premium Data Transfer

 Source Server         : MySQL8.0
 Source Server Type    : MySQL
 Source Server Version : 80014
 Source Host           : localhost:3306
 Source Schema         : yiba

 Target Server Type    : MySQL
 Target Server Version : 80014
 File Encoding         : 65001

 Date: 09/03/2019 18:40:44
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for archivedbook
-- ----------------------------
DROP TABLE IF EXISTS `archivedbook`;
CREATE TABLE `archivedbook`  (
  `bookId` int(10) NOT NULL,
  `bookName` varchar(64) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `author` varchar(64) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `publishingHouse` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `version` int(2) NULL DEFAULT NULL,
  `ISBN` int(13) NOT NULL,
  `price` decimal(10, 2) NOT NULL,
  `publishingDate` datetime(0) NULL DEFAULT NULL,
  `classification` varchar(5) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `format` varchar(5) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `paper` varchar(5) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `covor` varchar(64) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `pictureSource` varchar(64) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `descriptionSource` varchar(64) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  PRIMARY KEY (`bookId`) USING BTREE,
  INDEX `bookName`(`bookName`) USING BTREE,
  INDEX `author`(`author`) USING BTREE,
  INDEX `publishingHouse`(`publishingHouse`) USING BTREE,
  INDEX `price`(`price`) USING BTREE,
  INDEX `classification`(`classification`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for collection
-- ----------------------------
DROP TABLE IF EXISTS `collection`;
CREATE TABLE `collection`  (
  `collectionId` int(16) NOT NULL,
  `userId` int(9) NOT NULL,
  `bookId` int(10) NOT NULL,
  PRIMARY KEY (`collectionId`) USING BTREE,
  INDEX `collection_ibfk_1`(`bookId`) USING BTREE,
  INDEX `collection_ibfk_2`(`userId`) USING BTREE,
  CONSTRAINT `collection_ibfk_1` FOREIGN KEY (`bookId`) REFERENCES `secondhandbook` (`bookId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `collection_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for friendship
-- ----------------------------
DROP TABLE IF EXISTS `friendship`;
CREATE TABLE `friendship`  (
  `friendshipId` int(16) NOT NULL,
  `userId` int(9) NOT NULL,
  `friendId` int(9) NOT NULL,
  PRIMARY KEY (`friendshipId`) USING BTREE,
  INDEX `userId`(`userId`) USING BTREE,
  INDEX `friendId`(`friendId`) USING BTREE,
  CONSTRAINT `friendship_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `friendship_ibfk_2` FOREIGN KEY (`friendId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for lostproperty
-- ----------------------------
DROP TABLE IF EXISTS `lostproperty`;
CREATE TABLE `lostproperty`  (
  `lostPropertyId` int(10) NOT NULL,
  `userId` int(9) NOT NULL,
  `lostTimeStarted` datetime(0) NOT NULL,
  `lostTimeEnded` datetime(0) NOT NULL,
  `lostRange` varchar(64) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `keyword` binary(255) NOT NULL,
  `releaseTime` datetime(0) NOT NULL,
  PRIMARY KEY (`lostPropertyId`) USING BTREE,
  INDEX `userId`(`userId`) USING BTREE,
  INDEX `lostTimeStarted`(`lostTimeStarted`) USING BTREE,
  INDEX `lostTimeEnded`(`lostTimeEnded`) USING BTREE,
  INDEX `lostRange`(`lostRange`) USING BTREE,
  INDEX `keyword`(`keyword`) USING BTREE,
  INDEX `releaseTime`(`releaseTime`) USING BTREE,
  CONSTRAINT `lostproperty_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for pickedproperty
-- ----------------------------
DROP TABLE IF EXISTS `pickedproperty`;
CREATE TABLE `pickedproperty`  (
  `pickedPropertyId` int(10) NOT NULL,
  `userId` int(9) NOT NULL,
  `pickedTimeStarted` datetime(0) NOT NULL,
  `pickedTimeEnded` datetime(0) NOT NULL,
  `pickedRange` varchar(64) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `keyword` binary(255) NOT NULL,
  `releaseTime` datetime(0) NOT NULL,
  PRIMARY KEY (`pickedPropertyId`) USING BTREE,
  INDEX `userId`(`userId`) USING BTREE,
  INDEX `pickedTimeStarted`(`pickedTimeStarted`) USING BTREE,
  INDEX `pickedTimeEnded`(`pickedTimeEnded`) USING BTREE,
  INDEX `pickedRange`(`pickedRange`) USING BTREE,
  INDEX `keyword`(`keyword`) USING BTREE,
  INDEX `releaseTime`(`releaseTime`) USING BTREE,
  CONSTRAINT `pickedproperty_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for salebook
-- ----------------------------
DROP TABLE IF EXISTS `salebook`;
CREATE TABLE `salebook`  (
  `saleBookId` int(16) NOT NULL,
  `userId` int(9) NOT NULL,
  `bookId` int(10) NOT NULL,
  PRIMARY KEY (`saleBookId`) USING BTREE,
  INDEX `userId`(`userId`) USING BTREE,
  INDEX `bookId`(`bookId`) USING BTREE,
  CONSTRAINT `salebook_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `salebook_ibfk_2` FOREIGN KEY (`bookId`) REFERENCES `secondhandbook` (`bookId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for secondhandbook
-- ----------------------------
DROP TABLE IF EXISTS `secondhandbook`;
CREATE TABLE `secondhandbook`  (
  `bookId` int(10) NOT NULL,
  `bookName` varchar(64) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `author` varchar(64) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `publishingHouse` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `version` int(2) NULL DEFAULT NULL,
  `ISBN` int(13) NOT NULL,
  `price` decimal(10, 2) NOT NULL,
  `publishingDate` datetime(0) NULL DEFAULT NULL,
  `classification` varchar(5) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `format` varchar(5) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `paper` varchar(5) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `covor` varchar(64) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `pictureSource` varchar(64) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `descriptionSource` varchar(64) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  PRIMARY KEY (`bookId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for shoppingtrolley
-- ----------------------------
DROP TABLE IF EXISTS `shoppingtrolley`;
CREATE TABLE `shoppingtrolley`  (
  `shoppingTrolleyId` int(16) NOT NULL,
  `userId` int(9) NOT NULL,
  `bookId` int(10) NOT NULL,
  PRIMARY KEY (`shoppingTrolleyId`) USING BTREE,
  INDEX `userId`(`userId`) USING BTREE,
  INDEX `bookId`(`bookId`) USING BTREE,
  CONSTRAINT `shoppingtrolley_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `shoppingtrolley_ibfk_2` FOREIGN KEY (`bookId`) REFERENCES `secondhandbook` (`bookId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for transactedhistory
-- ----------------------------
DROP TABLE IF EXISTS `transactedhistory`;
CREATE TABLE `transactedhistory`  (
  `transactedHistoryId` int(16) NOT NULL,
  `userId` int(9) NOT NULL,
  `bookId` int(10) NOT NULL,
  PRIMARY KEY (`transactedHistoryId`) USING BTREE,
  INDEX `userId`(`userId`) USING BTREE,
  INDEX `bookId`(`bookId`) USING BTREE,
  CONSTRAINT `transactedhistory_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `transactedhistory_ibfk_2` FOREIGN KEY (`bookId`) REFERENCES `secondhandbook` (`bookId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `userId` int(9) NOT NULL,
  `password` varchar(16) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `nickname` varchar(8) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `phoneNumber` int(11) NULL DEFAULT NULL,
  `QQ` varchar(10) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `WeChat` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `age` int(2) NULL DEFAULT NULL,
  `sex` char(1) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `address` varchar(32) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `creditLevel` int(1) NOT NULL,
  `personalDescription` varchar(64) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `portraitPicture` varchar(64) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  PRIMARY KEY (`userId`) USING BTREE,
  UNIQUE INDEX `nickname`(`nickname`) USING BTREE,
  UNIQUE INDEX `userId`(`userId`) USING BTREE,
  UNIQUE INDEX `phoneNumber`(`phoneNumber`) USING BTREE,
  UNIQUE INDEX `QQ`(`QQ`) USING BTREE,
  UNIQUE INDEX `WeChat`(`WeChat`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1234567891 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for vistedhistory
-- ----------------------------
DROP TABLE IF EXISTS `vistedhistory`;
CREATE TABLE `vistedhistory`  (
  `visitedHistoryId` int(16) NOT NULL,
  `userId` int(9) NOT NULL,
  `bookId` int(10) NOT NULL,
  PRIMARY KEY (`visitedHistoryId`) USING BTREE,
  INDEX `userId`(`userId`) USING BTREE,
  INDEX `bookId`(`bookId`) USING BTREE,
  CONSTRAINT `vistedhistory_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `vistedhistory_ibfk_2` FOREIGN KEY (`bookId`) REFERENCES `secondhandbook` (`bookId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
