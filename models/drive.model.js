require("dotenv").config()
const express = require("express")
const control = express()
const db = require("../db")
const jwt = require("jsonwebtoken")

class driveModel {
	async newDrive(token, info) {
		try {
			const authHeaders = token && token.split(" ")[1]

			const decodedToken = jwt.verify(authHeaders, process.env.ACCESS_TOKEN_SECRET)
			const id = decodedToken.id

			const [allow] = await db.query(`select count(id_status_fk) as counter from drive where id_status_fk < 3 and id_passengers_fk = ?`, [id])

			if (allow[0].counter !== 0) throw new Error()

			await db.query(
				`insert into drive (startPoint, endPoint, cost, id_passengers_fk)
            values (?, ?, ?, ?)`,
				[info.start, info.end, info.cost, id]
			)

			const [newDrive] = await db.query(`select LAST_INSERT_ID() as driveId from drive`)

			return newDrive[0]
		} catch (e) {
			throw new Error()
		}
	}
	async getCurrentDrive(token) {
		try {
			const authHeaders = token && token.split(" ")[1]

			const decodedToken = jwt.verify(authHeaders, process.env.ACCESS_TOKEN_SECRET)
			const id = decodedToken.id

			const [drive] = await db.query(
				`select driveId as id, startPoint as start, endPoint as end, cost, status.name as status, driver.driverSurname, driver.driverFirstname from drive
            join status on drive.id_status_fk = status.id
          join driver on drive.id_driver_fk = driver.driverId
            where drive.id_passengers_fk = ? and drive.id_status_fk < 3`,
				[id]
			)

			if (drive[0].length === 0) throw new Error()

			return drive[0]
		} catch (e) {
			throw new Error()
		}
	}
	async getAllDrives(token) {
		try {
			const authHeaders = token && token.split(" ")[1]

			const decodedToken = jwt.verify(authHeaders, process.env.ACCESS_TOKEN_SECRET)
			const id = decodedToken.id

			const [drive] = await db.query(
				`select drive.driveId as id, drive.startPoint as start, drive.endPoint as end, drive.cost, 
            driver.driverSurname, driver.driverFirstname, status.name as status from drive
            join driver on drive.id_driver_fk = driver.driverId
            join status on drive.id_status_fk = status.id
            where drive.id_passengers_fk = ? and drive.id_status_fk > 2`,
				[id]
			)

			if (drive.length === 0) throw new Error()

			return drive
		} catch (e) {
			throw new Error()
		}
	}
	async updateStatusStarted(info) {
		try {
			const [allow] = await db.query(`select id_status_fk as status from drive where driveId = ?`, [info.driveId])

			if (allow[0].status !== 1) throw new Error()

			await db.query(`update drive set id_status_fk = 2, id_driver_fk = ? where driveId = ?`, [info.driverId, info.driveId])

			return info.driveId
		} catch (e) {
			throw new Error()
		}
	}
	async updateStatusFinished(info) {
		try {
			await db.query(`update drive set id_status_fk = 3 where driveId = ?`, [info.id])
			return info.id
		} catch (e) {
			throw new Error()
		}
	}

	async updateStatusCanceled(info) {
		try {
			await db.query(`update drive set id_status_fk = 4 where driveId = ?`, [info.id])
			return info.id
		} catch (e) {
			throw new Error()
		}
	}

	async updatedDrive(info) {
		try {
			const [allow] = await db.query(`select * from drive where driveId = ?`, [info.id])

			if (allow[0].length === 0) throw new Error()

			await db.query(`update drive set startPoint = ?, endPoint = ?, cost = ? where driveId = ?`, [info.start, info.end, info.cost, info.id])

			const [drive] = await db.query(
				`select driveId as id, startPoint as start, endPoint as end, cost, status.name as status, driver.driverSurname, driver.driverFirstname from drive
      join status on drive.id_status_fk = status.id
      join driver on drive.id_driver_fk = driver.driverId
      where drive.driveId = ? and drive.id_status_fk < 3`,
				[info.id]
			)

			return drive[0]
		} catch (e) {
			throw new Error()
		}
	}
}

module.exports = new driveModel()
