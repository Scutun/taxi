const express = require("express")
const control = express()
const db = require("../db")
const model = require("../models/drive.model")

class driveController {
	async createDrive(req, res) {
		try {
			const newDrive = await model.newDrive(req.headers.authorization, req.body)
			res.json(newDrive)
		} catch (e) {
			res.sendStatus(400)
		}
	}

	async getOneDrive(req, res) {
		try {
			const drive = await model.getCurrentDrive(req.headers.authorization)

			res.json(drive)
		} catch (e) {
			res.sendStatus(404)
		}
	}

	async getDrive(req, res) {
		try {
			const drives = await model.getAllDrives(req.headers.authorization)

			res.json(drives)
		} catch (e) {
			res.sendStatus(404)
		}
	}

	async updateStatusStart(req, res) {
		try {
			const drive = await model.updateStatusStarted(req.body)

			res.json(drive)
		} catch (e) {
			res.sendStatus(400)
		}
	}

	async updateStatusFinish(req, res) {
		try {
			const drive = await model.updateStatusFinished(req.body)

			res.json(drive)
		} catch (e) {
			res.sendStatus(400)
		}
	}

	async updateStatusCancel(req, res) {
		try {
			const drive = await model.updateStatusCanceled(req.body)

			res.json(drive)
		} catch (e) {
			res.sendStatus(400)
		}
	}

	async updateDrive(req, res) {
		try {
			const drive = await model.updatedDrive(req.body)

			res.json(drive)
		} catch (e) {
			res.sendStatus(400)
		}
	}
}

module.exports = new driveController()
