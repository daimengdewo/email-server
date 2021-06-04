/*
 Navicat Premium Data Transfer

 Source Server         : test
 Source Server Type    : MySQL
 Source Server Version : 80012
 Source Host           : 127.0.0.1:3306
 Source Schema         : test

 Target Server Type    : MySQL
 Target Server Version : 80012
 File Encoding         : 65001

 Date: 04/06/2021 18:09:16
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for uservalidation
-- ----------------------------
DROP TABLE IF EXISTS `uservalidation`;
CREATE TABLE `uservalidation`  (
  `validationID` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户名',
  `userEmail` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '邮箱地址',
  `mPhone` char(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '手机号码，11位，可以为空！',
  `validCode` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '验证码，不超过10位',
  `msg` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '验证信息内容',
  `validUrl` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '验证网址，用于点击去验证',
  `expiredTime` int(20) NOT NULL COMMENT '过期时间，在生成验证码的时候就加入',
  `state` int(5) NULL DEFAULT NULL COMMENT '发送成功=1，发送失败=2，未发送=0',
  `validType` int(5) NULL DEFAULT NULL COMMENT '测试=0，注册=1，登录=2，找回密码=3',
  `validMode` int(5) NULL DEFAULT NULL COMMENT '手机短信=2，email=1',
  PRIMARY KEY (`validationID`) USING BTREE,
  UNIQUE INDEX `userEmail`(`userEmail`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '用户验证码，可用于验证登录，找回密码，支付等等操作' ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
