CREATE DATABASE if not exists taxi;

USE taxi;

CREATE TABLE if not exists driver (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    driverRating BIGINT,
    driverExperience BIGINT,
    driverSurname VARCHAR(200),
    password VARCHAR(100),
    driverFirstname VARCHAR(100),
    driverSecondname VARCHAR(100),
    driverEmail VARCHAR(100)
);

CREATE TABLE if not exists passengers (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    passengerSurname VARCHAR(100),
    password VARCHAR(100),
    passengerFirstname VARCHAR(100),
    passengerSecondname VARCHAR(100),
    bonusCount BIGINT,
    passengerEmail VARCHAR(100)
);

CREATE TABLE if not exists status (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100)
);

CREATE TABLE if not exists drive (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    cost BIGINT,
    id_driver_fk BIGINT,
    id_passengers_fk BIGINT,
    startPoint VARCHAR(100),
    endPoint VARCHAR(100),
    id_status_fk BIGINT,
    FOREIGN KEY (id_driver_fk) REFERENCES driver(id),
    FOREIGN KEY (id_passengers_fk) REFERENCES passengers(id),
    FOREIGN KEY (id_status_fk) REFERENCES status(id)
);
