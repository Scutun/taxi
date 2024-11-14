const express = require('express')
const control = express()
const model = require('../models/passenger.model')

class passengerController {
  async createPassenger(req, res) {
    try {
      const info = await model.newPassenger(req.body)
      res.json({ info: info })
    } catch (e) {
      res.sendStatus(400)
    }
  }

  async logPassenger(req, res) {
    try {
      const { email, password } = req.body
      const data = await db.query(`select * from passengers where passenger_email = '${email}'`)
      if (data.rows.length === 0) throw new Error('Empty')

      if (!bcrypt.compareSync(password, data.rows[0].password)) throw new Error('Password')

      res.json({ id: data.rows[0].id_passengers })
    } catch (e) {
      res.sendStatus(404)
    }
  }

  async getPassengerFromDrive(req, res) {
    try {
      const info = await model.getPassengerByDrive(req.params.id)

      res.json({ info: info })
    } catch (e) {
      res.sendStatus(404)
    }
  }

  async getPassenger(req, res) {
    try {
      const info = await model.getPassengerById(req.params.id)

      res.json({ info: info })
    } catch (e) {
      res.sendStatus(404)
    }
  }

  async updatePassenger(req, res) {
    try {
      const info = await model.passengerUpdate(req.body)

      res.json({ info: info })
    } catch (e) {
      res.sendStatus(400)
    }
  }

  async deletePassenger(req, res) {
    try {
      const deletion = await model.passengerDeletiot(req.params.id)

      res.json({ id: deletion })
    } catch (e) {
      res.sendStatus(404)
    }
  }
}

module.exports = new passengerController()
