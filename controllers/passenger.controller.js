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
      const allow = await model.logInPassenger(req.body)
      res.json({ allow: allow })
    } catch (e) {
      res.sendStatus(403)
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

      const info = await model.getPassengerById(req.headers.authorization)

      res.json({ info: info })
    } catch (e) {
      res.sendStatus(404)
    }
  }

  async updatePassenger(req, res) {
    try {
      const info = await model.passengerUpdate(req.headers.authorization, req.body)

      res.json({ info: info })
    } catch (e) {
      res.sendStatus(400)
    }
  }

  async deletePassenger(req, res) {
    try {
      const deletion = await model.passengerDeletiot(req.headers.authorization)

      res.json({ id: deletion })
    } catch (e) {
      res.sendStatus(404)
    }
  }
}

module.exports = new passengerController()
