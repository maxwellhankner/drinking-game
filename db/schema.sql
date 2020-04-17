-- USE apm5oe9jsj5tdj7x;
DROP DATABASE IF EXISTS materials_db;

CREATE DATABASE materials_db;

USE materials_db;

CREATE TABLE Prompts (
  id INT NOT NULL AUTO_INCREMENT,
  text VARCHAR(120) NOT NULL,
  answer VARCHAR(5),
  createdAt VARCHAR(30),
  updatedAt VARCHAR(30),
  PRIMARY KEY(id)
);


INSERT INTO Prompts (text, answer)
VALUES
('why is the sky red?', 'open'),
('write something here', 'open'),
('Super Mario Bros. was released in 1990', 'false'),
('You are allowed to sell your soul on eBay', 'false')
