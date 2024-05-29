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

    async getPassenger(req, res){
        try{
            const id = await bd.query(`select * 
            from drive where id_drive = '${req.params.driveId}'`)
            const passenger = await bd.query(`select passenger_surname, passenger_firstname, passenger_secondname
            from passengers where id_passengers = '${id.rows[0].id_passengers_fk}'`)
        }
        catch(e){
            res.sendStatus(404)
        }
    }

    async updatePassenger(req, res){
        try{
            const {surname, firstName, secondName, email} = req.body
            const passenger = await db.query(`update passengers set (passenger_surname, passenger_firstname, passenger_secondname) 
            values ($1, $2, $3) where passenger_email = $4 returning *`, [surname, firstName, secondName, email])
            
            res.json({id: passenger.rows[0].id_passengers})
        }
        catch(e){
            res.sendStatus(404)
        }
    }

    async deletePassenger(req, res){
        try{
        const drive = await db.query(`delete id_passengers_fk from drive 
        where id_passengers_fk = '${req.params.passengerEmail}'`)

        const passenger = await db.query(`delete * from passengers 
        where id_passengers = '${req.params.passengerEmail}'`)

        res.sendStatus(200)
        }
        catch(e){
            res.sendStatus(404)
        }
    }


}

module.exports = new passengerController()