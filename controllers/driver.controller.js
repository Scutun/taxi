const express = require('express')
const control = express()
const db = require('../db')
const bcrypt = require('bcrypt')

class driverController{

    async createDriver(req, res) {
    
        const {surname, firstName, secondName, email, password} = req.body
        const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
        try {
            const newPassenger = await db.query(`INSERT INTO passengers (driver_surname, driver_firstname, 
                driver_secondname, driver_email, password) values ($1, $2, $3, $4, $5) 
                RETURNING id_driver`, [surname, firstName, secondName, email, hash])

            res.json(newDriver.rows[0])
        }
        catch(e){
            if(e.code === "23505"){
                res.sendStatus(400)
            }
        }
    }

    
}

module.exports = new driverController()