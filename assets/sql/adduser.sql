CREATE DATABASE musculator;
USE musculator;
CREATE USER 'musculator'@'localhost' IDENTIFIED BY 'musculator';
GRANT ALL PRIVILEGES ON musculator.* TO 'musculator'@'localhost';
FLUSH PRIVILEGES;