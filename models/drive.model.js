const express = require('express')
const control = express()
const db = require('../db')
const bcrypt = require('bcrypt')

class driveModel {
  async newDrive(info) {
    try {
      console.log(info)
      const allow = await db.query(`select count(id_status_fk) as counter from drive where id_status_fk < 3 and id_passengers_fk = '${info.id}'`)

      if (allow[0].counter !== '0') throw new Error()

      const newDrive = await db.query(
        `insert into drive (startPoint, endPoint, cost, id_passengers_fk)
            values ('${info.startPoint}', '${info.endPoint}', '${info.cost}', '${info.id_passengers_fk}') returning driveId`
      )

      return newDrive[0]
    } catch (e) {
      throw new Error()
    }
  }
}

module.exports = new driveModel()
