CREATE DATABASE if not exists taxi;

USE taxi;

CREATE TABLE if not exists driver (
    driverId BIGINT PRIMARY KEY AUTO_INCREMENT,
    driverRating NUMERIC (2, 1) not null default 5.0,
    driverExperience BIGINT not null,
    driverSurname VARCHAR(200) not null,
    driverPassword VARCHAR(100) not null,
    driverFirstname VARCHAR(100) not null,
    driverSecondname VARCHAR(100),
    driverEmail VARCHAR(100),
    UNIQUE (driverEmail)
);

-- Дефолт значения для водителя
INSERT INTO driver (driverSurname, driverPassword, driverFirstname, driverEmail, driverExperience)
SELECT 'No information', '------', 'No information', '-----', 0
WHERE NOT EXISTS (
    SELECT 1 FROM driver WHERE driverSurname = 'No information'
);

CREATE TABLE if not exists passengers (
    passengerId BIGINT PRIMARY KEY AUTO_INCREMENT,
    passengerSurname VARCHAR(100),
    passengerPassword VARCHAR(100) not null,
    passengerFirstname VARCHAR(100) not null,
    passengerSecondname VARCHAR(100),
    bonusCount BIGINT default 0,
    passengerEmail VARCHAR(100),
    UNIQUE (passengerEmail)
);

CREATE TABLE if not exists status (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100)
);

INSERT INTO status (name)
SELECT * FROM (SELECT 'Search for a driver') AS tmp
WHERE NOT EXISTS (SELECT name FROM status WHERE name = 'Search for a driver')
LIMIT 1;

INSERT INTO status (name)
SELECT * FROM (SELECT 'Driver not found') AS tmp
WHERE NOT EXISTS (SELECT name FROM status WHERE name = 'Driver not found')
LIMIT 1;

INSERT INTO status (name)
SELECT * FROM (SELECT 'Drive completed') AS tmp
WHERE NOT EXISTS (SELECT name FROM status WHERE name = 'Drive completed')
LIMIT 1;

INSERT INTO status (name)
SELECT * FROM (SELECT 'Drive is canselled') AS tmp
WHERE NOT EXISTS (SELECT name FROM status WHERE name = 'Drive is canselled')
LIMIT 1;

CREATE TABLE if not exists drive (
    driveId BIGINT PRIMARY KEY AUTO_INCREMENT,
    cost BIGINT,
    id_driver_fk BIGINT default 1,
    id_passengers_fk BIGINT,
    startPoint VARCHAR(100) not null,
    endPoint VARCHAR(100) not null,
    id_status_fk BIGINT default 1,
    FOREIGN KEY (id_driver_fk) REFERENCES driver(driverId),
    FOREIGN KEY (id_passengers_fk) REFERENCES passengers(passengerId),
    FOREIGN KEY (id_status_fk) REFERENCES status(id)
);




