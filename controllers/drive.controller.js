const express = require('express')
const control = express()
const db = require('../db')
const model = require('../models/drive.model')

class driveController {
  async createDrive(req, res) {
    try {
      const newDrive = await model.newDrive(req.body)
      res.json({ newDrive: newDrive })
    } catch (e) {
      res.sendStatus(400)
    }
  }

  async getOneDrive(req, res) {
    try {
      const id = req.params.id

      const drive = await db.query(
        `select id_drive, start_point, end_point, cost, driver.driver_surname, driver.driver_firstname from drive
            join driver on drive.id_driver_fk = driver.id_driver
            where drive.id_passengers_fk = $1 and drive.id_status_fk < 3`,
        [id]
      )

      if (drive.rows[0].length === 0) throw new Error()

      res.json(drive.rows[0])
    } catch (e) {
      res.sendStatus(404)
    }
  }

  async getDrive(req, res) {
    try {
      const id = req.params.id

      const drive = await db.query(
        `select drive.id_drive, drive.start_point, drive.end_point, drive.cost, 
            driver.driver_surname, driver.driver_firstname, status.status_name from drive
            join driver on drive.id_driver_fk = driver.id_driver
            join status on drive.id_status_fk = status.id_status
            where drive.id_passengers_fk = $1 and drive.id_status_fk > 2`,
        [id]
      )

      if (drive.rows[0].length === 0) throw new Error()

      res.json(drive.rows)
    } catch (e) {
      res.sendStatus(404)
    }
  }

  async updateStatusStart(req, res) {
    try {
      const { idDriver, idDrive } = req.body

      const allow = await db.query(`select id_status_fk from drive where id_drive = $1`, [idDrive])

      if (allow.rows[0].id_status_fk !== '1') throw new Error()

      const status = await db.query(`update drive set id_status_fk = 2, id_driver_fk = $1 where id_drive = $2`, [idDriver, idDrive])
      res.json(idDrive)
    } catch (e) {
      res.sendStatus(400)
    }
  }

  async updateStatusFinish(req, res) {
    const id = Number(req.body.id)
    const status = await db.query(`update drive set id_status_fk = 3 where id_drive = $1`, [id])
    res.json(req.body.id)
  }

  async updateDrive(req, res) {
    try {
      const { start, end, cost, id } = req.body

      const info = await db.query(`select * from drive where id_drive = '${id}'`)

      if (info.rows.length === 0) throw new Error()

      const drive = await db.query(`update drive set start_point = $1, end_point = $2, cost = $3 where id_drive = $4 returning *`, [start, end, cost, id])

      res.json(drive.rows[0])
    } catch (e) {
      res.sendStatus(400)
    }
  }

  async deleteDriver(req, res) {
    try {
      const id = req.params.id
      const info = await db.query(`select * from drive where id_drive = '${id}'`)
      if (info.rows.length === 0) throw new Error()

      const drive = await db.query(`update drive set id_status_fk = 4 where id_drive = '${id}'`)

      res.json(200)
    } catch (e) {
      res.sendStatus(404)
    }
  }
}

module.exports = new driveController()
