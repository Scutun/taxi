const express = require('express')
const control = express()
const db = require('../db')
const bcrypt = require('bcrypt')

class modelPassenger {
  async newPassenger(info) {
    try {
      const hash = bcrypt.hashSync(info.password, bcrypt.genSaltSync(10))

      // Insert the new passenger
      await db.query(
        `INSERT INTO passengers (passengerFirstname, passengerEmail, passengerPassword) 
           VALUES (?, ?, ?)`,
        [info.firstName, info.email, hash]
      )

      // Get the last inserted ID
      const [result] = await db.query(`SELECT * from passengers WHERE passengerId = LAST_INSERT_ID()`)

      return result[0]
    } catch (e) {
      console.log(e)
      throw new Error()
    }
  }
}
module.exports = new modelPassenger()
