const express = require("express")
const control = express()
const db = require("../db")
const bcrypt = require("bcrypt")

class driverController {
	async createDriver(req, res) {
		const { surname, firstName, secondName, email, password, experience } = req.body
		const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
		try {
			const newDriver = await db.query(
				`INSERT INTO driver (driver_surname, driver_firstname, 
                driver_secondname, driver_email, password, driver_experience) values ($1, $2, $3, $4, $5, $6) 
                RETURNING id_driver`,
				[surname, firstName, secondName, email, hash, experience]
			)

			res.json(newDriver.rows[0])
		} catch (e) {
			res.sendStatus(400)
		}
	}

	async logDriver(req, res) {
		try {
			const { email, password } = req.body
			const data = await db.query(`select * from driver where driver_email = '${email}'`)
			if (data.rows.length === 0) throw new Error("Empty")

			if (!bcrypt.compareSync(password, data.rows[0].password)) throw new Error("Password")

			res.json({ id: data.rows[0].id_driver })
		} catch (e) {
			res.sendStatus(404)
		}
	}

	async getDriverFromDrive(req, res) {
		try {
			const id = await db.query(`select * 
            from drive where id_drive = '${req.params.driveId}'`)

			const driver = await db.query(`select driver_surname, driver_firstname, driver_secondname, 
            from driver where id_driver = '${id.rows[0].id_driver_fk}'`)
		} catch (e) {
			res.sendStatus(404)
		}
	}

	async getDriver(req, res) {
		try {
			const id = req.params.id

			const driver = await db.query(`select driver_surname, driver_firstname, 
            driver_secondname, driver_email, password, driver_experience from driver where id_driver = '${id}'`)

			if (driver.rows.length === 0) throw new Error()

			res.json(driver.rows[0])
		} catch (e) {
			res.sendStatus(404)
		}
	}

	async updateDriver(req, res) {
		try {
			const { surname, firstName, secondName, id } = req.body

			const info = await db.query(`select * from driver where id_driver = '${id}`)

			if (info.rows.length === 0) throw new Error()

			const driver =
				await db.query(`update driver set driver_surname = '${surname}', driver_firstname = '${firstName}', driver_secondname = '${secondName}'
            where id_driver = '${id}' returning *`)

			res.json(driver.rows[0])
		} catch (e) {
			res.sendStatus(404)
		}
	}

	async deleteDriver(req, res) {
		try {
			const info = await db.query(`select * from driver where id_driver = '${req.params.id}'`)

			if (info.rows.length === 0) throw new Error()

			const drive = await db.query(`update drive set id_driver_fk = null where id_driver_fk = '${req.params.id}'`)

			const driver = await db.query(`delete from driver where id_driver = '${req.params.id}'`)

			res.json(req.params.id)
		} catch (e) {
			res.sendStatus(404)
		}
	}
}

module.exports = new driverController()
