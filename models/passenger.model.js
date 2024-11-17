require('dotenv').config()
const express = require('express')
const control = express()
const db = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class modelPassenger {
  async newPassenger(info) {
    try {
      const hash = bcrypt.hashSync(info.password, bcrypt.genSaltSync(10))

      await db.query(
        `INSERT INTO passengers (passengerFirstname, passengerEmail, passengerPassword) 
           VALUES (?, ?, ?)`,
        [info.firstName, info.email, hash]
      )

      const [result] = await db.query(`SELECT passengerSurname as surname, passengerFirstname as firstName, 
        passengerSecondname as secondName, bonusCount as bonus, passengerEmail as email from passengers WHERE passengerId = LAST_INSERT_ID()`)

      return result[0]
    } catch (e) {
      throw new Error()
    }
  }

  async logInPassenger(info) {
    try {
      const [datas] = await db.query(
        `select passengerId as id, passengerEmail as email, passengerPassword as password 
        from passengers where passengerEmail = ?`,
        [info.email]
      )
      if (datas[0].length === 0) {
        throw new Error()
      }
      if (!bcrypt.compareSync(info.password, datas[0].password)) {
        throw new Error()
      }
      const token = jwt.sign({ id: datas[0].id }, process.env.ACCESS_TOKEN_SECRET)
      return token
    } catch (e) {
      throw new Error()
    }
  }
  async getPassengerById(token) {
    try {
      const authHeaders = token && token.split(' ')[1];

      const decodedToken = jwt.verify(authHeaders, process.env.ACCESS_TOKEN_SECRET);
      const id = decodedToken.id;
      

      const [passenger] = await db.query(
        `select passengerSurname as surname, passengerFirstname as firstName, passengerSecondname as secondName, bonusCount as bonus
            from passengers where passengerId = ?`,
        [id]
      )

      if (passenger[0].length === 0) throw new Error()

      return passenger[0]
    } catch (e) {
      throw new Error()
    }
  }
  async getPassengerByDrive(id) {
    try {
      const [info] = await db.query(`select id_passengers_fk from drive where driveId = ?`, [id])
      const [passenger] = await db.query(
        `select passengerSurname as surname, passengerFirstname as firstName, passengerSecondname as secondName, bonusCount as bonus
              from passengers where passengerId = ?`,
        [info[0].id_passengers_fk]
      )

      return passenger[0]
    } catch (e) {
      throw new Error()
    }
  }

  async passengerUpdate(token, info) {
    try {

      const authHeaders = token && token.split(' ')[1];

      const decodedToken = jwt.verify(authHeaders, process.env.ACCESS_TOKEN_SECRET);
      const id = decodedToken.id;

      const [oldInfo] = await db.query(`select * from passengers where passengerId = ?`, [id])

      if (oldInfo[0].length === 0) throw new Error()

      await db.query(
        `update passengers set passengerSurname = ?, passengerFirstname = ?, 
            passengerSecondname = ? where passengerId = ?`,
        [info.surname, info.firstName, info.secondName, id]
      )

      const [newInfo] = await db.query(
        `select passengerSurname as surname, passengerFirstname as firstName, 
        passengerSecondname as secondName from passengers where passengerId = ?`,
        [id]
      )

      return newInfo[0]
    } catch (e) {
      throw new Error()
    }
  }

  async passengerDeletiot(token) {
    try {

      const authHeaders = token && token.split(' ')[1];

      const decodedToken = jwt.verify(authHeaders, process.env.ACCESS_TOKEN_SECRET);
      const id = decodedToken.id;

      const [info] = await db.query(`select * from passengers where passengerId = ?`, [id])

      if (info[0].length === 0) throw new Error()

      const drive = await db.query(
        `UPDATE drive SET id_passengers_fk = null 
            WHERE id_passengers_fk = ?`,
        [id]
      )

      const passenger = await db.query(
        `delete from passengers 
            where passengerId = ?`,
        [id]
      )

      return id
    } catch (e) {
      throw new Error()
    }
  }
}
module.exports = new modelPassenger()
