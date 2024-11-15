require('dotenv').config()
require('./creationDB')
require('./db')

const express = require('express')
const app = express()
const cors = require('cors')
const passengerRoute = require('./routes/passenger.routes')
const driverRoute = require('./routes/driver.routes')
const driveRoute = require('./routes/drive.routes')

app.use(express.json())
app.use(cors())
const PORT = process.env.PORT || 3020

app.use('/api', passengerRoute)
app.use('/api', driverRoute)
app.use('/api', driveRoute)

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
