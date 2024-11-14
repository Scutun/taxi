const express = require('express')
const control = express()
const db = require('../db')

class driveModel {
  async newDrive(info) {
    try {
      const [allow] = await db.query(`select count(id_status_fk) as counter from drive where id_status_fk < 3 and id_passengers_fk = ?`, [info.id])

      console.log(typeof allow[0].counter)
      if (allow[0].counter !== 0) throw new Error()

      await db.query(
        `insert into drive (startPoint, endPoint, cost, id_passengers_fk)
            values (?, ?, ?, ?)`,
        [info.start, info.end, info.cost, info.id]
      )

      const [newDrive] = await db.query(`select LAST_INSERT_ID() as id from drive`)

      return newDrive[0]
    } catch (e) {
      throw new Error()
    }
  }
}

module.exports = new driveModel()
