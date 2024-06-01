const express = require('express')
const control = express()
const db = require('../db')
const bcrypt = require('bcrypt')

class passengerController{

    async createPassenger(req, res) {
        try {
            const {firstName, email, password} = req.body
            const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
            const newPassenger = await db.query(`INSERT INTO passengers (passenger_firstname, 
                passenger_email, password) values ($1, $2, $3) RETURNING id_passengers`, [firstName, email, hash])

            res.json(newPassenger.rows[0])
        }
        catch(e){

               res.sendStatus(400)
 
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

    async getPassengerFromDrive(req, res){
        try{
            const id = await db.query(`select id_passengers_fk 
            from drive where id_drive = '${req.params.id}'`)
            const passenger = await db.query(`select passenger_surname, passenger_firstname, passenger_secondname
            from passengers where id_passengers = '${id.rows[0].id_passengers_fk}'`)

            res.json(passenger.rows[0])
        }
        catch(e){
            res.sendStatus(404)
        }
    }

    async getPassenger(req, res){
        try{
            const id = req.params.id
            const passenger = await db.query(`select passenger_surname, passenger_firstname, passenger_secondname, bonus_count
            from passengers where id_passengers = $1`, [id])

            if(passenger.rows.length === 0) throw new Error

            res.json(passenger.rows[0])
        }
        catch(e){
            res.sendStatus(404)
        }
    }

    async updatePassenger(req, res){
        try{
            const {surname, firstName, secondName, id} = req.body

            const info = await db.query(`select * from passengers where id_passengers = $1`, [id])

            if (info.rows.length === 0) throw new Error

            const passenger = await db.query(`update passengers set passenger_surname = $1, passenger_firstname = $2, 
            passenger_secondname = $3 where id_passengers = $4 returning *`, [surname, firstName, secondName, id])

            res.json(passenger.rows[0])
        }
        catch(e){
            res.sendStatus(404)
        }
    }

    async deletePassenger(req, res){
        try{
            const info = await db.query(`select * from passengers where id_passengers = '${req.params.id}'`)

            if (info.rows.length === 0) throw new Error

            const drive = await db.query(`UPDATE drive SET id_passengers_fk = null 
            WHERE id_passengers_fk = '${req.params.id}'`)

            const passenger = await db.query(`delete from passengers 
            where id_passengers = '${req.params.id}'`)

            res.json(req.params.id)
            }
        catch(e){
            res.sendStatus(404)
        }
    }


}

module.exports = new passengerController()