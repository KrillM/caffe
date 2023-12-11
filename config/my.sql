drop database if exists caffe;
create database caffe;
use caffe;

CREATE TABLE crew (
  crewId INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  email VARCHAR(255) NOT NULL,
  nickname VARCHAR(50) NOT NULL,
  `password` VARCHAR(1000) NOT NULL,
  phoneNumber INT NOT NULL,
  profileImage LONGTEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);