const express = require('express')
const control = express()
const db = require('../db')
const bcrypt = require('bcrypt')

class passengerController{

    async createPassenger(req, res) {
        try {
            const {surname, firstName, secondName, email, password} = req.body
            const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
            const newPassenger = await db.query(`INSERT INTO passengers (passenger_surname, passenger_firstname, 
                passenger_secondname, passenger_email, password) values ($1, $2, $3, $4, $5) 
                RETURNING id_passengers`, [surname, firstName, secondName, email, hash])

            res.json(newPassenger.rows[0])
        }
        catch(e){
            if(e.code === "23505"){
                res.sendStatus(400)
            }
        }
    }

    async logPassenger(req, res){
        try{
            const {email, password} = req.body
            const data = await db.query(`select * from passengers where passenger_email = '${email}'`)
            if (data.rows.length === 0) throw new Error('Empty')
            
            if (!bcrypt.compareSync(password, data.rows[0].password)) throw new Error('Password')

            res.json({id: data.rows[0].id_passengers})
            }
        catch(e){
            res.sendStatus(404)
        }
    }


}

module.exports = new passengerController()